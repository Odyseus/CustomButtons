/**
 *  #### Notes to myself ####
 *  1- All Ajax requests throw errors when running from local fyle system. Ignore them.
 *     Examples: "mismatched tag. Expected: </meta>." or "not well-formed".
 *  2- Button URIs are added manually.
 *  3- Name of HTML install pages and Master folders MUST BE EXACTLY THE SAME.
 *  4- URLs to GitHub sources inserted on page load. EMPHASIS on point 3.
 *  5- Code preview is automatically generated from the button URI.
 *  6- #headmenu and #footer are inserted via jQuery from 00-CommonHTML.html file.
 *  7- Remember to set the "active" tab for "Button code preview" section.
 *  8- ALWAYS declare variable "syntax" at the end of each install page even if button dosn't have a Help tab.
 *  9- ALWAYS declare "isIndex" var.
 *     0 = For install pages
 *     1 = For index
 *     2 = For any other pages.
 */


/**
 *  #### Notes specific to Bootstrap ####
 *  Bootstrap Theme:
 *  A combination of Flatly colors, Cerulean sizes and Slate navbar. http://bootswatch.com.
 *  1 - Use Flatly css as base.
 *  2 - Change all sizes in pixels for the ones in Cerulean.
 *  3 - Change all .navbar and .dropdown classes for the ones in Slate.
 *  
 *  ScroolSpy:
 *  - When using an offset on links with animated scroll, set a ScrollSpy's offset corresponding
 *    to twice the value of the offset for the animated scroll.
 *    Otherwise, ScrollSpy will highlight the incorrect link when clicking on it.
 *    Note: The offset is to avoid the navbar covering the links target.
 *  - I changed to "data-" attributes for setting up ScrollSpy. It seems easier.
 *  - I still can't fix the position of the side navigation after resizing. ¬¬
 */
