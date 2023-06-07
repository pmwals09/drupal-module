/* eslint-disable max-classes-per-file */
const PERSONA = "persona";
const TEXTURE = "texture";
const VALID_TYPES = [PERSONA, TEXTURE];
const LEFT = "left";
const RIGHT = "right";
const VALID_ORIENTATIONS = [LEFT, RIGHT];

class InvalidOptionError extends Error {}
export class DataVizImage {
  /*
   * @param {Object} args - argument object for named arguments
   * @param {"persona" | "texture"} args.type - type of data viz image
   * @param {Persona | null} args.persona - if type === persona, the Persona
   * @param {"left" | "right"} args.orientation - the side of the persona on the slide in question
   * @param {string} args.src - the image source
   */
  constructor({ type, persona, orientation, src }) {
    if (!type && persona) {
      this._type = PERSONA;
    } else if (VALID_TYPES.includes(type)) {
      this._type = type;
    } else {
      throw new InvalidOptionError(
        `Invalid type: ${type}. Valid options are: ${VALID_TYPES.join(", ")}`
      );
    }

    if (this._type === "persona") {
      this._persona = persona;
    } else {
      this._persona = null;
    }

    if (VALID_ORIENTATIONS.includes(orientation)) {
      this._orientation = orientation;
    } else {
      throw new InvalidOptionError(
        `Invalid orientation: ${orientation}. Valid options are: ${VALID_ORIENTATIONS.join(
          ", "
        )}`
      );
    }

    this._src = src;
  }

  get type() {
    return this._type;
  }

  set type(newType) {
    if (VALID_TYPES.includes(newType)) {
      if (newType === TEXTURE) {
        this.persona = null;
      }
      this._type = newType;
    } else {
      throw new InvalidOptionError(
        `Invalid type: ${newType}. Valid options are: ${VALID_TYPES.join(", ")}`
      );
    }
  }

  get persona() {
    return this._persona;
  }

  set persona(newPersona) {
    if (this.type === TEXTURE && newPersona) {
      throw new InvalidOptionError(
        "This is a texture image, which cannot have a persona"
      );
    }
    this._persona = newPersona;
  }

  get orientation() {
    return this._orientation;
  }

  set orientation(newOrientation) {
    if (VALID_ORIENTATIONS.includes(newOrientation)) {
      this._orientation = newOrientation;
    } else {
      throw new InvalidOptionError(
        `Invalid orientation: ${newOrientation}. Valid options are: ${VALID_ORIENTATIONS.join(
          ", "
        )}`
      );
    }
  }

  get src() {
    return this._src;
  }

  set src(newSrc) {
    this._src = newSrc;
  }
}
