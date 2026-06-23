const editor = document.getElementById('editor');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const strikeBtn = document.getElementById('strikeBtn');
const syncStatus = document.getElementById("syncStatus");

// Update button states to show which formatting is currently active
function updateButtonStates() {
    if (document.activeElement !== editor) {
        return;
    }
    const isBold = document.queryCommandState('bold');
    const isItalic = document.queryCommandState('italic');
    const isStrike = document.queryCommandState('strikeThrough');

    boldBtn.classList.toggle('active', isBold);
    italicBtn.classList.toggle('active', isItalic);
    strikeBtn.classList.toggle('active', isStrike);
}

function executeCommand(command) {
    const prevHTML = editor.innerHTML;
    document.execCommand(command, false, null);
    const newHTML = editor.innerHTML;

    if (prevHTML !== newHTML) {
        sendMessageToHost(command);
    }
    editor.focus();
    updateButtonStates();
}

// Bold button click handler
boldBtn.addEventListener('click', (e) => {
    e.preventDefault();
    executeCommand('bold');
});

// Italic button click handler
italicBtn.addEventListener('click', (e) => {
    e.preventDefault();
    executeCommand('italic');
});

// Strikethrough button click handler
strikeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    executeCommand('strikeThrough');
});

// Update button states on text selection or cursor movement
editor.addEventListener('keyup', updateButtonStates);
editor.addEventListener('mouseup', updateButtonStates);
editor.addEventListener('click', updateButtonStates);
document.addEventListener("selectionchange", () => {
    if (document.activeElement === editor) {
        updateButtonStates();
    }
});

// Keyboard shortcuts
editor.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b' || e.key === 'B') {
            e.preventDefault();
            executeCommand('bold');
        } else if (e.key === 'i' || e.key === 'I') {
            e.preventDefault();
            executeCommand('italic');
        } 
    }
});

updateButtonStates();

const TRUSTED_ORIGIN = window.location.origin;

function sendMessageToHost(message) {
    window.parent.postMessage(
        {
            type: "FORMAT_SYNC",
            message,
            html: editor.innerHTML
        },
        TRUSTED_ORIGIN
    );
    console.count("EDITOR SENT");
}

window.addEventListener("message", (event) => {
    if(event.data && event.data.type != "FORMAT_SYNC") {
        return;
    }

    if(event.origin !== TRUSTED_ORIGIN) {
        console.warn("Received message from untrusted origin:", event.origin);
        return;
    }

    if(editor.innerHTML === event.data.html) {
        return;
    }

    editor.innerHTML = event.data.html;
    showSyncIndicator();
});

// Update sync status
function showSyncIndicator() {
    syncStatus.classList.add("show");

    setTimeout(() => {
        syncStatus.classList.remove("show");
    }, 1000);
}