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

function initPopupCallback() {
    jQuery('.js-popup-callback').each(function() {
        $element = $(this);

        $element.fancybox({
            src  : $element.data('src'),
            type : 'ajax',
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
            afterShow: function (data) {
                initValidate(data.$refs.container.find('.js-form-validate'));
                initForm();
                initMask();
                initTextareaSize();
            },
        });
    });
}

function initPopupCity() {
    jQuery('.js-popup-city').each(function() {
        $element = $(this);

        $element.fancybox({
            src  : $element.data('src'),
            type : 'ajax',
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
            afterShow: function (data) {
                initScroll();
                initSearch();
                initTextFilterCity();
            },
        });
    });
}

function initPopupGallery() {
    $(".js-popup-gallery").fancybox({
        loop: true,
        infobar: false,
        toolbar  : false,
        smallBtn : true,
        arrows : false,
        animationEffect: "fade",
        hash : false,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<svg class="fancybox-close-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M18.7729 3.21922C17.7524 2.19644 16.5398 1.38536 15.2049 0.832571C13.8699 0.279783 12.4389 -0.00381796 10.9941 -0.0019439C4.91841 -0.0019439 -0.00683594 4.92331 -0.00683594 10.999C-0.00683594 14.0368 1.22516 16.7877 3.21616 18.7787C4.23672 19.8015 5.44928 20.6126 6.78422 21.1654C8.11915 21.7182 9.55014 22.0018 10.995 21.9999C17.0707 21.9999 21.9959 17.0746 21.9959 10.999C21.9959 7.96114 20.7639 5.21022 18.7729 3.21922ZM17.3594 17.3606C16.5245 18.1977 15.5325 18.8615 14.4403 19.3139C13.3481 19.7663 12.1772 19.9985 10.995 19.997C6.02391 19.997 1.99425 15.9673 1.99425 10.9962C1.99277 9.81401 2.22491 8.64316 2.67734 7.55095C3.12977 6.45873 3.79356 5.46668 4.63058 4.63181C5.46526 3.79477 6.45714 3.13096 7.54921 2.67853C8.64128 2.22609 9.812 1.99396 10.9941 1.99547C15.9642 1.99547 19.9939 6.02514 19.9939 10.9953C19.9955 12.1774 19.7634 13.3481 19.3109 14.4402C18.8585 15.5323 18.1947 16.5242 17.3576 17.3588L17.3594 17.3606Z" fill="#E11439"/>\n' +
                '<path d="M12.4084 11.0004L15.9422 7.46669C16.1165 7.27669 16.2107 7.02671 16.2051 6.76892C16.1995 6.51114 16.0946 6.26547 15.9122 6.08321C15.7298 5.90094 15.4841 5.79616 15.2263 5.79074C14.9685 5.78532 14.7186 5.87967 14.5287 6.05411L14.5296 6.05319L10.9959 9.58694L7.4621 6.05319C7.2721 5.87888 7.02212 5.78469 6.76434 5.79027C6.50655 5.79586 6.26088 5.9008 6.07862 6.08319C5.89635 6.26557 5.79157 6.5113 5.78615 6.76909C5.78073 7.02688 5.87508 7.2768 6.04952 7.46669L6.0486 7.46577L9.58235 10.9995L6.0486 14.5333C5.94918 14.6245 5.86924 14.7349 5.8136 14.8578C5.75796 14.9807 5.72777 15.1136 5.72484 15.2485C5.72192 15.3834 5.74632 15.5175 5.79658 15.6427C5.84684 15.7679 5.92192 15.8817 6.0173 15.9771C6.11268 16.0726 6.22638 16.1477 6.35156 16.1981C6.47675 16.2484 6.61083 16.2729 6.74572 16.2701C6.88062 16.2672 7.01355 16.2371 7.13651 16.1816C7.25946 16.126 7.36991 16.0461 7.46119 15.9468L7.4621 15.9459L10.9959 12.4121L14.5296 15.9459C14.6208 16.0453 14.7312 16.1252 14.8541 16.1809C14.9771 16.2365 15.11 16.2667 15.2449 16.2696C15.3798 16.2725 15.5138 16.2481 15.6391 16.1979C15.7643 16.1476 15.878 16.0725 15.9735 15.9772C16.0689 15.8818 16.1441 15.7681 16.1944 15.6429C16.2447 15.5177 16.2692 15.3836 16.2664 15.2487C16.2636 15.1138 16.2335 14.9809 16.1779 14.858C16.1223 14.735 16.0425 14.6246 15.9431 14.5333L15.9422 14.5324L12.4084 11.0004Z" fill="#E11439"/>\n' +
                '</svg>' +
                '</button>'
        },
        beforeClose: function (instance) {
        },
        afterShow: function(instance, current) {
            if ( instance.group.length > 1 && current.$content ) {
                current.$content.append('' +
                    '<button class="fancybox-button fancybox-button--arrow_left prev" data-fancybox-prev>' +
                    '<span class="fancybox-button-icon fancybox-button-icon_left"><svg class="fancybox-button-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M12.8945 4.4C13.2259 4.4 13.4945 4.66863 13.4945 5C13.4945 5.33137 13.2259 5.6 12.8945 5.6V4.4ZM0.942173 5.42426C0.707858 5.18995 0.707858 4.81005 0.942173 4.57574L4.76055 0.757359C4.99486 0.523045 5.37476 0.523045 5.60908 0.757359C5.84339 0.991674 5.84339 1.37157 5.60908 1.60589L2.21497 5L5.60908 8.39411C5.84339 8.62843 5.84339 9.00833 5.60908 9.24264C5.37476 9.47696 4.99486 9.47696 4.76055 9.24264L0.942173 5.42426ZM12.8945 5.6L1.36644 5.6V4.4L12.8945 4.4V5.6Z" fill="white"/>\n' +
                    '</svg></span>\n' +
                    '</button>' +
                    '<button class="fancybox-button fancybox-button--arrow_right next" data-fancybox-next>' +
                    '<span class="fancybox-button-icon fancybox-button-icon_right"><svg class="fancybox-button-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M0.943359 5.6C0.611989 5.6 0.343359 5.33137 0.343359 5C0.343359 4.66863 0.611989 4.4 0.943359 4.4V5.6ZM12.8957 4.57574C13.13 4.81005 13.13 5.18995 12.8957 5.42426L9.07734 9.24264C8.84303 9.47696 8.46313 9.47696 8.22881 9.24264C7.9945 9.00833 7.9945 8.62843 8.22881 8.39411L11.6229 5L8.22881 1.60589C7.9945 1.37157 7.9945 0.991674 8.22881 0.757359C8.46313 0.523045 8.84303 0.523045 9.07734 0.757359L12.8957 4.57574ZM0.943359 4.4H12.4715V5.6H0.943359V4.4Z" fill="white"/>\n' +
                    '</svg></span>\n' +
                    '</button>'
                );
            }
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

function initAjaxMore() {
    if (typeof(AjaxMore) === 'undefined' || !jQuery.isFunction(AjaxMore)) {
        return false;
    }

    var common = {
        beforeSend: function () {
        },
        success: function () {
        }
    };

    $('.JS-AjaxMore').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('ajaxmore'));
        new AjaxMore(this, jQuery.extend({}, common, local));
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

function initFix() {
    if (typeof(Fix) === 'undefined' || !jQuery.isFunction(Fix)) {
        return false;
    }

    var common = {
        update: function (){
            initAdaptiveMenu();
        }
    };

    $('.JS-Fix').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('fix'));
        new Fix(this, jQuery.extend({}, common, local));
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

var sliderAdvantages;
function initSliderAdvantages() {
    jQuery('.js-slider-advantages').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderAdvantages = new Swiper($slider[0], {
            loop: isStart,
            pagination: false,
            navigation: false,
            slidesPerView: "auto",
            threshold: 10,
            spaceBetween: 20,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    loop: sliderLength > 1 ? true : false,
                },
                750: {
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
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
function reInitSliderAdvantages() {
    if (sliderAdvantages) {
        sliderAdvantages.destroy();
    }
    sliderAdvantages = undefined;
}

var sliderServices;
function initSliderServices() {
    jQuery('.js-slider-services').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderServices = new Swiper($list[0], {
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
                    slidesPerView: "auto",
                },
                750: {
                    loop: sliderLength > 3 ? true : false,
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                992: {
                    loop: sliderLength > 4 ? true : false,
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1489: {
                    loop: sliderLength > 5 ? true : false,
                    slidesPerView: 5,
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

var sliderActions;
function initSliderActions() {
    jQuery('.js-slider-actions').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
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
                    slidesPerView: "auto",
                },
                750: {
                    loop: sliderLength > 2 ? true : false,
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                992: {
                    loop: sliderLength > 3 ? true : false,
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1489: {
                    loop: sliderLength > 3 ? true : false,
                    slidesPerView: 3,
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

var sliderSpecialists;
function initSliderSpecialists() {
    jQuery('.js-slider-specialists').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderSpecialists = new Swiper($list[0], {
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
                    slidesPerView: "auto",
                },
                750: {
                    loop: sliderLength > 3 ? true : false,
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                992: {
                    loop: sliderLength > 4 ? true : false,
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1489: {
                    loop: sliderLength > 5 ? true : false,
                    slidesPerView: 5,
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

var sliderTariffs;
function initSliderTariffs() {
    jQuery('.js-slider-tariffs').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderTariffs = new Swiper($list[0], {
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
                    slidesPerView: "auto",
                },
                750: {
                    spaceBetween: 20,
                    slidesPerView: 1,
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: 1,
                },
            },
            on: {
                afterInit: function () {
                    initGetHeight();
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {

                },
            },
        });
    });
}

var sliderProjects;
function initSliderProjects() {
    jQuery('.js-slider-projects').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderProjects = new Swiper($list[0], {
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
                    slidesPerView: "auto",
                },
                750: {
                    spaceBetween: 20,
                    slidesPerView: 2,
                },
                992: {
                    spaceBetween: 30,
                    slidesPerView: 2,
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

var sliderReviews;
function initSliderReviews() {
    jQuery('.js-slider-reviews').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderReviews = new Swiper($list[0], {
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
                    slidesPerView: "auto",
                    loop: sliderLength > 1 ? true : false,
                },
                750: {
                    spaceBetween: 20,
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

var sliderArticles;
function initSliderArticles() {
    jQuery('.js-slider-articles').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderArticles = new Swiper($list[0], {
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
                    slidesPerView: "auto",
                },
                750: {
                    loop: sliderLength > 3 ? true : false,
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                992: {
                    loop: sliderLength > 4 ? true : false,
                    slidesPerView: "auto",
                    spaceBetween: 30,
                },
                1489: {
                    loop: sliderLength > 5 ? true : false,
                    slidesPerView: "auto",
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

var sliderNews;
function initSliderNews() {
    jQuery('.js-slider-news').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderNews = new Swiper($list[0], {
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
                    slidesPerView: "auto",
                },
                750: {
                    loop: sliderLength > 3 ? true : false,
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                992: {
                    loop: sliderLength > 3 ? true : false,
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1489: {
                    loop: sliderLength > 4 ? true : false,
                    slidesPerView: 4,
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

function initTextareaSize() {
    let classActive = 'textarea-active';

    $('.js-textarea-size').on('input', function (e) {
        e.target.style.innerHeight = 'auto';
        e.target.style.height = e.target.scrollHeight + "px";

        if (!$(this).hasClass(classActive)) {
            $(this).addClass(classActive);
        }
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

function initSearch() {
    $('.js-search').each(function(){
        var $element = $(this),
            classDynamic = $(this).data('search-dynamic'),
            $input = $(this).find('.js-search-input'),
            $link = $(this).find('.js-search-reset');

        $link.on('click', function(e, data) {
            $input.val('').trigger('keyup');
            $element.removeClass(classDynamic);
        });

        $input.on('input', function(e, data) {
            var val = $input.val();
            if (val != '') {
                $element.addClass(classDynamic);
            } else {
                $element.removeClass(classDynamic);
            }
        });
    });
}

function initGetHeight() {
    jQuery('.js-getheight').each(function() {
        var $element = $(this),
            $parent = $element.find('.js-getheight-parent'),
            $block = $element.find('.js-getheight-child'),
            $link = $element.find('.js-getheight-link'),
            local = GLOBAL.parseData(jQuery(this).data('getheight')),
            classActive = local.classActive || 'active',
            classShow = local.classShow || 'show',
            heightParent = parseInt($parent.height(),10) || 200,
            heightChild = $block.height();

        if (heightChild > heightParent) {
            $element.addClass(classActive);
        }

        $link.off("click").on("click", function(e) {
            if (!$element.hasClass(classShow)) {
                $element.addClass(classShow)
            } else {
                $element.removeClass(classShow)
            }
        });
    });
}

var sliderAdvantagesSimple;
function initSliderAdvantagesSimple() {
    jQuery('.js-slider-advantages-simple').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderAdvantagesSimple = new Swiper($slider[0], {
            loop: isStart,
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: false,
            slidesPerView: "auto",
            threshold: 10,
            spaceBetween: 20,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    loop: sliderLength > 1 ? true : false,
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
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}
function reInitSliderAdvantagesSimple() {
    if (sliderAdvantagesSimple) {
        sliderAdvantagesSimple.destroy();
    }
    sliderAdvantagesSimple = undefined;
}

var sliderTags;
function initSliderTags() {
    jQuery('.js-slider-tags').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderTags = new Swiper($slider[0], {
            loop: false,
            pagination: false,
            navigation: false,
            slidesPerView: "auto",
            threshold: 10,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 15,
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
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}
function reInitSliderTags() {
    if (sliderTags) {
        sliderTags.destroy();
    }
    sliderTags = undefined;
}

var mozaic = '';
function initMozaic() {
    $('.js-mozaic').each(function() {
        mozaic = $(this).masonry({
            itemSelector: '.js-mozaic-item',
            columnWidth: '.js-mozaic-item',
            percentPosition: true
        });
    });
}
function reInitMozaic() {
    if (mozaic != '') {
        $('.js-mozaic').masonry('destroy');
    }
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

function initCountRows() {
    let $element = jQuery('.js-count-rows'),
        classRows2 = $element.data('count-rows-2'),
        classRows3 = $element.data('count-rows-3'),
        classCols2 = $element.data('count-cols-2');

    $element.find('.js-count-rows-item').each(function() {
        let $item = $(this),
            count = $item.find('li').length;

        if (count >= 1 && count <= 2) {
            $item.addClass(classRows2);
        }
        if (count >= 3) {
            $item.addClass(classRows3);
        }
        if (count >= 7) {
            $item.addClass(classCols2);
        }
    });
}

function initShowMore(showmoreExtra) {
    if (typeof(ShowMore) === 'undefined' || !jQuery.isFunction(ShowMore)) {
        return false;
    }
    var common = {
            start: function () {},
            toggle: function () {}
        },
        showmoreExtra = showmoreExtra || {};

    $('.JS-ShowMore').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('showmore'));
        new ShowMore(this, jQuery.extend({}, common, local, showmoreExtra));
    });
}

function initShowMoreTag(showmoreExtra) {
    if (typeof(ShowMore) === 'undefined' || !jQuery.isFunction(ShowMore)) {
        return false;
    }
    var common = {
            start: function () {},
            toggle: function () {}
        },
        showmoreExtra = showmoreExtra || {};

    $('.JS-ShowMore-Tag').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('showmore'));
        new ShowMore(this, jQuery.extend({}, common, local, showmoreExtra));
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

var sliderArticlesCategory;
function initSliderArticlesCategory() {
    jQuery('.js-slider-articles-category').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderArticlesCategory = new Swiper($list[0], {
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
            spaceBetween: 20,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    slidesPerView: "auto",
                    loop: sliderLength > 2 ? true : false,
                },
                750: {
                    simulateTouch: false,
                    slidesPerView: "auto",
                    loop: sliderLength > 4 ? true : false,
                },
                992: {
                    loop: sliderLength > 4 ? true : false,
                    slidesPerView: 4,
                },
                1489: {
                    loop: sliderLength > 6 ? true : false,
                    slidesPerView: 6,
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

var sliderArticlesNew;
function initSliderArticlesNew() {
    jQuery('.js-slider-articles-new').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderArticlesNew = new Swiper($list[0], {
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
                    slidesPerView: "auto",
                    loop: sliderLength > 1 ? true : false,
                    spaceBetween: 20,
                },
                750: {
                    simulateTouch: false,
                    slidesPerView: "auto",
                    loop: sliderLength > 2 ? true : false,
                    spaceBetween: 20,
                },
                992: {
                    loop: sliderLength > 3 ? true : false,
                    slidesPerView: 3,
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

var sliderArticlesPopular;
function initSliderArticlesPopular() {
    jQuery('.js-slider-articles-popular').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderArticlesPopular = new Swiper($list[0], {
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
                    slidesPerView: "auto",
                    loop: sliderLength > 1 ? true : false,
                    spaceBetween: 20,
                },
                750: {
                    simulateTouch: false,
                    slidesPerView: "auto",
                    loop: sliderLength > 3 ? true : false,
                    spaceBetween: 20,
                },
                992: {
                    loop: sliderLength > 3 ? true : false,
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1489: {
                    loop: sliderLength > 4 ? true : false,
                    slidesPerView: 4,
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

var sliderArticlesRead;
function initSliderArticlesRead() {
    jQuery('.js-slider-articles-read').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderArticlesRead = new Swiper($list[0], {
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
            breakpoints: {
                0: {
                    simulateTouch: false,
                    slidesPerView: 1,
                    loop: sliderLength > 1 ? true : false,
                    spaceBetween: 20,
                },
                750: {
                    simulateTouch: false,
                    slidesPerView: 2,
                    loop: sliderLength > 2 ? true : false,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
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

function initAnchorScroll() {
    let $page = $('html, body'),
        speed = 500;

    $(document).on('click', 'a[href*="#"]', function() {
        let _this = this,
            lengthString = $(_this).attr('href').length;

        if (lengthString > 1) {
            let heightBlock,
                targetPosition = $($.attr(_this, 'href')).offset().top;

            heightBlock = $('.main-menu-container').height() || 0;

            $page.animate({
                scrollTop: (targetPosition) - heightBlock
            }, speed);
            return false;
        }
    });
}

var sliderNewsDetail;
function initSliderNewsDetail() {
    jQuery('.js-slider-news-detail').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list'),
            sliderLength = $list.find('.swiper-slide').length,
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderNewsDetail = new Swiper($list[0], {
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
                    slidesPerView: "auto",
                },
                750: {
                    spaceBetween: 20,
                    loop: sliderLength > 3 ? true : false,
                    slidesPerView: 3,
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

/* type 1*/
var sliderMainBanner1;
function initSliderMainBanner1() {
    jQuery('.js-slider-main-banner-1').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $list = $slider.find('.js-slider-list'),
            $nextButton = $slider.find('.js-slider-next')[0],
            $prevButton = $slider.find('.js-slider-prev')[0],
            $pagination = $slider.find('.js-slider-pagination')[0];

        var isStart = sliderLength > 1 ? true : false;

        sliderMainBanner1 = new Swiper($list[0], {
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
            spaceBetween: 0,
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
/* /type 1*/

function initResizeWindow() {
    var width = $(window).outerWidth();
    if (width <= GLOBAL.mobile) {
        GLOBAL.widthWindow = 'isMobile';
        if (sliderAdvantages == undefined) {
            initSliderAdvantages();
        }
        if (sliderAdvantagesSimple == undefined) {
            initSliderAdvantagesSimple();
        }
        if (sliderTags == undefined) {
            initSliderTags();
        }

        var localExtraTag = GLOBAL.parseData(jQuery('.JS-ShowMore-Tag').data('showmore-extra'));
        initShowMoreTag(localExtraTag);
    } else if (width <= GLOBAL.tablet) {
        GLOBAL.widthWindow = 'isTablet';
        if (sliderAdvantages == undefined) {
            initSliderAdvantages();
        }
        if (sliderAdvantagesSimple) {
            reInitSliderAdvantagesSimple();
        }
        if (sliderTags) {
            reInitSliderTags();
        }
        initShowMoreTag();
    } else {
        GLOBAL.widthWindow = '';
        if (sliderAdvantages) {
            reInitSliderAdvantages();
        }
        if (sliderAdvantagesSimple) {
            reInitSliderAdvantagesSimple();
        }
        if (sliderTags) {
            reInitSliderTags();
        }
        initShowMoreTag();
    }
}

$(document).ready(function () {
    initResizeWindow();
    $(window).resize(function(){
        initResizeWindow();
        initAdaptiveMenu();
        initGetHeight();
    });

    initDropdown();
    initScroll();
    initValidate();
    initMask();
    initPopup();
    initPopupCallback();
    initPopupCity();
    initPopupGallery();
    initSelect();
    initMobileMenu();
    initForm();
    initAjaxMore();
    ymaps.ready(initMap);
    initAdaptiveMenu();
    initFix();
    initSliderMainBanner();
    initSliderServices();
    initSliderActions();
    initSliderSpecialists();
    initSliderTariffs();
    initSliderProjects();
    initSliderReviews();
    initSliderArticles();
    initSliderNews();
    initAccordion();
    initTextareaSize();
    initTextFilterCity();
    initSearch();
    initExpand();
    initCountRows();
    initMozaic();
    initFormatPrice();
    initSliderArticlesCategory();
    initSliderArticlesNew();
    initSliderArticlesPopular();
    initAnchorScroll();
    initSliderNewsDetail();
    initGetHeight();
    initSliderArticlesRead();
    initShowMore();

    initSliderMainBanner1();
});
