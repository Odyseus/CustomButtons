// START jQuery functions after page ready.
jQuery(document).ready(function($) {
	if (metadata && metadata.pageType === "main_index") {
		$('#xml-dir-table').dataTable({ // dataTable initialization
			// "dom": '<"toolbar">frtip',
			"paging": false,
			"autoWidth": true,
			"responsive": true,
			"ordering": true,
			"columnDefs": [{
				"orderable": false,
				"targets": [2] // Disable "ordering" for "Author", "Homepage" and "Source" columns
				// "targets": [1, 3] // Disable "ordering" for "Author", "Homepage" and "Source" columns
			}],
			"info": false,
			"order": [
				[0, "asc"]
			]
		});
		var filterBox = $("input.form-control.input-sm");
		filterBox.focus(); // Focus search boxes
		// CLEARABLE INPUT
		filterBox.addClass("clearable"); // Add clearable class
		$(document).on("keyup", ".clearable", function(aE) {
			$(this)[tog(this.value)]('x');
			if (aE.keyCode === 27)
				trigger(this, filterBox);
		}).on("mousemove", ".x", function(aE) {
			$(this)[tog(this.offsetWidth - 18 < aE.clientX - this.getBoundingClientRect().left)]("onX");
		}).on("touchstart click", ".onX", function(aE) {
			aE.preventDefault();
			trigger(this, filterBox);
		});
	}

	if (metadata && metadata.pageType === "cb_documentation") {
		$('#index-sidebar ul.nav li a').on('click', function() {
			var $target = $($(this).attr('href'));
			$('html, body').animate({
				scrollTop: $($target).offset().top - 70
			}, 'slow');
		});
		$('body').scrollspy({
			target: "#index-sidebar",
			offset: 140
		});
		setTimeout(function() {
			var sideB = $("#index-sidebar");
			sideB.affix({
				offset: {
					top: function() {
						var sideBOffset = sideB.offset().top,
							sideBMarTop = parseInt(sideB.children(0).css("margin-top"), 10),
							navBHeight = $("#headmenu").height();
						this.top = sideBOffset - navBHeight - sideBMarTop;
						return this.top;
					},
					bottom: function() {
						this.bottom = $("#footer").outerHeight(!0);
						return this.bottom;
					}
				}
			});
		}, 100);
		// START Syntax Highlighting.
		if (typeof hljs === "object") {
			hljs.configure({ // Replace all tabs in code blocks for double spaces.
				tabReplace: "  "
			});
			//hljs.initHighlightingOnLoad(); // Not working after switching to XML files loaded with ajax.
			$("pre code").each(function(i, aBlock) {
				hljs.highlightBlock(aBlock);
			});
		}
		// END Syntax Highlighting.
	}

	// START jQuery Scroll Nav Plugin Initialization
	$(function() {
		$("#autohide_navbar").scrollNav({
			"bootstrap_mobile": true
		});
	});
	// END jQuery Scroll Nav Plugin Initialization

	// START Tooltip initialization
	// Create them adding this data-toggle="tooltip" data-placement="left-or-right-or-top-or-bottom" title="" data-original-title="TOOLTIP TEXT"
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover({
		trigger: 'hover'
	}); // Open popover on hover
	// END Tooltip initialization

	// START Dropdown classes open on hover
	$('.dropdown-menu').css('margin-top', '0'); // Workaround for accidental menu closing - Option 1

	$('.navbar .dropdown').hover(function() {
		$(this).addClass('extra-nav-class').find('.dropdown-menu').first().stop(true, true).delay(50).fadeIn('fast');
	}, function() {
		var na = $(this);
		na.find('.dropdown-menu').first().stop(true, true).delay(50).fadeOut('fast', function() {
			na.removeClass('extra-nav-class');
		});
	});
	$('.dropdown-submenu').hover(function() {
		$(this).addClass('extra-nav-class').find('.dropdown-menu').first().stop(true, true).delay(50).fadeIn('fast');
	}, function() {
		var na = $(this);
		na.find('.dropdown-menu').first().stop(true, true).delay(50).fadeOut('fast', function() {
			na.removeClass('extra-nav-class');
		});
	});
	$('.dropdown').hover(function() {
		$(this).addClass('extra-nav-class').find('.dropdown-menu').first().stop(true, true).delay(50).fadeIn('fast');
	}, function() {
		var na = $(this);
		na.find('.dropdown-menu').first().stop(true, true).delay(50).fadeOut('fast', function() {
			na.removeClass('extra-nav-class');
		});
	});
	$('.btn-group').hover(function() {
		$(this).addClass('extra-nav-class').find('.dropdown-menu').first().stop(true, true).delay(50).fadeIn('fast');
	}, function() {
		var na = $(this);
		na.find('.dropdown-menu').first().stop(true, true).delay(50).fadeOut('fast', function() {
			na.removeClass('extra-nav-class');
		});
	});
	// END Dropdown classes open on hover

	// START Back To Top Button
	// Only enable if the document has a long scroll bar
	// Note the window height + offset
	if (($(window).height() + 100) < $(document).height()) {
		$("#top-link-block").removeClass("hidden").affix({
			// how far to scroll down before link "slides" into view
			offset: {
				top: 100
			}
		});
	}
	$('#top-link').click(function() {
		$('html,body').animate({
			scrollTop: 0
		}, 'slow');
		return false;
	});
	// END Back To Top Button

});
// END jQuery functions after page ready.

// START Smart jQuery Scrolling Navigation Bar Plugin - Scroll Nav
// https://github.com/dymk/ScrollNav
// (C) Dylan Knutson 2012
(function($) {
	$.fn.scrollNav = function(opts) {
		//fix bootstrap bug when navbar is fixed positioned
		if (opts) {
			if (opts.bootstrap_mobile) {
				$(document.body).append("<style type='text/css'> @media(max-width: 767px) { .navbar-fixed-top, .navbar-fixed-bottom, .navbar-static-top { margin-right: 0; margin-left: 0;} }</style>");
			}
		}
		var
			window_scroll = $(window).scrollTop(),
			navbar = this,
			navbar_height = navbar.height(),
			scroll_last = window_scroll,
			navbar_visible = navbar_height;

		var resize_handler = function(event) {
			navbar_height = navbar.height();
		};
		$(window).resize(resize_handler);
		//bootstrap mobile compatibility
		this.find(".nav-collapse").on("shown", resize_handler);
		this.find(".nav-collapse").on("hidden", resize_handler);
		$(window).scroll(function(event) {
			//calculate how far the window was scrolled
			//scrolling up the page is a positive delta
			window_scroll = $(window).scrollTop();
			var
				scroll_delta = scroll_last - window_scroll,
				navbar_visible_new = navbar_visible + scroll_delta;
			if (scroll_delta < 0) {
				//scrolling down the page
				if (navbar_visible == navbar_height) {
					//navbar currently is totally visible, and has fixed positioning set
					//set to abs positioning so it begins to go out of frame
					navbar.css({
						"position": "absolute",
						"top": window_scroll + "px"
					});
				}
				//else:
				//navbar will be partially visible, let abs positioning move it
			} else if (scroll_delta > 0) {
				if (navbar_visible <= 0) {
					//navbar was not visible, set abs positioning right above this
					navbar.css({
						"position": "absolute",
						"top": (window_scroll - navbar_height) + "px"
					});
				}
				//scrolling up the page
				if (navbar_visible_new >= navbar_height) {
					//navbar will be 100% visible
					navbar.css({
						"position": "fixed",
						"top": "0px"
					});
				}
			}
			//recalculate the amount the navbar is visible
			navbar_visible = Math.min(Math.max(navbar_visible_new, 0), navbar_height);
			scroll_last = window_scroll;
		});
	};
})(jQuery);
// END Smart jQuery Scrolling Navigation Bar Plugin - Scroll Nav

function tog(a) { // Toggle add/rem class
	return a ? 'addClass' : 'removeClass';
}

function trigger(aClearBtn, aFilterBox) { // Hide clear button and trigger keyup
	$(aClearBtn).removeClass("x onX").val("").change();
	aFilterBox.trigger("keyup", [{
		preventDefault: function() {},
		keyCode: 27
	}]);
}