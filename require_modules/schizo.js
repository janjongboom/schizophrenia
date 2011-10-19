(function($) {
    $.fn.extend({
        jan: function(opts) {
            return this.each(function() {
                $(this).css({
                    color: '#ff0000'
                });
            });
        }
    });
})(window.jQuery);