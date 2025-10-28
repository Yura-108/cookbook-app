import {Session} from "next-auth";
import {create} from "zustand/react";

type SessionStatus = "authenticated" | "unauthenticated" | "loading";

interface AuthStore {
  isAuth: boolean;
  status: SessionStatus;
  session: Session | null;
  setAuthState: (status: SessionStatus, session: Session | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth : false,
  status: "loading",
  session: null,
  setAuthState: (status: SessionStatus, session: Session | null) =>
    set({
      isAuth: status === 'authenticated',
      status,
      session
    })
}))