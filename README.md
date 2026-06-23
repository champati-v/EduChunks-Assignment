# Bidirectional Rich Text Sync Across Iframes

A browser-based text editor synchronization demo for communication between isolated iframes using the `postMessage` API.

## Overview

This project demonstrates how two independent rich text editors, running inside separate iframes, can stay synchronized in real time. Since iframes cannot directly access each other's DOM, all communication is routed through a host page acting as a message broker.

### Communication Flow

```text
Editor A → Host Page → Editor B
Editor B → Host Page → Editor A
```

Messages are exchanged using the browser's `window.postMessage()` API.

---

## Features

### Core Features

* Rich text formatting support:

  * Bold
  * Italic
  * Strikethrough
* Real-time bidirectional synchronization

### Additional Enhancements

* Visual sync status indicator
* Text input sync
* Origin validation using event.origin
* postMessage logs on host page.
* Undo/Redo sync (Ctrl+Z) 

---

## Message Format

```javascript
{
  type: "FORMAT_SYNC",
  action: "bold" | "italic" | "strikeThrough",
  html: "<p>Formatted editor content</p>"
}
```

---

## Technologies Used

* HTML5
* CSS3
* JavaScript
* contenteditable
* postMessage API

---

## Running the Project Locally

Clone the Repo: 

```bash
git clone 
```

Open folder with VS Code. 

Serve the project using local development server.

```bash
# VS Code Live Server
Right Click -> Open with Live Server
```

Then open:

```text
http://127.0.0.1:5500
```

### Thank you.
