(function() {
    // Create the button
    const button = document.createElement("button");
    button.innerText = "Review My Code";
    button.id = "reviewBtn";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 15px";
    button.style.background = "#ff6b6b";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.zIndex = "1000";

    document.body.appendChild(button);

    // Handle click
    button.addEventListener("click", () => {
        let code = "";
    
        // Monaco editor stores lines in spans inside div.view-lines
        const editor = document.querySelector('.monaco-editor');
        if (editor) {
            const lines = editor.querySelectorAll('.view-lines .view-line');
            lines.forEach(line => {
                code += line.innerText + "\n";
            });
        }
    
        if (!code.trim()) {
            alert("No code detected! Please make sure your code editor is open.");
            return;
        }
    
        // console.log("Captured code:", code);
        // alert("Code captured:\n" + code);
        chrome.storage.local.set({ submittedCode: code }, () => {
            console.log("Saved to storage:", code);
            alert("Code captured! Open the extension popup to see AI feedback.");
        });
    });
    
})();
