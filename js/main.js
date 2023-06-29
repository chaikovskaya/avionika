/*--GLOBAL--*/
var GLOBAL = GLOBAL || {};
GLOBAL.widthWindow = GLOBAL.widthWindow || {};
GLOBAL.FORMERROR = GLOBAL.FORMERROR || {};
GLOBAL.FORMERROR.REQUIRED = GLOBAL.FORMERROR.REQUIRED || '';
GLOBAL.FORMERROR.EMAIL = GLOBAL.FORMERROR.EMAIL || '';
GLOBAL.mobile = GLOBAL.mobile || 770;
GLOBAL.tablet = GLOBAL.tablet || 992;
GLOBAL.columnsStartLength = GLOBAL.columnsStartLength || 0;

GLOBAL.parseData = function parseData(data) {
    try {
        data = JSON.parse(data.replace(/'/gim, '"'));
    } catch(e) {
        data = {};
    }
    return data;
};


GLOBAL.owl = GLOBAL.owl || {};
GLOBAL.owl.common = GLOBAL.owl.common || {};
GLOBAL.owl.common.loop = true;
GLOBAL.owl.common.dots = false;
GLOBAL.owl.common.margin = 0;
GLOBAL.owl.common.responsiveClass = true;
GLOBAL.owl.common.autoHeight = true;
GLOBAL.owl.common.mouseDrag = true;
GLOBAL.owl.common.nav = false;
/*--/global--*/

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

function initDropdown() {
    if (typeof(Dropdown) === 'undefined' || !jQuery.isFunction(Dropdown)) {
        return false;
    }

    var common = {};

    $('.JS-Dropdown').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('dropdown'));
        new Dropdown(this, jQuery.extend({}, common, local));
    });
}

function initScroll() {
    $('.js-custom-scroll').each(function(){
        var customScroll = this;
        new SimpleBar(customScroll, {
            autoHide: false
        });
    });
}

function initValidate($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-form-validate');
    }

    $element.each(function() {
        var $element = jQuery(this),
            validator;

        validator = $element.validate({
            errorClass: 'form-error',
            validClass: 'form-success',
            submitHandler: function(form) {
                if (typeof(ajaxSubmit) == 'function') {
                    ajaxSubmit(form);
                }
            },
        });

        $.validator.messages.required = GLOBAL.FORMERROR.REQUIRED;
    });
}

function initMask() {
    $('.js-mask-phone').inputmask({
        mask: '+7 999 999 99 99',
        "tabThrough": true,
        "showMaskOnHover": false,
    });

    $('.js-mask-email').inputmask({
        alias: "email",
        "tabThrough": true,
        "showMaskOnHover": false,
    });
}

function initPopup() {
    $(".js-popup").fancybox({
        toolbar  : false,
        smallBtn : true,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<svg class="fancybox-close-icon" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M1.75 1.25L12.4313 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M12.4316 1.25L1.75029 11.7813" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>' +
                '</button>'
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        },
    });
}

function initSelect() {
    $('.js-select').selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<b class="selectric-button"><i class="selectric-icon"></i></b>',
    });
}

function initMobileMenu() {
    if (typeof(MobileMenu) === 'undefined' || !jQuery.isFunction(MobileMenu)) {
        return false;
    }

    var common = {};

    jQuery('.JS-MobileMenu').not('.JS-MobileMenu-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('mobilemenu'));
        new MobileMenu(this, jQuery.extend({}, common, local));
    });
}

function initForm() {
    jQuery('.js-form').each(function() {
        var $checkbox = $(this).find('.js-form-checkbox'),
            $button = $(this).find('.js-form-button'),
            classDisabled = $(this).data('form-disabled');

        if ($checkbox.is(':checked')) {
            $button.removeClass(classDisabled);
        } else {
            $button.addClass(classDisabled);
        }

        $checkbox.on("change", function(e) {
            e.stopPropagation();
            if ($checkbox.is(':checked')) {
                $button.prop("disabled", false);
                $button.removeClass(classDisabled);
            } else {
                $button.prop("disabled", true);
                $button.addClass(classDisabled);
            }
        });
    });
}

function openPopupSuccess(url) {
    if (typeof(url) == 'undefined') {
        url = '/';
    }

    $.fancybox.open({
        src  : url,
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initAdaptiveMenu() {
    $('.js-adaptivemenu').each(function() {
        var $navItemMore = $(this).find('.js-adaptivemenu-more'),
            $target = $(this).find('.js-adaptivemenu-target'),
            navItemWidthMore = 0,
            windowWidth = $(this).width(),
            navItemWidth = 0,
            $navItems,
            classActive = $(this).data("adaptivemenu-active");

        if ($(window).width() <= GLOBAL.mobile) {
            $navItems = $(this).find('.js-adaptivemenu-item');
        } else {
            $navItems = $(this).find('.js-adaptivemenu-item');
        }

        if (!$(this).hasClass(classActive)) {
            navItemWidthMore = $navItemMore.innerWidth();
        }

        windowWidth = windowWidth - navItemWidthMore;
        $navItemMore.before($target.find('.js-adaptivemenu-item'));

        $navItems.each(function () {
            navItemWidth += $(this).outerWidth();
        });

        navItemWidth > windowWidth ? $navItemMore.show() : $navItemMore.hide();

        while (navItemWidth > windowWidth) {
            navItemWidth -= $navItems.last().width();
            $navItems.last().prependTo($target);
            $navItems.splice(-1, 1);
        }
    });
}

var sliderMainBanner;
function initSliderMainBanner() {
    jQuery('.js-slider-main-banner').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderMainBanner = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 1,
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 15,
                },
                770: {
                    spaceBetween: 25,
                },
                992: {
                    spaceBetween: 30,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

function initAccordion() {
    if (typeof(Accordion) === 'undefined' || !jQuery.isFunction(Accordion)) {
        return false;
    }

    var common = {};

    $('.JS-Accordion').not('.JS-Accordion-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('accordion'));
        new Accordion(this, jQuery.extend({}, common, local));
    });
}

function initTextFilterCity() {
    $('.js-textfilter-city').each(function(){
        var $element = $(this),
            $input = $(this).find('.js-textfilter-city-input'),
            classActive = $element.data('textfilter-class') || 'active';

        $input.jcOnPageFilter({
            animateHideNShow: true,
            focusOnLoad: true,
            highlightColor: "transparent",
            textColorForHighlights: "inherit",
            caseSensitive: false,
            hideNegatives: true,
            parentSectionClass: "js-textfilter-city-list",
            parentLookupClass: "js-textfilter-city-parent",
            childBlockClass: "js-textfilter-city-child"
        });

        $input.keyup(function(e) {
            var len = $element.find('.js-textfilter-city-child span').length;
            if (len > 0) {
                $element.addClass(classActive);
            } else {
                $element.removeClass(classActive);
            }
        });
    });
}

function initExpand() {
    jQuery('.js-expand').each(function() {
        var $element = $(this),
            $block = $element.find('.js-expand-block'),
            $link = $element.find('.js-expand-link'),
            local = GLOBAL.parseData(jQuery(this).data('expand')),
            classActive = local.classActive || 'active',
            classShow = local.classShow || 'show',
            heightParent = parseInt($block.css('min-height'),10) || 21,
            heightChild = $block.height();

        if (heightChild > heightParent) {
            $element.addClass(classActive);

            $link.on("click", function() {
                $element.addClass(classShow);
            });
        }
    });
}

function initFormatPrice() {
    $('.js-format-price').each(function(){
        let classActive = 'js-format-price-active';

        if (!$(this).hasClass(classActive)) {
            let str = parseFloat($(this).text()) || "";

            let strNew = str.toLocaleString();
            $(this).text(strNew);
            $(this).addClass(classActive);
        }
    });
}

function initAnchorScroll() {
    let $page = $('html, body'),
        speed = 500,
        $container = $('.main-menu-container');

    $(document).on('click', 'a[href*="#"]', function() {
        let _this = this,
            lengthString = $(_this).attr('href').length;

        if (lengthString > 1) {
            let heightBlock,
                targetPosition = $($.attr(_this, 'href')).offset().top;

            heightBlock = $container.height() || 0;

            $page.animate({
                scrollTop: (targetPosition) - heightBlock
            }, speed);
            return false;
        }
    });
}

function initMainmenu() {
    $('.js-main-menu-item').each(function(){
        let $element = $(this),
            $switcher = $('.js-main-menu-switcher'),
            classActive = $switcher.data('mainmenu-class');

        $element.hover(
            function () {
                $switcher.removeClass(classActive);
            },
            function () {
            }
        );
    });
}

var sliderActions;
function initSliderActions() {
    jQuery('.js-slider-actions').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderActions = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: 1,
                    loop: sliderLength > 1 ? true : false,
                },
                770: {
                    spaceBetween: 25,
                    slidesPerView: 2,
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

var sliderActionsAll;
function initSliderActionsAll() {
    jQuery('.js-slider-actions-all').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderActionsAll = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: 1,
                    loop: sliderLength > 1 ? true : false,
                },
                770: {
                    spaceBetween: 25,
                    slidesPerView: "auto",
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: "auto",
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

var sliderPopular;
function initSliderPopular() {
    jQuery('.js-slider-popular').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderPopular = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: 2,
                    loop: sliderLength > 2 ? true : false,
                },
                770: {
                    spaceBetween: 25,
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: 4,
                    loop: sliderLength > 4 ? true : false,
                },
                1330: {
                    spaceBetween: 30,
                    slidesPerView: 5,
                    loop: sliderLength > 5 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}
function reInitSliderPopular() {
    if (sliderPopular) {
        sliderPopular.destroy();
    }
    sliderPopular = undefined;
}

var sliderProducts;
function initSliderProducts() {
    jQuery('.js-slider-products').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderProducts = new Swiper($list[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $nextButton,
                prevEl: $prevButton,
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: 2,
                    loop: sliderLength > 2 ? true : false,
                },
                770: {
                    spaceBetween: 25,
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: 4,
                    loop: sliderLength > 4 ? true : false,
                },
                1330: {
                    spaceBetween: 30,
                    slidesPerView: 5,
                    loop: sliderLength > 5 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

function initNumerator() {
    jQuery('.js-numerator-item').each(function() {
        var $element = $(this),
            $value = $element.find('.js-numerator-value'),
            value = $value.text(),
            max = $element.data('numerator-max'),
            step = $element.data('numerator-step'),
            delay = $element.data('numerator-delay');

        function start() {
            if (value < max){
                value = Number(value) + Number(step);
                $value.html(value);
                setTimeout(start, delay);
            } else {
                if (value > 0){
                    if (value >= 1000000){
                        max = value/1000000;
                    }
                    $value.html(max);
                }
            }
        }
        start();
    });
}

function initAnimateNumerator() {
    var wow = new WOW(
        {
            boxClass:     'js-animate-section-numerator',
            animateClass: 'animated-section',
            offset:       0,
            mobile:       true,
            live:         true,
            callback:     function(box) {
                initNumerator();
            },
            scrollContainer: null,
            resetAnimation: false,
        }
    );
    wow.init();
}


function initResizeWindow() {
    var width = $(window).outerWidth();
    if (width <= GLOBAL.mobile) {
        GLOBAL.widthWindow = 'isMobile';
        if (sliderPopular) {
            reInitSliderPopular();
        }
    } else if (width <= GLOBAL.tablet) {
        GLOBAL.widthWindow = 'isTablet';
        if (sliderPopular == undefined) {
            initSliderPopular();
        }
    } else {
        GLOBAL.widthWindow = '';
        if (sliderPopular == undefined) {
            initSliderPopular();
        }
    }
}

$(document).ready(function () {
    initResizeWindow();
    $(window).resize(function(){
        initResizeWindow();
        initAdaptiveMenu();
    });

    initDropdown();
    initScroll();
    initValidate();
    initMask();
    initPopup();
    initSelect();
    initMobileMenu();
    initForm();
    ymaps.ready(initMap);
    initAdaptiveMenu();
    initSliderMainBanner();
    initAccordion();
    initTextFilterCity();
    initExpand();
    initFormatPrice();
    initAnchorScroll();
    initMainmenu();
    initSliderActions();
    initSliderProducts();
    initAnimateNumerator();
    initSliderActionsAll();
});
