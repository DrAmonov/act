function addCopyrightInfo(event) {
    // Validate event parameter presence (optional)
    if (!event) {
      console.warn("addCopyrightInfo: Missing event parameter. Please supply the event object.");
      return;
    }
  
    // Get selected text (handle browser compatibility)
    var selection = window.getSelection();
    if (selection.rangeCount) {
      var selectedText = selection.toString();
    } else if (document.selection) { // For older IE browsers
      selectedText = document.selection.createRange().text;
    } else {
      console.debug("The text [selection] not found.");
      return;
    }
  
    // Create source link element (consistent anchor text, styling, and innerHTML)
    var sourceLink = document.createElement('a');
    sourceLink.href = "https://theidioms.com";
    sourceLink.text = "theidioms.com";
    sourceLink.style.cssText = 'color: #333; text-decoration: none;'; // Apply desired styles directly
  
    // Combine text and link while preserving HTML tag structure
    var copiedContent = selectedText + "<br> source: " + sourceLink.innerHTML;
  
    // Prioritize modern `navigator.clipboard.writeText` (handle errors)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(copiedContent)
        .then(() => {
          console.log("Text copied successfully!");
          // Consider preventing default copy behavior if needed (optional):
          // event.preventDefault();
        })
        .catch((err) => {
          console.error("Failed to copy text using modern method:", err);
          // Fallback to execCommand if necessary
          try {
            var textArea = document.createElement("textarea");
            textArea.value = copiedContent;
            document.body.appendChild(textArea);
            textArea.select();
            var successful = document.execCommand('copy');
            if (successful) {
              console.log("Text copied successfully using fallback method.");
            } else {
              console.warn("Fallback copy may not work in all browsers.");
            }
            document.body.removeChild(textArea);
          } catch (err) {
            console.error("Failed to copy text using fallback:", err);
          }
        });
    } else { // Fallback to execCommand directly
      var textArea = document.createElement("textarea");
      textArea.value = copiedContent;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        var successful = document.execCommand('copy');
        if (successful) {
          console.log("Text copied successfully using fallback method.");
        } else {
          console.warn("Fallback copy may not work in all browsers.");
        }
      } catch (err) {
        console.error("Failed to copy text using fallback:", err);
      }
      document.body.removeChild(textArea);
    }
  }
  
  // Optional: Attach to a copy event listener (modify selector and event type as needed)
  document.addEventListener('copy', addCopyrightInfo);
  