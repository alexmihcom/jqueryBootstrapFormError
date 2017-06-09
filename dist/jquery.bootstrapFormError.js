(function ($) {

    $.fn.bootstrapFromError = function () {

        var _this = this;

        /**
         * Hide form errors
         */
        this.hide = function () {
            $(this).find('.js-error').hide();
            return this;
        }

        /**
         * Show form errors
         * @param String[] errors
         * @return boolean - return true if has errors
         */
        this.show = function (errors) {
            for (var i in errors) {
                var errorsStr = '';
                for (var j in errors[i]) {
                    errorsStr += '<div>' + errors[i][j] + '</div>';
                }
                $('.js-error[data-name="' + i + '"], .js-error[data-name="' + i + '[]"]')
                        .show()
                        .find('.js-error__message')
                        .html(errorsStr);
            }
            return this;
        }

        /**
         * Add errors html for every inputs in form
         */
        this.init = function () {
            $(this).find('input').each(function () {
                var html = 
                        '<div class="alert alert-aquamarine alert-fill alert-close alert-dismissible fade in js-error" data-name="' + $(this).attr('name') + '" >' +
                            '<button type="button" class="close" aria-label="Close">' +
                                '<span>×</span>' +
                            '</button>' +
                            '<div class="js-error__message"></div>' +
                        '</div>';
                $(this).parents('.form-group').first().after(html);

                $(_this).find('.js-error .close').click(function (e) {
                    e.preventDefault();
                    $(this).parents('.js-error').first().hide();
                }).each(function () {
                    $(this).parents('.js-error').first().hide();
                });
            });
            return this;
        }

        if (typeof this[arguments[0]] == 'function') {
            var args = $.extend([], arguments);
            args.splice(0, 1);
            return this[arguments[0]].apply(this, args);
        }

        this.init();
        return this;
    }

})(jQuery);