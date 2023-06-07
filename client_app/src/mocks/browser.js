// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from "msw";
import { handlers } from "./handlers.js";

export const worker = setupWorker(...handlers);
