/**
 * Created by yuan on 2016/11/14.
 */
'use strict';
(function ($) {
    $.fn.extend({
        timeLine: function (options) {
            var defaults = {
                $leftWrapper: $(".history_left"),
                $rightWrapper: $(".history_right"),
                $lineWrapper: $(".history-img"),
                data: []
            };

            var options = $.extend(defaults, options);

            var init = {
                setEventBlock: function (data, isOdd, index) {
                    var marginTop,
                        color,
                        bgcolor;

                    switch (index % 22) {
                        case 0:
                        case 1:
                        case 5:
                        case 6:
                            marginTop = '65px';

                            if (index != 1 && index % 22 == 1) {
                                marginTop = '70px';
                            }
                            break;
                        case 2:
                            if (index != 2) {
                                marginTop = '85px';
                            }
                            break;
                        case 13:
                        case 14:
                            marginTop = '60px';
                            break;
                        case 12:
                            marginTop = '50px';
                            break;
                        case 16:
                            marginTop = '45px';
                            break;
                        case 11:
                        case 15:
                        case 17:
                            marginTop = '55px';
                            break;
                        case 21:
                            marginTop = '75px';
                            break;
                        default :
                            marginTop = '70px';
                            break;
                    }

                    if (isOdd) {
                        bgcolor = 'blue_R'
                    } else {
                        bgcolor = 'blue'
                    }
                    color = 'blue';
                    var cur = "";
                    if (data.cur) {
                        bgcolor = 'yellow_R';
                        color = 'yellow';
                        cur = "cur-history";
                    } else {
                        cur = "";
                    }
                    var km = data.km ? data.km : '无',
                        flh = data.flh ? data.flh : '无',
                        xkzh = data.xkzh ? data.xkzh : '无';

                    var ele = '<div class="history-item history_' + (isOdd ? 'R' : 'L') + ' ' + data.year + '-' + data.month + ' ' + cur + '" style="margin-top: ' + marginTop + '" xmlns="http://www.w3.org/1999/html">' +
                        '<span class="year ' + color + '">' + data.year + '</span>' +
                        '<b class="history-desc ' + bgcolor + '">' +
                        '<span class="history_' + (isOdd ? 'r' : 'l') + '_month">' + data.month + '</br>月</span>' +
                        '<div class="history_' + (isOdd ? 'r' : 'l') + '_text">' +
                        '<p title="' + xkzh + '">' + flh + '&nbsp;-&nbsp;' + xkzh + '</p>' +
                        '<p title="' + km + '">' + km + '</p>' +
                        '<p class="history-title" title="' + data.title + '">' + data.title + '</p>' +
                        '</div>' +
                        '</b>' +
                        '</div>';

                    return ele;
                },
                showEventBlock: function () {
                    var msg = options.$lineWrapper,
                        item = $(".history_L"),
                        items = $(".history_R"),
                        windowHeight = $(window).height(),
                        Scroll = $(document).scrollTop();

                    if ((msg.offset().top - Scroll - windowHeight) <= 0) {
                        msg.fadeIn(1500);
                    }
                    for (var i = 0; i < item.length; i++) {
                        if (($(item[i]).offset().top - Scroll - windowHeight) <= -100) {
                            $(item[i]).animate({marginRight: '0px'}, '50', 'swing');
                        }
                    }
                    for (var i = 0; i < items.length; i++) {
                        if (($(items[i]).offset().top - Scroll - windowHeight) <= -100) {
                            $(items[i]).animate({marginLeft: '0px'}, '50', 'swing');
                        }
                    }
                },
                setLineHeight: function () {
                    var imgHeight;
                    if (options.$leftWrapper.height() > options.$rightWrapper.height()) {
                        imgHeight = options.$leftWrapper.height();
                    } else {
                        imgHeight = options.$rightWrapper.height();
                    }
                    options.$lineWrapper.height(imgHeight);
                },
                fillItems: function () {
                    var data = options.data;

                    for (var i = 0; i < data.length; i++) {
                        var isOdd = (i + 1) % 2,
                            block = this.setEventBlock(data[i], isOdd, i);

                        if (isOdd) {
                            options.$rightWrapper.append(block);
                        } else {
                            options.$leftWrapper.append(block)
                        }
                    }
                }
            };

            init.fillItems();
            init.setLineHeight();
            init.showEventBlock();

            $(window).scroll(function () {
                init.showEventBlock();
            })
        }
    })
}(jQuery));