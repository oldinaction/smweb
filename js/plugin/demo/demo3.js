$.fn.myPlugin = function(options) {
    var defaults = {
        'color': 'red',
        'fontSize': '12px'
    };
    var settings = $.extend({}, defaults, options);

    return this.each(function(){
        $(this).css({
          'color': settings.color,
          'fontSize': settings.fontSize
        });
    });
}
