(function( $, undefined ) {

$.widget( "ui.checkbox", $.ui.mouse, {
	version: "@VERSION",
	widgetEventPrefix: "slide",

	options: {
    disabled: false,
		checked: false,

    //style
    checkedClass: "ui-widget-checkbox-checked",
    
		//callbacks
		change: null,
	},

	_create: function() {
		this.element
			.addClass(
        "ui-widget-checkbox" +
				" ui-widget" +
				" ui-widget-content" +
				" ui-corner-all");
    if(this.options.checked)
      this.element.addClass(this.options.checkedClass);
	},
  
	_destroy: function() {
		this.element
			.removeClass(
        "ui-widget-checkbox" +
				" ui-widget" +
				" ui-widget-content" +
				" ui-corner-all" );
	}
});

}(jQuery));
