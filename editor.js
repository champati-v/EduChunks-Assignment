const editor = document.getElementById('editor');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const strikeBtn = document.getElementById('strikeBtn');

// Update button states to show which formatting is currently active
function updateButtonStates() {
    const isBold = document.queryCommandState('bold');
    const isItalic = document.queryCommandState('italic');
    const isStrike = document.queryCommandState('strikeThrough');

    boldBtn.classList.toggle('active', isBold);
    italicBtn.classList.toggle('active', isItalic);
    strikeBtn.classList.toggle('active', isStrike);
}

// Bold button click handler
boldBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.execCommand('bold', false, null);
    editor.focus();
    updateButtonStates();
});

// Italic button click handler
italicBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.execCommand('italic', false, null);
    editor.focus();
    updateButtonStates();
});

// Strikethrough button click handler
strikeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.execCommand('strikeThrough', false, null);
    editor.focus();
    updateButtonStates();
});

// Update button states on text selection or cursor movement
document.addEventListener('keyup', updateButtonStates);
document.addEventListener('mouseup', updateButtonStates);
document.addEventListener('click', updateButtonStates);
document.addEventListener('selectionchange', updateButtonStates);

// Keyboard shortcuts
editor.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b' || e.key === 'B') {
            e.preventDefault();
            document.execCommand('bold', false, null);
            updateButtonStates();
        } else if (e.key === 'i' || e.key === 'I') {
            e.preventDefault();
            document.execCommand('italic', false, null);
            updateButtonStates();
        } 
    }
});

// Initialize button states on page load
updateButtonStates();