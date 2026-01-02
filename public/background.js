chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "MARK_INTERESTED") {
        console.log("🔥 Mark Interested clicked");

        // Ask content script to extract JD
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "EXTRACT_JD"
            });
        });
    }

    // Receive JD from content.js
    if (message.type === "JD_EXTRACTED") {
        console.log("✅ JD RECEIVED IN BACKGROUND");
        console.log(message.payload.substring(0, 300));

        chrome.storage.local.set({ jd: message.payload });
    }
});
