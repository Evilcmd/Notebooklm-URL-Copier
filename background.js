chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete" || !tab.url) return;

    chrome.storage.local.get(["isRecording", "urls"], (data) => {
        if (!data.isRecording) return;

        const urls = data.urls || [];

        // Avoid duplicates if you want
        if (!urls.includes(tab.url)) {
            urls.push(tab.url);
            chrome.storage.local.set({ urls });
        }
    });
});
