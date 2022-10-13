(function ($) {
    $.fn.county = function (options) {
        var settings = $.extend({
            endDateTime: new Date(),
            animation: 'fade',
            reflection: false,
            reflectionOpacity: 0,
            speed: 500,
            theme: 'black' },
            options);

        return this.each(function () {
            var timeoutInterval = null;
            var $container = $(this);
            $container.addClass('county ' + settings.theme);
            $container.append(`
                <span class="county-days-wrapper county-first">
                    <span class="county-days">000</span>
                </span>
                <span class="county-hours-wrapper county-separator-left county-separator-right">
                    <span class="county-hours">00</span>
                </span>
                <span class="county-minutes-wrapper county-separator-left county-separator-right">
                    <span class="county-minutes">00</span>
                </span>
                <span class="county-seconds-wrapper county-separator-left county-last">
                    <span class="county-seconds">00</span>
                </span>`);
                if ($container.attr('id') == undefined || $container.attr('id') == null) {
                $container.attr('id', Math.random());
            }

            updateCounter();

            getCountDown();

            function getCountDown() {
                clearTimeout(timeoutInterval);
                timeoutInterval = setTimeout(function () {

                    updateCounter();

                }, 1000);
            }
            function updateCounter() {
                var countDown = getCurrentCountDown();
                $container.find('.county-days').html(countDown.days.replace(/^0+/, ''));
                $container.find('.county-hours').html(countDown.hours);
                $container.find('.county-minutes').html(countDown.minutes);
                $container.find('.county-seconds').html(countDown.seconds);

                if (countDown.days == "000D" || countDown.days == "00D" || countDown.days == "0D" || countDown.days == "D")
                    $container.find('.county-days-wrapper').hide();
                else
                    $container.find('.county-days-wrapper').show();

                getCountDown();
            }

            function getCurrentCountDown() {

                //var endDateTime = new Date('2012/12/25 10:00:00');
                var currentDateTime = new Date();

                var diff = parseFloat(settings.endDateTime - currentDateTime);

                var seconds = 0;
                var minutes = 0;
                var hours = 0;
                var total = parseFloat(((((diff / 1000.0) / 60.0) / 60.0) / 24.0));

                var days = parseInt(total);

                total -= days;

                total *= 24.0;

                hours = parseInt(total);

                total -= hours;

                total *= 60.0;

                minutes = parseInt(total);

                total -= minutes;

                total *= 60;

                seconds = parseInt(total);

                return { 
                    days: formatNumber(Math.max(0, days), true) + 'D', 
                    hours: formatNumber(Math.max(0, hours), false) + 'H',
                    minutes: formatNumber(Math.max(0, minutes), false) + 'M',
                    seconds: formatNumber(Math.max(0, seconds), false) + 'S'
                };

            }
            function formatNumber(number, isday) {
                var strNumber = number.toString();
                if (!isday) {
                    if (strNumber.length == 1)
                        return '0' + strNumber;
                    else
                        return strNumber;
                }
                else {
                    if (strNumber.length == 1)
                        return '00' + strNumber;
                    else if (strNumber == 2)
                        return '0' + strNumber;
                    else
                        return strNumber;
                }
            }

            return this;
        });
    }
})(jQuery);