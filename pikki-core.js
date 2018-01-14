(function (factory) {
	if (typeof global != 'undefined' && typeof module != 'undefined') 
		return module.exports = factory();
	else if (typeof window != 'undefined')
		return window.Pikki = factory();
}(function () {

	// Constants for regular expressions
	var REGULARS = {},
		EMPTY_STRING = "";

	REGULARS.BOLD_REGULAR = {
		TARGET: /[\*]{1}\s*((\w|\s*)+)\s*[\*]{1}/g,
		HANDLER: function formatStringToBold (string) {
			return ("<b>"+string.replace(/\*/g, EMPTY_STRING)+"</b>").trim();
		} 
	}

	REGULARS.SKIP_REGULAR = {
		TARGET: /[\[]*[\]]/g,
		HANDLER: function formatSkipString (string) {
			return (string.replace(/([\[])|([\]])/g, EMPTY_STRING).trim());
		}
	}

	REGULARS.ITALIC_REGULAR = {
		TARGET: /[\~]{1}\s*((\w|\s*)+)\s*[\~]{1}/g,
		HANDLER: function formatStringToItalic (string) {
			return ("<i>"+(string.replace(/\~/g, EMPTY_STRING))+"</i>").trim();
		}
	}

	function Pikki () {
		this.version = "0.1";
	}

	Pikki.prototype.format = function (text) {
		if (typeof text === 'string') {
			for (var key in REGULARS) {
				var item = REGULARS[key];
				item.TARGET.test(text)? text = text.replace(item.TARGET, item.HANDLER): text=text;
			}

			return text;
		}
		else {
			console.warn("Formatted text must be a string!");
			return null;
		}

	}

	return new Pikki();

}))