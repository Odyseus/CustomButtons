function cC(aNode) {
	if (!aNode.getAttribute("data-highlighted")) {
		hljs.highlightBlock(aNode);
		aNode.setAttribute("data-highlighted", true);
	} else return;
}

function escHTML(aStr) {
	aStr = String(aStr)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
	return aStr;
}

function parseCustomButtonURI(aURI) {
	var out = {};
	if (aURI.substr(0, 15) != "custombutton://") throw new Error("Not a custombutton:// URI");
	var data = unescape(aURI.substr(15));
	if (data.substr(0, 6) != "<?xml ") throw new Error("Malformed custombutton:// URI");
	var doc = new DOMParser().parseFromString(data, "application/xml");

	function getText(aNodeName) {
		var result = "";
		var node = doc.getElementsByTagName(aNodeName)[0];
		if (!node) return result;
		if (!node.firstChild || (node.firstChild && (node.firstChild.nodeType == node.TEXT_NODE))) result = node.textContent;
		else result = node.firstChild.textContent;
		return result;
	}
	var fields = ["code", "initCode", "help"];
	for (var i = fields.length - 1; i >= 0; i--) {
		var field = fields[i];
		out[field] = getText(field.toLowerCase());
	}
	return out;
}

function spr(aNode, aOpenAll, aFromBulk) {
	var mainBlock = aNode.parentNode.parentNode.getElementsByTagName("span")[1].getElementsByTagName("span")[0];
	var URI = parseCustomButtonURI(aNode.nextSibling.getAttribute("href"));
	if (aOpenAll || aNode.value == "Show Source") {
		if (mainBlock.textContent === "") {
			mainBlock.innerHTML = "<h2>Code Tab</h2><pre class=\"js\" onclick=\"cC(this);\">" + escHTML(URI.code) + "</pre><h2>Initialization Tab</h2><pre class=\"js\" onclick=\"cC(this);\">" + escHTML(URI.initCode) + "</pre><h2>Help Tab</h2><pre onclick=\"cC(this);\">" + escHTML(URI.help) + "</pre>";
		}
		mainBlock.style.display = "";
		aNode.value = "Hide Source";
		if (typeof hljs == "object" && !aFromBulk) {
			Array.prototype.slice.call(mainBlock.getElementsByTagName("pre")).forEach(function(aBlock) {
				hljs.highlightBlock(aBlock);
				aBlock.setAttribute("data-highlighted", true);
			});
		}
	} else {
		mainBlock.style.display = "none";
		aNode.value = "Show Source";
	}
}

function toggleSp(aBtn) {
	var splrbtn = document.getElementsByClassName("spoiler_button");
	if (aBtn.value === "Show All Sources") {
		Array.prototype.slice.call(splrbtn).forEach(function(aItem) {
			spr(aItem, true, true);
		});
		aBtn.value = "Hide All Sources";
	} else if (aBtn.value === "Hide All Sources") {
		Array.prototype.slice.call(splrbtn).forEach(function(aItem) {
			spr(aItem, false, true);
		});
		aBtn.value = "Show All Sources";
	}
}