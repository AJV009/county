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
                    <span class="county-days">000</span>D
                </span>
                <span class="county-hours-wrapper county-separator-left county-separator-right">
                    <span class="county-hours">00</span>H
                </span>
                <span class="county-minutes-wrapper county-separator-left county-separator-right">
                    <span class="county-minutes">00</span>M
                </span>
                <span class="county-seconds-wrapper county-separator-left county-last">
                    <span class="county-seconds">00</span>S
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
                var days = $container.find('.county-days');
                var hours = $container.find('.county-hours');
                var minutes = $container.find('.county-minutes');
                var seconds = $container.find('.county-seconds');

                var dayVal = days.html();
                var hourVal = hours.html();
                var minuteVal = minutes.html();
                var secondVal = seconds.html();

                if (dayVal == countDown.days) {
                    days.html(countDown.days);
                }
                else {
                    animateObject(days, null, dayVal, countDown.days, settings.animation);
                }

                if (hourVal == countDown.hours)
                    hours.html(countDown.hours);
                else {
                    animateObject(hours, null, hourVal, countDown.hours, settings.animation);
                }

                if (minuteVal == countDown.minutes)
                    minutes.html(countDown.minutes);
                else {
                    animateObject(minutes, null, minuteVal, countDown.minutes, settings.animation);
                }
                if (secondVal == countDown.seconds)
                    seconds.html(countDown.seconds);
                else {
                    animateObject(seconds, null, secondVal, countDown.seconds, settings.animation);
                }

                getCountDown();
            }
            function animateObject(element, reflectionElement, oldValue, newValue, type) {
                if (type == 'fade') {
                    element.fadeOut('fast').fadeIn('fast').html(newValue);
                }
                else if (type == 'scroll') {
                    var copy = element.clone();

                    var marginTop = copy.outerHeight();

                    copy.css({ marginTop: -marginTop });
                    copy.html(newValue);
                    copy.prependTo(element.parent());

                    element.animate({ marginTop: marginTop }, settings.speed, function () { $(this).remove(); });
                    copy.animate({ marginTop: 0 }, settings.speed, function () { });

                }

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

                return { days: formatNumber(Math.max(0, days), true), hours: formatNumber(Math.max(0, hours), false), minutes: formatNumber(Math.max(0, minutes), false), seconds: formatNumber(Math.max(0, seconds), false) };

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
            function getHunderth(number) {
                var strNumber = '' + number;

                if (strNumber.length == 3)
                    return strNumber.substr(0, 1);
                else
                    return '0';
            }
            function getTenth(number) {

                var strNumber = '' + number;

                if (strNumber.length == 2)
                    return strNumber.substr(0, 1);
                else
                    return '0';
            }

            function getUnit(number) {
                var strNumber = '' + number;

                if (strNumber.length >= 1)
                    return strNumber.substr(0, 1);
                else
                    return '0';
            }
            return this;
        });
    }
})(jQuery);