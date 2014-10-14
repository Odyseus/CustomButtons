/**
 *  #### Notes to myself ####
 *  All Ajax requests throw errors when running from local fyle system. Ignore them.
 *  Examples: "mismatched tag. Expected: </meta>." or "not well-formed".
 *
 *
 */
// START jQuery functions after page ready.
jQuery(document).ready(function ($) {
	// START Insert Header and Footer HTML
	$("#headmenu").load("00-CommonHTML.html #autohide_navbar");
	$("#footer").load("00-CommonHTML.html #footer_inner");

	// Alternative
	//clientSideInclude("headmenu", "01-Headmenu.html");
	//clientSideInclude("footer", "02-Footer.html");
	// END Insert Header and Footer HTML

	if (typeof isIndex === "undefined") {
		// START Code preview insertion. Escape output to avoid breaking highlighting function.
		// Specify "var = syntax" in install pages for highlight Help tab.
		var bURI = parseCustomButtonURI($("#button-uri").attr("href"));
		if (bURI.code === "" || bURI.code === "/*CODE*/")
			$(".code-tab").hide();
		else
			$("#code-tab").html("<pre><code class=\"javascript\">" + escapeHtml(bURI.code) + "</pre></code>");

		if (bURI.initCode === "" || bURI.initCode === "/*Initialization Code*/")
			$(".init-tab").hide();
		else
			$("#init-tab").html("<pre><code class=\"javascript\">" + escapeHtml(bURI.initCode) + "</pre></code>");

		if (bURI.help === "")
			$(".help-tab").hide();
		else
			$("#help-tab").html("<pre><code class=\"" + syntax + "\">" + escapeHtml(bURI.help) + "</pre></code>");
		// END Code preview insertion

		// START Syntax Highlighting.
		if (typeof hljs === "object")
			hljs.initHighlightingOnLoad();
		// END Syntax Highlighting.


		// START Button name insertion
		$("title, h1.button-name").html(bURI.name);
		//$("#button-uri").attr("data-original-title", "Install " + bURI.name);
		$("#button-uri").attr({
			"data-original-title" : "Install " + bURI.name
		});
		// END Button name insertion
	} else {
		$(".searchinput").keyup(function () {
			$(this).next().toggle(Boolean($(this).val()));
		});
		$(".searchclear").toggle(Boolean($(".searchinput").val()));
		$(".searchclear").click(function () {
			$(this).prev().val('').focus();
			$(this).hide();
		});
	}
	//$(document).ajaxComplete(function () {
	$(document).ajaxStop(function () {

		// START Show body after most of the elements have been loaded.
		$("#mainarea").fadeToggle(750);
		// END Show body after most of the elements have been loaded.

		// START jQuery Scroll Nav Plugin Initialization
		$(function () {
			$("#autohide_navbar").scrollNav({
				"bootstrap_mobile" : true
			});
		});
		// END jQuery Scroll Nav Plugin Initialization

		// START Tooltip initialization
		// Create them adding this data-toggle="tooltip" data-placement="left-or-right-or-top-or-bottom" title="" data-original-title="TOOLTIP TEXT"
		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="popover"]').popover({
			trigger : 'hover'
		}); // Open popover on hover
		// END Tooltip initialization

		// START Dropdown classes open on hover
		$('.dropdown-menu').css('margin-top', '0'); // Workaround for accidental menu closing - Option 1
		//$('.dropdown-menu').css({ // Workaround for accidental menu closing - Option 2
		//	"margin-top" : "0",
		//	"border-top" : "0"
		//});

		$('.navbar .dropdown').hover(function () {
			$(this).addClass('extra-nav-class').find('.dropdown-menu').first().stop(true, true).delay(50).fadeIn('fast');
		}, function () {
			var na = $(this)
				na.find('.dropdown-menu').first().stop(true, true).delay(50).fadeOut('fast', function () {
					na.removeClass('extra-nav-class')
				});
		});
		$('.dropdown-submenu').hover(function () {
			$(this).addClass('extra-nav-class').find('.dropdown-menu').first().stop(true, true).delay(50).fadeIn('fast');
		}, function () {
			var na = $(this)
				na.find('.dropdown-menu').first().stop(true, true).delay(50).fadeOut('fast', function () {
					na.removeClass('extra-nav-class')
				});
		});
		$('.dropdown').hover(function () {
			$(this).addClass('extra-nav-class').find('.dropdown-menu').first().stop(true, true).delay(50).fadeIn('fast');
		}, function () {
			var na = $(this)
				na.find('.dropdown-menu').first().stop(true, true).delay(50).fadeOut('fast', function () {
					na.removeClass('extra-nav-class')
				});
		});
		$('.btn-group').hover(function () {
			$(this).addClass('extra-nav-class').find('.dropdown-menu').first().stop(true, true).delay(50).fadeIn('fast');
		}, function () {
			var na = $(this)
				na.find('.dropdown-menu').first().stop(true, true).delay(50).fadeOut('fast', function () {
					na.removeClass('extra-nav-class')
				});
		});

		// END Dropdown classes open on hover
		// START Back To Top Button
		// Only enable if the document has a long scroll bar
		// Note the window height + offset
		if (($(window).height() + 100) < $(document).height()) {
			$("#top-link-block").removeClass("hidden").affix({
				// how far to scroll down before link "slides" into view
				offset : {
					top : 100
				}
			});
		}
		// END Back To Top Button
	});

});
// END jQuery functions after page ready.


// START Sorting function
function sort(aArray) {
	aArray.sort(function (a, b) {
		a = a.Title.toLowerCase();
		b = b.Title.toLowerCase();
		if (a < b)
			return -1;
		if (a > b)
			return 1;
		return 0;
	})
}
// END Sorting function

// START Lists creation and sorting
function createList(aTitle, aImage, aDescription) {
	var list = document.getElementById("unordered_list");
	var span = document.createElement("li");
	span.setAttribute('class', 'tile list-group-item');
	baseLink = (aTitle === "zPlaceholder") ? "" : baseLink;
	//var content = "<a href=\"" + baseLink + aTitle + ".html\" class=\"inner\" title=\"" + aDescription + "\">" +
	var content = "<a href=\"" + baseLink + aTitle + ".html\" class=\"inner\" title=\"" + aDescription + "\">" +
		"<div class=\"li-img\">" +
		"<img src=\"assets/img/" + aImage + "\" alt=\"Image Alt Text\" />" +
		"</div>" +
		"<div class=\"li-text\">" +
		"<h5 class=\"li-head\">" + aTitle + "</h5>" +
		"</div>" +
		"</a>\n";
	span.innerHTML = content;
	list.appendChild(span);
}
// END Lists creation and sorting

// START Insert List of items for Indexes
function add_li() {
	sort(listItems);
	for (var i in listItems) {
		createList(listItems[i].Title, listItems[i].Image, listItems[i].Description);
	}
}
// END Insert List of items for Indexes

// START Smart jQuery Scrolling Navigation Bar Plugin - Scroll Nav
// (C) Dylan Knutson 2012
(function ($) {
	$.fn.scrollNav = function (opts) {
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

		var resize_handler = function (event) {
			navbar_height = navbar.height();
		}
		$(window).resize(resize_handler);
		//bootstrap mobile compatibility
		this.find(".nav-collapse").on("shown", resize_handler);
		this.find(".nav-collapse").on("hidden", resize_handler);
		$(window).scroll(function (event) {
			//calculate how far the window was scrolled
			//scrolling up the page is a positive delta
			window_scroll = $(window).scrollTop()
				var
				scroll_delta = scroll_last - window_scroll,
			navbar_visible_new = navbar_visible + scroll_delta;
			if (scroll_delta < 0) {
				//scrolling down the page
				if (navbar_visible == navbar_height) {
					//navbar currently is totally visible, and has fixed positioning set
					//set to abs positioning so it begins to go out of frame
					navbar.css({
						"position" : "absolute",
						"top" : window_scroll + "px"
					});
				}
				//else:
				//navbar will be partially visible, let abs positioning move it
			} else if (scroll_delta > 0) {
				if (navbar_visible <= 0) {
					//navbar was not visible, set abs positioning right above this
					navbar.css({
						"position" : "absolute",
						"top" : (window_scroll - navbar_height) + "px"
					});
				}
				//scrolling up the page
				if (navbar_visible_new >= navbar_height) {
					//navbar will be 100% visible
					navbar.css({
						"position" : "fixed",
						"top" : "0px"
					});
				}
			}
			//recalculate the amount the navbar is visible
			navbar_visible = Math.min(Math.max(navbar_visible_new, 0), navbar_height);
			scroll_last = window_scroll;
		});
	}
})(jQuery);
// END Smart jQuery Scrolling Navigation Bar Plugin - Scroll Nav

// START Parser for custombutton:// URIs https://addons.mozilla.org/addon/custom-buttons/
function parseCustomButtonURI(aURI) {
	var out = {};
	if (aURI.substr(0, 15) != "custombutton://")
		throw new Error("Not a custombutton:// URI");
	var data = unescape(aURI.substr(15));
	if (data.substr(0, 6) != "<?xml ")
		throw new Error("Malformed custombutton:// URI");
	var doc = new DOMParser().parseFromString(data, "application/xml");
	// See components/CustomButtonsService.js
	function getText(nodeName) {
		var result = "";
		var node = doc.getElementsByTagName(nodeName)[0];
		if (!node)
			return result;
		if (!node.firstChild || (node.firstChild && (node.firstChild.nodeType == node.TEXT_NODE)))
			result = node.textContent;
		else // CDATA
			result = node.firstChild.textContent;
		return result;
	}
	var fields = ["name", "code", "initCode", "accelkey", "mode", "help"];
	for (var i = 0, l = fields.length; i < l; ++i) {
		var field = fields[i];
		out[field] = getText(field.toLowerCase());
	}
	return out;
}
// END Parser for custombutton:// URIs https://addons.mozilla.org/addon/custom-buttons/

// START Escape HTML entities.
var entityMap = {
	"&" : "&amp;",
	"<" : "&lt;",
	">" : "&gt;",
	'"' : '&quot;',
	"'" : '&#39;'
};
function escapeHtml(aStr) {
	return String(aStr).replace(/[&<>"']/g, function (s) {
		return entityMap[s];
	});
}
// END Escape HTML entities.

// START Function for spoiler buttons.
function spoiler(aNode) {
	if (aNode.value == "Show more") {
		aNode.parentNode.parentNode.getElementsByTagName("span")[1].getElementsByTagName("span")[0].style.display = "";
		aNode.value = "Show less";
	} else {
		aNode.parentNode.parentNode.getElementsByTagName("span")[1].getElementsByTagName("span")[0].style.display = "none";
		aNode.value = "Show more";
	}
}
// END Function for spoiler buttons.

// START HTML files insertion with JavaScript
//function clientSideInclude(aId, aUrl) { // NOT used
//	var req = false;
//	// For Safari, Firefox, and other non-MS browsers
//	if (window.XMLHttpRequest) {
//		try {
//			req = new XMLHttpRequest();
//		} catch (e) {
//			req = false;
//		}
//	}
//	var element = document.getElementById(aId);
//	if (!element) {
//		alert("Bad id " + aId +
//			"passed to clientSideInclude." +
//			"You need a div or span element " +
//			"with this id in your page.");
//		return;
//	}
//	if (req) {
//		// Synchronous request, wait till we have it all
//		req.open('GET', aUrl, false);
//		req.overrideMimeType("text/html");
//		req.send(null);
//		element.innerHTML = req.responseText;
//	} else {
//		element.innerHTML =
//			"Sorry, your browser does not support " +
//			"XMLHTTPRequest objects. This page requires " +
//			"Internet Explorer 5 or better for Windows, " +
//			"or Firefox for any system, or Safari. Other " +
//			"compatible browsers may also exist.";
//	}
//}
// END HTML files insertion with JavaScript