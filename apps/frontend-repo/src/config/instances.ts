import axios from "axios";
import URLS from "./urls";
import CONFIG from ".";

export const BEInstance = axios.create({
  baseURL: URLS.BE_API,
  headers: {
    "ebuddy-api-key": CONFIG.SECRET,
  },
});
