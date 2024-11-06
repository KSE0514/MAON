import axios from "axios";
import { RUN_API } from "@env";

export const apiClient = axios.create({
  baseURL: "https://k11c207.p.ssafy.io/maon",
});
export const runClient = axios.create({
  baseURL: RUN_API,
  headers: {
    "Content-Type": "application/json",
  },
});
