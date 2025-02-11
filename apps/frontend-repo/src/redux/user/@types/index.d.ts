import { User } from "@repo/shared";

export interface UserState {
  list: User[];
  lastUpdated: Date;
}
