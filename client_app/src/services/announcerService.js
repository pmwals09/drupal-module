import { Announcer } from "../models/announcer.js";

let announcer = null;

export function announce({ message, level = "polite", timeout = 0 }) {
  if (!announcer) {
    announcer = new Announcer();
  }

  announcer.announce({ message, level, timeout });
}

export function clear(level = "") {
  if (announcer) {
    announcer.clear(level);
  } else {
    console.error("No announcer available in clear()");
  }
}

export function remove() {
  if (announcer) {
    announcer.remove();
    announcer = null;
  } else {
    console.error("No announcer available in remove()");
  }
}

export function getLastItem() {
  if (announcer) {
    return announcer.getLast();
  }
  console.error("No announcer availble in focusLastItem()");
  return null;
}
