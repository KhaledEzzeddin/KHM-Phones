


/*
  file name : price.js
*/

jQuery(document).ready(function($){
	//hide the subtle gradient layer (.pricing-list > li::after) when pricing table has been scrolled to the end (mobile version only)
	checkScrolling($('.pricing-body'));
	$(window).on('resize', function(){
		window.requestAnimationFrame(function(){checkScrolling($('.pricing-body'))});
	});
	$('.pricing-body').on('scroll', function(){ 
		var selected = $(this);
		window.requestAnimationFrame(function(){checkScrolling(selected)});
	});

	function checkScrolling(tables){
		tables.each(function(){
			var table= $(this),
				totalTableWidth = parseInt(table.children('.pricing-features').width()),
		 		tableViewport = parseInt(table.width());
			if( table.scrollLeft() >= totalTableWidth - tableViewport -1 ) {
				table.parent('li').addClass('is-ended');
			} else {
				table.parent('li').removeClass('is-ended');
			}
		});
	}

	//switch from monthly to annual pricing tables
	bouncy_filter($('.pricing-container'));

	function bouncy_filter(container) {
		container.each(function(){
			var pricing_table = $(this);
			var filter_list_container = pricing_table.children('.pricing-switcher'),
				filter_radios = filter_list_container.find('input[type="radio"]'),
				pricing_table_wrapper = pricing_table.find('.pricing-wrapper');

			//store pricing table items
			var table_elements = {};
			filter_radios.each(function(){
				var filter_type = $(this).val();
				table_elements[filter_type] = pricing_table_wrapper.find('li[data-type="'+filter_type+'"]');
			});

			//detect input change event
			filter_radios.on('change', function(event){
				event.preventDefault();
				//detect which radio input item was checked
				var selected_filter = $(event.target).val();

				//give higher z-index to the pricing table items selected by the radio input
				show_selected_items(table_elements[selected_filter]);

				//rotate each pricing-wrapper 
				//at the end of the animation hide the not-selected pricing tables and rotate back the .pricing-wrapper
				
				if( !Modernizr.cssanimations ) {
					hide_not_selected_items(table_elements, selected_filter);
					pricing_table_wrapper.removeClass('is-switched');
				} else {
					pricing_table_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {		
						hide_not_selected_items(table_elements, selected_filter);
						pricing_table_wrapper.removeClass('is-switched');
						//change rotation direction if .pricing-list has the .bounce-invert class
						if(pricing_table.find('.pricing-list').hasClass('bounce-invert')) pricing_table_wrapper.toggleClass('reverse-animation');
					});
				}
			});
		});
	}
	function show_selected_items(selected_elements) {
		selected_elements.addClass('is-selected');
	}

	function hide_not_selected_items(table_containers, filter) {
		$.each(table_containers, function(key, value){
	  		if ( key != filter ) {	
				$(this).removeClass('is-visible is-selected').addClass('is-hidden');

			} else {
				$(this).addClass('is-visible').removeClass('is-hidden is-selected');
			}
		});
	}
});

"use strict";
jQuery(document).ready(function ($) {


    //==========================================
    //for Preloader
    //=========================================

    $(window).load(function () {
        $("#loading").fadeOut(500);
    });


    //==========================================
    // Mobile menu
    //=========================================
    $('#navbar-menu').find('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 80)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });



    //==========================================
    // wow
    //=========================================

    var wow = new WOW({
        mobile: false 
    });
    wow.init();


// =========================================
// magnificPopup
// =========================================

    $('.popup-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.video-link').magnificPopup({
        type: 'iframe'
    });


// =========================================
//      featured slider
// =========================================       


    $('.featured_slider').slick({
        centerMode: true,
        dote: true,
        centerPadding: '60px',
        slidesToShow: 3,
        speed: 1500,
        index: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });



// =========================================
// Counter
// =========================================   

    $('.statistic-counter').counterUp({
        delay: 10,
        time: 2000
    });



// =========================================
// Scroll Up
// =========================================   

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });


// =========================================
// About us accordion 
// =========================================   

    $("#faq_main_content").collapse({
        accordion: true,
        open: function () {
            this.addClass("open");
            this.css({height: this.children().outerHeight()});
        },
        close: function () {
            this.css({height: "0px"});
            this.removeClass("open");
        }
    });

// =========================================
// Team Skillbar active js
// =========================================   


    jQuery('.teamskillbar').each(function () {
        jQuery(this).find('.teamskillbar-bar').animate({
            width: jQuery(this).attr('data-percent')
        }, 6000);
    });




    //End

});


// =========================================
//  Portfolio Isotop
// =========================================   

$(function () {
    // Initialize Isotope
    var $notes = $(".grid").isotope({
        itemSelector: ".grid-item"
    });

    // On filter button click
    $(".filters-button-group .button").on("click", function (e) {
        var $this = $(this);

        // Prevent default behaviour
        e.preventDefault();

        // Toggle the active class on the correct button
        $(".filters-button-group .button").removeClass("is-checked");
        $this.addClass("is-checked");

        // Get the filter data attribute from the button
        $notes.isotope({
            filter: $this.attr("data-filter")
        });

    });
});















