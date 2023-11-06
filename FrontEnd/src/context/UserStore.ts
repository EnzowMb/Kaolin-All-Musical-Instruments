import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  name: string;
}

const UserState = {
  user: {} as User,
};

export const useUserState = create(devtools(() => UserState));
