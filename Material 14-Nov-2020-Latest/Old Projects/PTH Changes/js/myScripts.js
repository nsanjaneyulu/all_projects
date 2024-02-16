$(document).ready(function() {
	// $(".contactNumber").mask("(999) 999-9999");
    $(".inputFieldDisabled").prop('disabled', true);
    $("#sidenavToggler").on("click", function() {
        $(".main_sidebar").toggleClass("toggled");
    })
    //nav-link-collapse
    $(".nav-link-collapse").on("click", function() {
        $(".main_sidebar").removeClass("toggled");
    })
});