(function ($) {

    $.fn.bootstrapFromError = function (options) {

        var _this = this;
        
        var settings = $.extend(true, {
            messageElement: {
                tag: 'div',
                attributes: {
                    class: 'help-block',
                }
            }
        }, options)
        
        var getMessageElementString = function() {
            var search = settings.messageElement.tag;
            for(var i in settings.messageElement.attributes) {
                search += `[${i}="${settings.messageElement.attributes[i]}"]`
            }
            return search;
        }

        /**
         * Hide form errors
         */
        this.reset = function () {
            $(this).find(getMessageElementString()).html('');
            
            $(this).find('.form-group')
                .removeClass('has-success')
                .removeClass('has-warning')
                .removeClass('has-error');
            return this;
        }

        /**
         * Show form errors
         * @param String[] errors
         * @return boolean - return true if has errors
         */
        this.set = function (errors, type) {
            for (var i in errors) {
                var input = $(this).find(`:input[name="${i}"]`);
                input.next(getMessageElementString())
                    .html(errors[i].join('<br />'));
            
                if(typeof type == 'string') {
                    input.closest('.form-group').addClass('has-' + type);
                }
            }
            return this;
        }

        /**
         * Add errors html for every inputs in form
         */
        this.init = function () {
            $(this).find(':input').not('button, input[type="button"]').each(function () {
                if(!$(this).next().is(getMessageElementString())) {
                    $(this).after(`<${settings.messageElement.tag}></${settings.messageElement.tag}>`)
                    for(var i in settings.messageElement.attributes) {
                        $(this).next().attr(i, settings.messageElement.attributes[i]);
                    }
                }
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