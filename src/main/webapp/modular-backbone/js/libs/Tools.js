var Tools = new function Tools() {

    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    this.resetViewAndNavigation = function() {
        $("#content > div").hide();
        $("#navigation li").removeClass("active");
        $("#nav_" + Backbone.history.fragment.replace("/", "")).addClass("active");
    }

}