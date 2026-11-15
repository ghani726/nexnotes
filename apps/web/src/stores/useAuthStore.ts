import { create } from "zustand";
import type { IUser } from "@packages/types/auth";
interface AuthStore {
    user: IUser | null;
    accessToken: string;
    setAccessToken: (value: string) => void;
    setUser: (value: IUser | null) => void;
    logout: () => void;
}
const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    accessToken: "",
    setUser: (user) => set({ user }),
    setAccessToken: (value) => set({ accessToken: value }),
    logout: () => set({ user: null, accessToken: "" }),
}));

export default useAuthStore;
