import { User } from "@repo/shared";

export type UserRow = User & { isNew: boolean }; // for data grid component
