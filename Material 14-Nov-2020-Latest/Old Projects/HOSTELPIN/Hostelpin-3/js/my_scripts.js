(function($) {
    // Responsive Menu Trigger
    $(".btn__open-menu").on("click", function(e) {
        e.preventDefault();
        $(this).addClass('hide');
        $("#intro header nav").addClass('open');
    })

    $(".btn__close-menu").on("click", function(e) {
            e.preventDefault();
            $(".btn__open-menu").removeClass('hide');
            $("#intro header nav").removeClass('open');
        })
        //----------Slider
    $slider = $("#slider");
    $slider.find("ul.bjqs li").each(function(index, el) {
        var imageSrc = $(this).find("img").attr('src');
        $(this).css({
            "background-image": "url(" + imageSrc + ")"
        })
    });
    $slider.bjqs({
        height: $("body").innerHeight(),
        width: $("body").innerWidth(),
        animduration: 2000,
        animspeed: 4000,
        hoverpause: false,
    });

    function resizeSlider() {
        var width = $("body").innerWidth(),
            height = $("body").innerHeight();
        $($slider).css({
            width: width,
            height: height
        })
        $slider.find("ul.bjqs, ul.bjqs li").css({
            width: width,
            height: height
        })
    }


    // Rooms Height
    $rooms = $(".room");
    $rooms.each(function(index, el) {
        var imageSrc = $(this).find(".room__image").attr('src');
        $(this).css({
            "background-image": "url(" + imageSrc + ")"
        })
    });

    // List Rooms
    // Room Bg
    $(".list__room-bg").each(function() {
        var imageSrc = $(this).data("image");
        $(this).css({
            "background-image": "url(" + imageSrc + ")"
        })
    })




    // On WindowSize 
    $(window).resize(function(event) {
        resizeSlider();
    });

    // Window Onload
    $(window).load(function() {
        /* Act on the event */
        $("#loader").remove();
    });
    for (var i = 0; i < 8; i++) {
        var list = $('.list__room').first().clone();
        $(list).appendTo('.list__rooms')
    }

    $(".box").each(function(index, el) {
        for (var i = 0; i < 4; i++) {
            var list = $(this).find("li").first().clone();
            $(list).appendTo($(this).find("ul"))
        }
    });
    // Price range slider
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1000,
        values: [0, 1000],
        slide: function(event, ui) {
            // $("#amount").val("CHF" + ui.values[0] + " - CHF" + ui.values[1]);
            $(".filter__price-min").text(ui.values[0]);
            $(".filter__price-max").text(ui.values[1]);
        }
    });

    // Rating Slider
    $("#slider-rating").slider({
        range: "max",
        min: 1,
        max: 5,
        value: 1,
        slide: function(event, ui) {
            var $icon = $("<span />").addClass('glyphicon glyphicon-star');
            $(".container__rating").text("").empty();

            for (var i = 0; i < ui.value; i++) {
                $($icon.clone()).appendTo('.container__rating')
            }
        }
    });


})(jQuery)