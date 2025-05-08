chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendToGemini") {
    chrome.tabs.query({ url: "https://gemini.google.com/*" }, (tabs) => {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (text) => {
            const inputField = document.querySelector("textarea"); // Geminiの入力フォーム
            if (inputField) {
              inputField.value = text;
              inputField.dispatchEvent(new Event("input", { bubbles: true }));
            }
          },
          args: [message.text]
        });
      } else {
        chrome.tabs.create({ url: "https://gemini.google.com/app" }, (newTab) => {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            func: (text) => {
              const inputField = document.querySelector("textarea");
              if (inputField) {
                inputField.value = text;
                inputField.dispatchEvent(new Event("input", { bubbles: true }));
              }
            },
            args: [message.text]
          });
        });
      }
    });
  }
});
