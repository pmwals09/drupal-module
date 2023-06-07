// NOTE: Some of these spellings are intentionally incorrect in order to help
// the text-to-speech system produce the correct pronunciation, such as:
// - using "corn row" instead of "cornrow"
// - using "heejob" instead of "hijab"
export const characterDescriptions = {
  Mateo: {
    main: "Mateo is a tall, thin boy with pale skin, and spikey brown hair with shaved lines on the side. He wears a bright green sweatshirt with a purple hood, black jeans, and green, high-top sneakers.",
    short:
      "Mateo is a tall, thin boy with pale skin, and spikey brown hair with shaved lines on the side.",
  },
  Butterbean: {
    main: "Captain Butterbean is a cat, white belly, throat and muzzle and brown on top.",
    get short() {
      return this.main;
    },
  },
  Toni: {
    main: "Toni has dark skin and black hair styled high in a wind-blown natural look with blue streaks and corn row braids on one side. They wear a purple jacket over a black tee shirt, torn blue jeans and ankle-high sneakers.",
    short:
      "Toni has dark skin and black hair styled high in a wind-blown natural look with blue streaks and corn row braids on one side.",
  },
  Nadia: {
    main: "Nadia is a pale-skinned girl with a light pink heejob or head scarf and black-rimmed glasses. She wears a dark pink shirt with a white belt, a long yellow skirt, and black boots that reach mid-calf.",
    short:
      "Nadia is a pale-skinned girl with a light pink heejob or head scarf and black-rimmed glasses.",
  },
};

const topicsScreenDescription = {
  page: {
    text: "This screen presents a menu of topics.",
    kiosk:
      "On the key pad, use the right and left arrow keys at the top to move through the topics. Use the center key to select.",
  },
};

export const helpDescription = `
  This screen, titled "Keypad Navigation," has a picture of the keypad below that you can use to navigate the program. At the top of the keypad is a diamond-shaped section, like a square rotated 45 degrees. The four corners of the shape form arrows.

  The top arrow increases the volume of the audio description. The bottom arrow decreases the volume.

  The right arrow moves forward through a list of options on the screen. The left arrow moves backward through that list. The center key selects the current option.

  On the lower left of the keypad are two more square keys. The top one will repeat the last audio description. The lower key accesses these instructions at any time during the program.

  At lower right are two side-by-side keys. The right one increases the playback speed of the audio description. The left one decreases it. Just above those keys is the headphone jack. Plugging in a set of headphones will turn the keypad on. Unplugging turns it off.

  To exit this screen, press the select key in the middle of the diamond-shaped section at the top of the keypad.
`;

export default {
  "/": topicsScreenDescription,
  "/chatbot/chat": topicsScreenDescription,
  "/chatbot/attract":
    "Welcome to the Group Chat. The screen looks like a cellphone lock screen. Messages appear from the people in the Group Chat inviting you to share your thoughts about your cellphone. To start the Group Chat, select the center key.",
  "/chatbot/chat/*": "You are in the group chat",
};

export const dataVizDescription =
  "This is a looping data visualization of how visitors answered questions in the Group Chat. On the screens, Mateo, Nadia, or Toni present the question and a chart with percentages shows how people answered.";
