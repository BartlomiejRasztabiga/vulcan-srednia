chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.indexOf('vulcan.net.pl') != -1) {
		chrome.pageAction.show(tabId);
		chrome.tabs.executeScript(tab.id, {'file': 'jquery.min.js'});
		chrome.tabs.executeScript(tab.id, {'file': 'script.js'});
	}
});