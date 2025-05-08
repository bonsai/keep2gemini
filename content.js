function addGeminiButtonToCard() {
  const dialog = document.querySelector('[role="dialog"]');
  console.log("Dialog found:", dialog);
  
  if (!dialog || dialog.querySelector(".gemini-send-button")) return;

  const btn = document.createElement("button");
  btn.textContent = "Geminiに送る";
  btn.className = "gemini-send-button";
  btn.style = `
    margin-top: 10px;
    background-color: #4285F4;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    display: block;
  `;

  btn.onclick = async () => {
    const noteText = dialog.innerText || "";
    console.log("Sending note:", noteText);
    chrome.runtime.sendMessage({ action: "sendToGemini", text: noteText });
  };

  dialog.appendChild(btn);
  console.log("Button added!");
}

// MutationObserver で監視
const observer = new MutationObserver((mutations) => {
  console.log("Mutation detected");
  addGeminiButtonToCard();
});
observer.observe(document.body, { childList: true, subtree: true });

console.log("Observer started");
