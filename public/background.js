chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchQuote") {
    fetch("https://geek-quote-api.vercel.app/v1/quote")
      .then((res) => res.json())
      .then((data) => sendResponse({ success: true, data }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true; // keep channel open
  }

  if (message.action === "fetchNews") {
    console.log("RSS fetching started!!!");

    fetch("https://feeds.bbci.co.uk/news/technology/rss.xml")
      .then(async (res) => {
        if (res.ok) {
          const data = await res.text(); // ✅ wait for text to resolve
          console.log("RSS fetched successfully.");
          sendResponse({ success: true, data });
        } else {
          console.log("RSS fetch failed internally!");
          sendResponse({ success: false, error: "HTTP Error: " + res.status });
        }
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        sendResponse({ success: false, error: err.message });
      });

    return true; // ✅ keep message channel open for async sendResponse
  }
});
