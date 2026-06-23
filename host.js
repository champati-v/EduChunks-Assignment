const editorA = document.getElementById("editorA");
const editorB = document.getElementById("editorB");

const TRUSTED_ORIGIN = window.location.origin;

window.addEventListener("message", (event) => {
    if(event.data && event.data.type != "FORMAT_SYNC") {
        return;
    }

    if(event.origin !== TRUSTED_ORIGIN) {
        console.warn("Received message from untrusted origin:", event.origin);
        return;
    }

    if(event.source === editorA.contentWindow) {
        logEvent("Editor A --> B", event.data.message);
        editorB.contentWindow.postMessage(
            event.data,
            TRUSTED_ORIGIN
        )
    }

    else if(event.source === editorB.contentWindow) {
        logEvent("Editor B --> A", event.data.message);
        editorA.contentWindow.postMessage(
            event.data,
            TRUSTED_ORIGIN
        )
    }

});

// event log
const eventLog = document.getElementById("eventLog");

function logEvent(editor, message) {
    const time = new Date().toLocaleTimeString();
    const logEntry = document.createElement("div");

    logEntry.textContent =
        `[${time}] ${editor}: ${message}`;

    eventLog.prepend(logEntry);
}