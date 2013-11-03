(function( $, undefined ) {

$.widget( "ui.checkbox", $.ui.mouse, {
  version: "@VERSION",
  widgetEventPrefix: "slide",

  options: {
    disabled: false,
    checked: false,
    checkedClass: "ui-widget-checkbox-checked",
	change: null
  },

  _create: function() {
    var self = this;
    this.element
      .addClass(
        "ui-widget-checkbox" +
        " ui-widget" +
        " ui-widget-content" +
        " ui-corner-all")
	  .click(function() {
		self._setOption("checked", !self.options.checked);
	  });
    if(this.options.checked)
      this.element.addClass(this.options.checkedClass);
	this._setOption("disabled", this.options.disabled);
  },
  
  _destroy: function() {
    this.element
      .removeClass(
        "ui-widget-checkbox" +
        " ui-widget" +
        " ui-widget-content" +
        " ui-corner-all" );
  },
  
  _setOption: function( key, value ) {
    this._super( key, value );
    if(key === "checked") {
      this.element.toggleClass(this.options.checkedClass, !!value);  
	  if(this.options.change)
		this.options.change(value);
    } else if(key === "disabled")
      this.element.toggleClass("ui-state-disabled", !!value);  
  }
});

}(jQuery));