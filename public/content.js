// function extractJD() {
//     // METHOD 1 — FULL PAGE (MOST RELIABLE)
//     try {
//         const text = document.body.innerText;
//         if (text && text.length > 500) {
//             return text;
//         }
//     } catch (err) { }

//     // METHOD 2 — TARGETED CONTAINER (CLEAN)
//     try {
//         const jdContainer = document.querySelector(
//             '[class*="description"], [class*="job"], [class*="details"]'
//         );
//         if (jdContainer && jdContainer.innerText.length > 200) {
//             return jdContainer.innerText;
//         }
//     } catch (err) { }

//     // METHOD 3 — ELEMENT LEVEL (LAST RESORT)
//     try {
//         const jobDescription = document.querySelectorAll(
//             "p, li, h1, h2, h3, div"
//         );

//         const content = [...jobDescription]
//             .map(el => el.innerText.trim())
//             .filter(text => text.length > 0);

//         return content.join("\n");
//     } catch (err) { }

//     return "❌ JD extraction failed";
// }

// // Run extraction
// const jdText = extractJD();

// // Send to background
// chrome.runtime.sendMessage({
//     type: "JD_EXTRACTED",
//     payload: jdText
// });


function extractJD() {
    try {
        return document.body.innerText;
    } catch {
        return "";
    }
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "EXTRACT_JD") {
        const jdText = extractJD();

        chrome.runtime.sendMessage({
            type: "JD_EXTRACTED",
            payload: jdText
        });
    }
});
