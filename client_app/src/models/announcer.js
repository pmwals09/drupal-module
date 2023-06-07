const ASSERTIVE = "assertive";
const POLITE = "polite";
const defaultLevel = POLITE;

export class Announcer {
  constructor() {
    this._node = Announcer.createNode();
    this._assertiveLog = Announcer.createLog(ASSERTIVE);
    this._politeLog = Announcer.createLog(POLITE);

    this._node.appendChild(this._assertiveLog);
    this._node.appendChild(this._politeLog);

    // add this node just after the header, so it appears where the main
    // content of the app goes
    const headerEl = document.querySelector("#chatbot-header");
    if (headerEl) {
      headerEl.parentNode.insertBefore(this._node, headerEl.nextSibling);
    } else {
      // we must be on the attract screen or the dataviz, in which case
      // prepending to the body should work just fine.
      document.body.prepend(this._node);
    }
  }

  get node() {
    return this._node;
  }

  set node(newNode) {
    this._node = newNode;
  }

  get assertiveLog() {
    return this._assertiveLog;
  }

  set assertiveLog(newAssertiveLog) {
    this._assertiveLog = newAssertiveLog;
  }

  get politeLog() {
    return this._politeLog;
  }

  set politeLog(newPoliteLog) {
    this._politeLog = newPoliteLog;
  }

  static createNode() {
    const n = document.createElement("div");
    n.classList.add("visually-hidden");
    return n;
  }

  static createLog(level) {
    const n = document.createElement("div");
    n.setAttribute("role", "log");
    n.setAttribute("aria-live", level);
    n.setAttribute("aria-relevant", "additions");

    return n;
  }

  announce({ message, level = defaultLevel, timeout = 0 }) {
    if (!this.node) {
      console.error("No announcer node available.");
      return;
    }

    const n = document.createElement("div");
    n.textContent = message;

    if (level === ASSERTIVE) {
      this.assertiveLog.appendChild(n);
    } else {
      this.politeLog.appendChild(n);
    }

    if (timeout) {
      setTimeout(() => {
        n.remove();
      }, timeout);
    }
  }

  clear(level = "") {
    if (!this.node) {
      console.error("No announcer node available.");
      return;
    }

    if (!level || level === ASSERTIVE) {
      this.assertiveLog.innerHTML = "";
    }

    if (!level || level === POLITE) {
      this.politeLog.innerHTML = "";
    }
  }

  remove() {
    if (!this.node) {
      return;
    }

    document.body.removeChild(this.node);
    this.node = null;
  }

  getLast(level = defaultLevel) {
    let el = null;
    if (level === ASSERTIVE) {
      el = this.assertiveLog.lastChild;
    } else {
      el = this.politeLog.lastChild;
    }
    return el;
  }
}
