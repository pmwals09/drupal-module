import { Deque } from "./Deque.js";

describe("Deque for speech utterance tracking", () => {
  test("Initializes", () => {
    const d = new Deque();
    expect(d.front).toBeNull();
    expect(d.back).toBeNull();
    expect(d.length).toBe(0);
  });

  describe("#addFront()", () => {
    test("once", () => {
      const d = new Deque();
      const val = "Hello";
      d.addFront(val);
      expect(d.front.value).toBe(val);
      expect(d.front.next).toBeNull();
      expect(d.front.prev).toBeNull();
      expect(d.back.value).toBe(val);
      expect(d.back.next).toBeNull();
      expect(d.back.prev).toBeNull();
      expect(d.length).toBe(1);
    });
    test("twice", () => {
      const d = new Deque();
      const val1 = "Hello";
      const val2 = "World";
      d.addFront(val2); // World
      d.addFront(val1); // Hello
      expect(d.front.value).toBe(val1);
      expect(d.front.next.value).toBe(val2);
      expect(d.front.prev).toBeNull();
      expect(d.back.value).toBe(val2);
      expect(d.back.prev.value).toBe(val1);
      expect(d.back.next).toBeNull();
      expect(d.length).toBe(2);
    });
    test("thrice", () => {
      const d = new Deque();
      const val1 = "Hello";
      const val2 = "World";
      const val3 = "!";
      d.addFront(val3); // !
      d.addFront(val2); // World
      d.addFront(val1); // Hello
      expect(d.front.value).toBe(val1);
      expect(d.front.next.value).toBe(val2);
      expect(d.front.next.next.value).toBe(val3);
      expect(d.front.prev).toBeNull();
      expect(d.back.value).toBe(val3);
      expect(d.back.prev.value).toBe(val2);
      expect(d.back.prev.prev.value).toBe(val1);
      expect(d.back.next).toBeNull();
      expect(d.length).toBe(3);
    });
  });

  describe("#removeFront()", () => {
    let d = null;
    const val1 = "Hello";
    const val2 = "World";
    const val3 = "!";
    beforeEach(() => {
      d = new Deque();
      d.addFront(val3); // !
      d.addFront(val2); // World
      d.addFront(val1); // Hello
    });

    test("once", () => {
      d.removeFront(); // Hello
      expect(d.front.value).toBe(val2);
      expect(d.back.value).toBe(val3);
      expect(d.length).toBe(2);
    });

    test("twice", () => {
      d.removeFront(); // Hello
      d.removeFront(); // World
      expect(d.front.value).toBe(val3);
      expect(d.back.value).toBe(val3);
      expect(d.length).toBe(1);
    });
    test("thrice", () => {
      d.removeFront(); // Hello
      d.removeFront(); // World
      d.removeFront(); // !
      expect(d.front).toBeNull();
      expect(d.back).toBeNull();
      expect(d.length).toBe(0);
    });
  });

  describe("#peekFront()", () => {
    test("empty", () => {
      const d = new Deque();
      expect(d.peekFront()).toBeNull();
    });
    test("length = 1", () => {
      const d = new Deque();
      d.addBack("Hello");
      expect(d.peekFront()).toBe("Hello");
    });
    test("length > 1", () => {
      const d = new Deque();
      d.addBack("Hello");
      d.addBack("World");
      expect(d.peekFront()).toBe("Hello");
    });
  });

  describe("#addBack()", () => {
    test("once", () => {
      const d = new Deque();
      const val = "Hello";
      d.addBack(val);
      expect(d.front.value).toBe(val);
      expect(d.front.next).toBeNull();
      expect(d.front.prev).toBeNull();
      expect(d.back.value).toBe(val);
      expect(d.back.next).toBeNull();
      expect(d.back.prev).toBeNull();
      expect(d.length).toBe(1);
    });
    test("twice", () => {
      const d = new Deque();
      const val1 = "Hello";
      const val2 = "World";
      d.addBack(val1); // Hello
      d.addBack(val2); // World
      expect(d.front.value).toBe(val1);
      expect(d.front.next.value).toBe(val2);
      expect(d.front.prev).toBeNull();
      expect(d.back.value).toBe(val2);
      expect(d.back.prev.value).toBe(val1);
      expect(d.back.next).toBeNull();
      expect(d.length).toBe(2);
    });
    test("thrice", () => {
      const d = new Deque();
      const val1 = "Hello";
      const val2 = "World";
      const val3 = "!";
      d.addBack(val1); // Hello
      d.addBack(val2); // World
      d.addBack(val3); // !
      expect(d.front.value).toBe(val1);
      expect(d.front.next.value).toBe(val2);
      expect(d.front.next.next.value).toBe(val3);
      expect(d.front.prev).toBeNull();
      expect(d.back.value).toBe(val3);
      expect(d.back.prev.value).toBe(val2);
      expect(d.back.prev.prev.value).toBe(val1);
      expect(d.back.next).toBeNull();
      expect(d.length).toBe(3);
    });
  });

  describe("#removeBack()", () => {
    let d = null;
    const val1 = "Hello";
    const val2 = "World";
    const val3 = "!";
    beforeEach(() => {
      d = new Deque();
      d.addFront(val3); // !
      d.addFront(val2); // World
      d.addFront(val1); // Hello
    });

    test("once", () => {
      d.removeBack(); // !
      expect(d.front.value).toBe(val1);
      expect(d.back.value).toBe(val2);
      expect(d.length).toBe(2);
    });

    test("twice", () => {
      d.removeBack(); // !
      d.removeBack(); // World
      expect(d.front.value).toBe(val1);
      expect(d.back.value).toBe(val1);
      expect(d.length).toBe(1);
    });
    test("thrice", () => {
      d.removeBack(); // !
      d.removeBack(); // World
      d.removeBack(); // Hello
      expect(d.front).toBeNull();
      expect(d.back).toBeNull();
      expect(d.length).toBe(0);
    });
  });
  describe("#peekBack()", () => {
    test("empty", () => {
      const d = new Deque();
      expect(d.peekBack()).toBeNull();
    });
    test("length = 1", () => {
      const d = new Deque();
      d.addBack("Hello");
      expect(d.peekBack()).toBe("Hello");
    });
    test("length > 1", () => {
      const d = new Deque();
      d.addBack("Hello");
      d.addBack("World");
      expect(d.peekBack()).toBe("World");
    });
  });
});
