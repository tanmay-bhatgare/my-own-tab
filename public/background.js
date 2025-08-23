chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchQuote") {
    fetch("https://geek-quote-api.vercel.app/v1/quote")
      .then(async (res) => {
        const text = await res.text(); // read raw response
        try {
          const data = JSON.parse(text);
          sendResponse({ success: true, data });
        } catch (err) {
          sendResponse({
            success: false,
            error: "Invalid JSON: " + text.slice(0, 100),
          });
        }
      })
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true; // async
  }
});
