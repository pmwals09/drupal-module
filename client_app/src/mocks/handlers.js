// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { mock } from "../services/apiService.js";

export const handlers = [
  rest.get("/data/submission/total/report", mock.report.getAll),
  rest.post("/data/submission/responses/save", mock.report.saveResponse),
];
