import { initialState } from "./data";
import { RootState } from "../store";

const users = (state: RootState) => state.user || initialState;

const selectors = {
  users,
};

export default selectors;
