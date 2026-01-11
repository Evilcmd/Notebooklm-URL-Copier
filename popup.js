function updateCount() {
    chrome.storage.local.get("urls", (data) => {
        const count = (data.urls || []).length;
        document.getElementById("count").textContent = `Stored URLs: ${count}`;
    });
}

document.getElementById("start").onclick = () => {
    chrome.storage.local.set({ isRecording: true, urls: [] }, updateCount);
};

document.getElementById("stop").onclick = () => {
    chrome.storage.local.set({ isRecording: false });
};

document.getElementById("copy").onclick = async () => {
    chrome.storage.local.get("urls", async (data) => {
        const urls = data.urls || [];
        const text = urls.join("\n");
        await navigator.clipboard.writeText(text);
        alert("URLs copied to clipboard!");
    });
};

document.getElementById("clear").onclick = () => {
    chrome.storage.local.set({ urls: [] }, updateCount);
};

updateCount();

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.urls) {
        updateCount();
    }
});
