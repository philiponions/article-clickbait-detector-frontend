chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrapeArticle") {
        let articleText = document.body.innerText || "No content found";
        let articleTitle = document.title || "No title found";
        sendResponse({ title: articleTitle, content: articleText });
    }
});
