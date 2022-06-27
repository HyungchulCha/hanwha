/* Responsive Status Check */
function sCheck() {
    var wc = $(".s_check"),
        wcP = wc.find(".sc_p").css("display"),
        wcT = wc.find(".sc_t").css("display"),
        wcM = wc.find(".sc_m").css("display");

    return "block" === wcP
        ? "p"
        : "block" === wcT
        ? "t"
        : "block" === wcM
        ? "m"
        : void 0;
}
/* Slide */
function fnSlide({ dom, loop, auto, center, direct, effect, breakPoint }) {
    var $dom = $(dom),
        status = sCheck();

    if ($dom.length > 0) {
        /* s: set */
        var strSW = "s_w",
            strSL = "sw_l";
        (sL = $dom.find("." + strSL)),
            (sLleng = sL.length),
            (sC = $dom.find(".s_c")),
            (sCleng = sC.length),
            (strBtnPrev = ".btn_prev"),
            (strBtnNext = ".btn_next"),
            (btnPrev = $dom.find(strBtnPrev)),
            (btnNext = $dom.find(strBtnNext)),
            (btnPause = $dom.find(".btn_pause")),
            (btnPlay = $dom.find(".btn_play")),
            (isBtn = btnPrev.length > 0 || btnNext.length > 0),
            (sP = $dom.find(".s_p")),
            (sPleng = sP.length);

        sLleng === 0 &&
            (sC.hide(),
            sP.hide(),
            btnPrev.hide(),
            btnNext.hide(),
            btnPause.hide(),
            btnPlay.hide());

        var sSlide = new Swiper(dom, {
            wrapperClass: strSW,
            slideClass: strSL,
            loop: loop,
            autoplay: auto,
            centeredSlides: center,
            direction: !direct ? "horizontal" : direct,
            effect: !effect ? "slide" : effect,
            slidesPerView: "auto",
            slidesPerGroup: 1,
            nested: true,
            pagination: sPleng > 0 && {
                el: sP,
                clickable: true,
                renderBullet: function (i, c) {
                    return '<span class="' + c + '">' + (i + 1) + "</span>";
                },
            },
            navigation: isBtn && {
                prevEl: strBtnPrev,
                nextEl: strBtnNext,
            },
            on: {
                init: function () {
                    sCleng > 0 &&
                        ($dom.find(".s_c strong").text(1),
                        $dom.find(".s_c span").text(sLleng));
                    //$dom.find('.sw_l').find('a').attr('tabindex', '0');
                    $dom.find(".swiper-slide-duplicate")
                        .find("a")
                        .attr("tabindex", "-1");
                },
            },
        });

        sSlide.on("transitionEnd", function () {
            sCleng > 0 && $dom.find(".s_c strong").text(sSlide.realIndex + 1);
        });

        var thBtnPause;
        var thBtnPlay;

        if (auto) {
            btnPlay.hide();
            btnPause.click(function () {
                sSlide.autoplay.stop();
                thBtnPause = $(this);
                thBtnPause.hide();
                thBtnPause.next().show();
                return false;
            });
            btnPlay.click(function () {
                sSlide.autoplay.start();
                thBtnPlay = $(this);
                thBtnPlay.hide();
                thBtnPlay.prev().show();
                return false;
            });
        } else {
            btnPlay.hide();
            btnPause.hide();
        }

        $dom.find(".s_w .sw_l a").focusin(function () {
            var isFirstIndex = loop
                ? $(this).parents(".sw_l").attr("data-swiper-slide-index") ===
                  "0"
                : $(this).parents(".sw_l").index() === 0;

            if (auto) {
                sSlide.autoplay.stop();
                $dom.find(".btn_pause").hide();
                $dom.find(".btn_play").show();
            }

            loop
                ? isFirstIndex && sSlide.slideToLoop(0)
                : isFirstIndex && sSlide.slideTo(0);
        });

        $dom.find(".s_w").focusout(function () {
            if (auto) {
                sSlide.autoplay.start();
                $dom.find(".btn_pause").show();
                $dom.find(".btn_play").hide();
            }
        });

        var domLastFocus = loop
            ? $dom
                  .find('.sw_l[data-swiper-slide-index="' + (sLleng - 1) + '"]')
                  .find("a")
            : $dom.find(".sw_l:last-child").find("a");

        domLastFocus.keydown(function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 9) {
                sSlide.slideTo(0);
                if (auto) {
                    sSlide.autoplay.start();
                    $dom.find(".btn_pause").show();
                    $dom.find(".btn_play").hide();
                }
            }
        });

        /* e: set */

        // breakPoint 프로퍼티를 가지고 있으면
        if (breakPoint !== undefined) {
            $(window).on(
                "resize",
                $.debounce(80, function () {
                    var status = sCheck(),
                        isSame = breakPoint.includes(status);

                    // 현재 상태와 breakPoint가 같을 때
                    if (isSame) {
                        // 이미 실행한 상태면 return
                        if (sSlide !== undefined) {
                            return;
                            // 실행하지 않은 상태면 slide
                        } else {
                            /* s: set */
                            var strSW = "s_w",
                                strSL = "sw_l";
                            (sL = $dom.find("." + strSL)),
                                (sLleng = sL.length),
                                (sC = $dom.find(".s_c")),
                                (sCleng = sC.length),
                                // sCCurrent = sC.find('strong'),
                                // sCTotal = sC.find('span'),
                                (strBtnPrev = ".btn_prev"),
                                (strBtnNext = ".btn_next"),
                                (btnPrev = $dom.find(strBtnPrev)),
                                (btnNext = $dom.find(strBtnNext)),
                                (btnPause = $dom.find(".btn_pause")),
                                (btnPlay = $dom.find(".btn_play")),
                                (isBtn =
                                    btnPrev.length > 0 || btnNext.length > 0),
                                (sP = $dom.find(".s_p")),
                                (sPleng = sP.length);

                            sLleng === 0 &&
                                (sC.hide(),
                                sP.hide(),
                                btnPrev.hide(),
                                btnNext.hide(),
                                btnPause.hide(),
                                btnPlay.hide());

                            sSlide = new Swiper(dom, {
                                wrapperClass: strSW,
                                slideClass: strSL,
                                loop: loop,
                                autoplay: auto,
                                centeredSlides: center,
                                direction: !direct ? "horizontal" : direct,
                                effect: !effect ? "slide" : effect,
                                slidesPerView: "auto",
                                slidesPerGroup: 1,
                                nested: true,
                                pagination: sPleng > 0 && {
                                    el: sP,
                                    clickable: true,
                                    renderBullet: function (i, c) {
                                        return (
                                            '<span class="' +
                                            c +
                                            '">' +
                                            (i + 1) +
                                            "</span>"
                                        );
                                    },
                                },
                                navigation: isBtn && {
                                    prevEl: strBtnPrev,
                                    nextEl: strBtnNext,
                                },
                                on: {
                                    init: function () {
                                        sCleng > 0 &&
                                            ($dom.find(".s_c strong").text(1),
                                            $dom
                                                .find(".s_c span")
                                                .text(sLleng));
                                    },
                                },
                            });

                            sSlide.on("transitionEnd", function () {
                                sCleng > 0 &&
                                    $dom
                                        .find(".s_c strong")
                                        .text(sSlide.realIndex + 1);
                            });

                            if (auto) {
                                btnPlay.hide();
                                btnPause.click(function () {
                                    sSlide.autoplay.stop();
                                    btnPause.hide();
                                    btnPlay.show();
                                    return false;
                                });
                                btnPlay.click(function () {
                                    sSlide.autoplay.start();
                                    btnPlay.hide();
                                    btnPause.show();
                                    return false;
                                });
                            } else {
                                btnPlay.hide();
                                btnPause.hide();
                            }
                            /* e: set */
                        }
                        // 현재 상태와 breakPoint 상태가 다른 경우
                    } else {
                        // 실행되지 않았다면 return
                        if (sSlide === undefined) {
                            return;
                            // 값이 있을 때 (이미 한번 실행했다는 의미) destroy
                        } else {
                            sSlide.destroy(true, true);
                            sSlide = undefined;
                            $dom.find(".s_w").removeAttr("style");
                            $dom.find(".sw_l").removeAttr("style");
                        }
                    }
                })
            );

            var isSame = breakPoint.includes(status);

            // 현재 상태와 breakPoint 상태가 다르더라도 무조건 한번 실행하고 destroy해야 한다.
            if (!isSame) {
                sSlide.destroy(true, true);
                sSlide = undefined;
                $dom.find(".s_w").removeAttr("style");
                $dom.find(".sw_l").removeAttr("style");
            }
        }
    }
}

/* slide tab */
function fnSlideTab() {
    if ($(".tab_scrl").length > 0) {
        new Swiper(".tab_scrl", {
            wrapperClass: "s_w",
            slideClass: "sw_l",
            slidesPerView: "auto",
            nested: true,
            freeMode: true,
        });
    }
}

/* Tab Common */
function tabCommon(wrapClass) {
    var tabWrap = $(wrapClass),
        tabList = tabWrap.find(".tab_list li"),
        tabContent = tabWrap.find(".tab_content");

    tabList.removeClass("on");
    tabList.first().addClass("on");
    tabList.find("a .hdn").remove();
    tabList.first().find("a").append('<em class="hdn">선택된 탭</em>');
    tabContent.removeClass("on");
    tabContent.first().addClass("on");

    tabList.find("a").click(function () {
        var thP = $(this).parent(),
            thPIdx = thP.index(),
            isOn = thP.hasClass("on");

        if (!isOn) {
            tabList.removeClass("on");
            tabList.find("a .hdn").remove();
            thP.addClass("on");
            $(this).append('<em class="hdn">선택된 탭</em>');
            tabContent.removeClass("on");
            tabContent.eq(thPIdx).addClass("on");
        }

        var sTab = $(this).parents(".s_tab"),
            isSTab = sTab.length > 0,
            thPIdx = thP.index(),
            thPLeft =
                thPIdx === 0 ? thP.position().left - 8 : thP.position().left;

        if (isSTab) {
            sTab.animate({ scrollLeft: thPLeft }, 160, "swing");
        }

        return false;
    });
}

/* Tab Accessibility */
function tabAccess(wrapClass) {
    var tabWrap = $(wrapClass),
        tabBox = tabWrap.find(".tab_box"),
        tabTitle = tabWrap.find(".tab_box .tab_title a");

    tabBox.removeClass("on");
    tabBox.first().addClass("on");
    tabBox.find(".tab_title a .hdn").remove();
    tabBox
        .first()
        .find(".tab_title a")
        .append('<em class="hdn">선택된 탭</em>');

    tabTitle.click(function () {
        tabBox.removeClass("on");
        $(this).parents(".tab_box").addClass("on");
        tabBox.find(".tab_title a .hdn").remove();
        $(this).append('<em class="hdn">선택된 탭</em>');

        return false;
    });
}

/* after hasCheck */
function afterHasCheck(dom, f, isResize, ratio) {
    var $dom = $(dom);
    $dom.length > 0 &&
        $dom.each(
            !ratio
                ? f
                : function () {
                      f($(this), ratio);
                  }
        );
    isResize &&
        $(window).on(
            "resize",
            $.debounce(80, function () {
                $dom.length > 0 &&
                    $dom.each(
                        !ratio
                            ? f
                            : function () {
                                  f($(this), ratio);
                              }
                    );
            })
        );
}

/*
    className : lt_l
    afterHasCheck('.lt_l', listToggle)
 */
function listToggle() {
    var th = $(this),
        thP = th.parents(".lt_p"),
        isOpen = thP.hasClass("open");

    !isOpen
        ? $(this).append('<em class="hdn">열기</em>')
        : $(this).append('<em class="hdn">닫기</em>');

    th.click(function () {
        var thP = $(this).parents(".lt_p"),
            isOpen = thP.hasClass("open"),
            thTxt = $(this).find(".hdn");

        if (!isOpen) {
            thP.addClass("open");
            thTxt.text("닫기");
        } else {
            thP.removeClass("open");
            thTxt.text("열기");
        }

        return false;
    });
}
function targetToggle() {
    var th = $(this),
        thTargetDiv = $("." + th.attr("data-target")),
        thBtnClose = thTargetDiv.find(".btn_close");

    th.click(function () {
        thTargetDiv.addClass("open");
        return false;
    });

    thBtnClose.click(function () {
        thTargetDiv.removeClass("open");
        return false;
    });

    th.keydown(function (e) {
        var codeKey = e.keyCode || e.which;

        if (codeKey === 13) {
            thTargetDiv.addClass("open");
            thBtnClose.focus();
        }
    });

    thBtnClose.keydown(function (e) {
        var codeKey = e.keyCode || e.which;

        if (codeKey === 13) {
            thTargetDiv.removeClass("open");
            th.focus();
        }
    });
}
/*
    className : a
    afterHasCheck('a', newWindow)
 */
function newWindow() {
    var th = $(this),
        thTarget = th.attr("target"),
        thTitle = th.attr("title");

    if (thTarget === "_blank") {
        th.append('<i class="ico_window"><em class="hdn">새창</em></i>');
        (thTitle === undefined || thTitle === null || thTitle === "") &&
            th.attr("title", "새창");
    }
}
/*
    className : [class^="tab_"] .on a
    afterHasCheck('[class^="tab_"] .on a', tabSelected)
 */
function tabSelected() {
    $(this).attr("title", "선택된 탭");
}
/* 
    className : target 
    afterHasCheck(target, domRatio, true, ratio)
*/
function domRatio(th, ratio) {
    th.css("height", th.outerWidth() * ratio);
}
/* 
    className : ib_w 
    afterHasCheck('.ib_w', inlineBlockWidth)
*/
function inlineBlockWidth() {
    $(this)
        .parent()
        .css({
            width: $(this).outerWidth(),
        });
}
/* 
    className : f_unit
    afterHasCheck('.f_unit', fUnitTextWidth)
*/
function fUnitTextWidth() {
    $(this)
        .find("input")
        .css({
            "padding-right": $(this).find(".f_txt").outerWidth(),
        });
}
/* 
    className : form_area
    afterHasCheck('.form_area', formAreaTitleWidth)
*/
function formAreaTitleWidth() {
    var arr = [],
        th = $(this),
        thList = th.find("> ul > li"),
        thtitle = th.find(".fa_title"),
        isTitle = thtitle.length > 0,
        isPdNone = th.hasClass("pd_n"),
        per = 16;

    if (isPdNone) return;

    if (isTitle) {
        thList.each(function () {
            arr.push($(this).find(".fa_title").outerWidth());
        });
        arr.sort(function (a, b) {
            return b - a;
        });
        thList.css("padding-left", arr[0] + per);
    }
}
/* 
    className : s_tab
    afterHasCheck('.s_tab', subTabScroll)
*/
function subTabScroll() {
    var th = $(this),
        thW = th.outerWidth(),
        thUl = th.find("ul"),
        thLi = th.find("li"),
        liOn = th.find(".on"),
        liOnPosX = liOn.position().left,
        thPd = 16,
        x = 0;

    th.scrollLeft(liOnPosX - thPd / 2);
    thLi.each(function () {
        x = x + $(this).outerWidth();
    });
    thW < x ? thUl.css("width", x + thPd) : thUl.removeAttr("style");
}

$(document).ready(function () {
    afterHasCheck("a", newWindow);
    afterHasCheck(".lt_l", listToggle);
    afterHasCheck(".dt_l", targetToggle);
    afterHasCheck('[class^="tab_"] .on a', tabSelected);
    afterHasCheck(".ib_w", inlineBlockWidth);
    afterHasCheck(".f_unit", fUnitTextWidth);
    afterHasCheck(".form_area", formAreaTitleWidth);
    afterHasCheck(".s_tab", subTabScroll);
    BoxTgl();
    fnSlide({ dom: '.m_slide .ms_list', loop: true, auto: false, center: false });
});

function BoxTgl() {
    var box = $('[class^="mv_box_"], [class^="pv_box_"]');
    box.on('click', function(){
        var hasOpen = $(this).hasClass('open');
        var isIframe = $(this).find('iframe');
        var src = '';
        if (!hasOpen) {
            box.removeClass('open');
            $(this).addClass('open');            
            if (isIframe.length > 0) {

                $('[class^="pv_box_"] iframe').each(function(){
                    var thSrc = $(this).attr('src');
                    var index = thSrc.indexOf('?autoplay=1');
                    if (index === -1) { return }
                    $(this).attr('src', thSrc.replace('?autoplay=1', ''));
                });

                src = isIframe.attr('src');
                var index = src.indexOf('?autoplay=1');
                if (index !== -1) { return }
                isIframe.attr('src', src + '?autoplay=1');
            }
        } else {
            $(this).removeClass('open');
            if (isIframe.length > 0) {
                src = isIframe.attr('src');                
                isIframe.attr('src', src.replace('?autoplay=1', ''));                
            }
        }
        src = '';
    });
}