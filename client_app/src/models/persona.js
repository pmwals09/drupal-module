import mateoPng from "../assets/images/Mateo.png";
import toniPng from "../assets/images/Toni.png";
import nadiaPng from "../assets/images/Nadia.png";
import butterbeanPng from "../assets/images/Butterbean.png";
import toniFull from "../assets/images/Toni-full.png";
import nadiaFull from "../assets/images/Nadia-full.png";
import mateoFull from "../assets/images/Mateo-full.png";
import { characterDescriptions } from "../services/audioDescription.js";

const MATEO = "Mateo";
const BUTTERBEAN = "Butterbean";
const CPT_BUTTERBEAN = "Captain Butterbean";
const TONI = "Toni";
const NADIA = "Nadia";

export class Persona {
  constructor({ name }) {
    this._name = name;
  }

  get avatar() {
    switch (this.name) {
      case MATEO:
        return mateoPng;
      case BUTTERBEAN:
      case CPT_BUTTERBEAN:
        return butterbeanPng;
      case TONI:
        return toniPng;
      case NADIA:
        return nadiaPng;
      default:
        return "";
    }
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  get img() {
    switch (this.name) {
      case TONI:
        return toniFull;
      case NADIA:
        return nadiaFull;
      case MATEO:
        return mateoFull;
      default:
        return "";
    }
  }

  get color() {
    switch (this.name) {
      case TONI:
        return "#0064AA";
      case NADIA:
        return "#FFD84C";
      case MATEO:
        return "#00AA4B";
      default:
        return "#FFF";
    }
  }

  get description() {
    return characterDescriptions[this.name]?.main || "";
  }

  get shortDescription() {
    return characterDescriptions[this.name]?.short || "";
  }
}
