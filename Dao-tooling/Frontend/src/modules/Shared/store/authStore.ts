import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  id?: string;
  accessToken?: string;
  walletAddress?: string;
}
interface User {
  user: IUser | {};

  setUser: (user: IUser) => void;

  removeUser: () => void;
}

export const useAuthStore = create<User>()(
  persist(
    (set) => ({
      user: {},
      //set user
      setUser(data: IUser) {
        set(() => ({
          user: {
            ...this.user,
            id: data.id,
            accessToken: data.accessToken,
            walletAddress: data.walletAddress,
          },
        }));
      },

      //delete states

      //clear user
      removeUser() {
        set(() => ({
          user: {},
        }));
      },
    }),
    {
      name: "userData",
    }
  )
);
