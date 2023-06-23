/*--GLOBAL--*/
var GLOBAL = GLOBAL || {};
GLOBAL.widthWindow = GLOBAL.widthWindow || {};
GLOBAL.FORMERROR = GLOBAL.FORMERROR || {};
GLOBAL.FORMERROR.REQUIRED = GLOBAL.FORMERROR.REQUIRED || '';
GLOBAL.FORMERROR.EMAIL = GLOBAL.FORMERROR.EMAIL || '';
GLOBAL.mobile = GLOBAL.mobile || 768;
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
                '<svg class="fancybox-close-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M18.7729 3.21922C17.7524 2.19644 16.5398 1.38536 15.2049 0.832571C13.8699 0.279783 12.4389 -0.00381796 10.9941 -0.0019439C4.91841 -0.0019439 -0.00683594 4.92331 -0.00683594 10.999C-0.00683594 14.0368 1.22516 16.7877 3.21616 18.7787C4.23672 19.8015 5.44928 20.6126 6.78422 21.1654C8.11915 21.7182 9.55014 22.0018 10.995 21.9999C17.0707 21.9999 21.9959 17.0746 21.9959 10.999C21.9959 7.96114 20.7639 5.21022 18.7729 3.21922ZM17.3594 17.3606C16.5245 18.1977 15.5325 18.8615 14.4403 19.3139C13.3481 19.7663 12.1772 19.9985 10.995 19.997C6.02391 19.997 1.99425 15.9673 1.99425 10.9962C1.99277 9.81401 2.22491 8.64316 2.67734 7.55095C3.12977 6.45873 3.79356 5.46668 4.63058 4.63181C5.46526 3.79477 6.45714 3.13096 7.54921 2.67853C8.64128 2.22609 9.812 1.99396 10.9941 1.99547C15.9642 1.99547 19.9939 6.02514 19.9939 10.9953C19.9955 12.1774 19.7634 13.3481 19.3109 14.4402C18.8585 15.5323 18.1947 16.5242 17.3576 17.3588L17.3594 17.3606Z" fill="#E11439"/>\n' +
                '<path d="M12.4084 11.0004L15.9422 7.46669C16.1165 7.27669 16.2107 7.02671 16.2051 6.76892C16.1995 6.51114 16.0946 6.26547 15.9122 6.08321C15.7298 5.90094 15.4841 5.79616 15.2263 5.79074C14.9685 5.78532 14.7186 5.87967 14.5287 6.05411L14.5296 6.05319L10.9959 9.58694L7.4621 6.05319C7.2721 5.87888 7.02212 5.78469 6.76434 5.79027C6.50655 5.79586 6.26088 5.9008 6.07862 6.08319C5.89635 6.26557 5.79157 6.5113 5.78615 6.76909C5.78073 7.02688 5.87508 7.2768 6.04952 7.46669L6.0486 7.46577L9.58235 10.9995L6.0486 14.5333C5.94918 14.6245 5.86924 14.7349 5.8136 14.8578C5.75796 14.9807 5.72777 15.1136 5.72484 15.2485C5.72192 15.3834 5.74632 15.5175 5.79658 15.6427C5.84684 15.7679 5.92192 15.8817 6.0173 15.9771C6.11268 16.0726 6.22638 16.1477 6.35156 16.1981C6.47675 16.2484 6.61083 16.2729 6.74572 16.2701C6.88062 16.2672 7.01355 16.2371 7.13651 16.1816C7.25946 16.126 7.36991 16.0461 7.46119 15.9468L7.4621 15.9459L10.9959 12.4121L14.5296 15.9459C14.6208 16.0453 14.7312 16.1252 14.8541 16.1809C14.9771 16.2365 15.11 16.2667 15.2449 16.2696C15.3798 16.2725 15.5138 16.2481 15.6391 16.1979C15.7643 16.1476 15.878 16.0725 15.9735 15.9772C16.0689 15.8818 16.1441 15.7681 16.1944 15.6429C16.2447 15.5177 16.2692 15.3836 16.2664 15.2487C16.2636 15.1138 16.2335 14.9809 16.1779 14.858C16.1223 14.735 16.0425 14.6246 15.9431 14.5333L15.9422 14.5324L12.4084 11.0004Z" fill="#E11439"/>\n' +
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
            spaceBetween: 15,
            lazy: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                },
                750: {
                },
                992: {
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                    initPopupCallback();
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

function initResizeWindow() {
    var width = $(window).outerWidth();
    if (width <= GLOBAL.mobile) {
        GLOBAL.widthWindow = 'isMobile';
    } else if (width <= GLOBAL.tablet) {
        GLOBAL.widthWindow = 'isTablet';
    } else {
        GLOBAL.widthWindow = '';
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
});
