(function($) {
    "use strict";

    // DM Slides
    $("#slides").superslides({
        play: 6000,
        animation: "fade",
        pagination: true
    });

    // DM Header
    var headerFlag = false;
    jQuery('#header-dropdown .arrow-down').live('click', function() {
        var parent = jQuery(this).parent();
        var height = 60;

        if (headerFlag == false) {
            jQuery(parent).stop(true, false).animate({
                'margin-top': 0
            }, {
                duration: 500,
                easing: 'easeOutQuad'
            });
            headerFlag = true;
        } else {
            jQuery(parent).stop(true, false).animate({
                'margin-top': -height
            }, {
                duration: 500,
                easing: 'easeOutQuad'
            });
            headerFlag = false;
        }
    });

    // DM Menu
    $(document).ready(function() {
        jQuery('#navigation-container').height($("#nav").height());
        jQuery('#nav').affix({
            offset: {
                top: $('#nav').offset().top
            }
        });
    });

    $('.nav li a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 40
        }, 1200, 'easeInOutExpo');
        event.preventDefault();
    });

    // DM Back to Top
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 1) {
            jQuery('.dmtop').css({
                bottom: "25px"
            });
        } else {
            jQuery('.dmtop').css({
                bottom: "-100px"
            });
        }
    });
    jQuery('.dmtop').click(function() {
        jQuery('html, body').animate({
            scrollTop: '0px'
        }, 800);
        return false;
    });

    // DM Google Map
    $("#responsive_map").gMap({
        maptype: google.maps.MapTypeId.ROADMAP,
        zoom: 14,
        markers: [{
            latitude: 51.186298,
            longitude: 4.404759,
            html: "<img src='images/logo.png' width='120' height='29'><br/>MYLISA, Beukenlaan 2, 2020 Antwerpen, Belgium<br><strong>CALL US : +1-855-739-9555</strong>",
            popup: true,
            flat: true,
            icon: {

                iconsize: [32, 37],
                iconanchor: [15, 30],
                shadow: "images/icon-shadow.png",
                shadowsize: [32, 37],
                shadowanchor: null
            }
        }],
        panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        scrollwheel: false,
        styles: [{
            "stylers": [{
                "hue": "#1ebc85"
            }, {
                "gamma": 0
            }]
        }],
        onComplete: function() {
            var gmap = $("#responsive_map").data('gmap').gmap;
            window.onresize = function() {
                google.maps.event.trigger(gmap, 'resize');
                $("#responsive_map").gMap('fixAfterResize');
            };
        }
    });

    // DM Portfolio
    var $container = $('.portfolio'),
        $items = $container.find('.portfolio-item'),
        portfolioLayout = 'fitRows';
    if ($container.hasClass('portfolio-centered')) {
        portfolioLayout = 'masonry';
    }
    $container.isotope({
        filter: '*',
        animationEngine: 'best-available',
        layoutMode: portfolioLayout,
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        },
        masonry: {}
    }, refreshWaypoints());

    function refreshWaypoints() {
        setTimeout(function() {}, 1000);
    }
    $('nav.portfolio-filter ul a').on('click', function() {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        }, refreshWaypoints());
        $('nav.portfolio-filter ul a').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    function getColumnNumber() {
        var winWidth = $(window).width(),
            columnNumber = 1;
        if (winWidth > 1600) {
            columnNumber = 5;
        } else if (winWidth > 1200) {
            columnNumber = 4;
        } else if (winWidth > 950) {
            columnNumber = 2;
        } else if (winWidth > 600) {
            columnNumber = 1;
        } else if (winWidth > 400) {
            columnNumber = 1;
        } else if (winWidth > 250) {
            columnNumber = 1;
        }
        return columnNumber;
    }

    function setColumns() {
        var winWidth = $(window).width(),
            columnNumber = getColumnNumber(),
            itemWidth = Math.floor(winWidth / columnNumber);
        $container.find('.portfolio-item').each(function() {
            $(this).css({
                width: itemWidth + 'px'
            });
        });
    }

    function setPortfolio() {
        setColumns();
        $container.isotope('reLayout');
    }
    $container.imagesLoaded(function() {
        setPortfolio();
    });
    $(window).on('resize', function() {
        setPortfolio();
    });

    // DM Fitdiv
    $(".post-wrap").fitVids();

    //DM Player 

    /*$(document).ready(function() {
    	$(".player").mb_YTPlayer();
    });*/

    // DM Loader
    $(window).load(function() {
        $("#intro-loader").delay(500).fadeOut();
        $(".mask").delay(1000).fadeOut("slow");
    });

    // 
    // Modal SignIn - SignUp Index.html
    $('#sign-up').on('show.bs.modal', function(e) {
        console.log("SideUp show");
        $('#sign-in').modal('hide');
        $('#reset-password').modal('hide');
    })
    $('#sign-in').on('show.bs.modal', function(e) {
        console.log("SideIn show");
        $('#sign-up').modal('hide');
        $('#reset-password').modal('hide');
    })
    $('#reset-password').on('show.bs.modal', function(e) {
        console.log("Reset password show");
        $('#sign-up').modal('hide');
        $('#sign-in').modal('hide');
    })
    
})(jQuery);
