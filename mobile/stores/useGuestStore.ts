import { create } from "zustand";

interface GuestState {
  isGuest: boolean;

  enableGuestMode: () => void;

  disableGuestMode: () => void;
}

export const useGuestStore =
  create<GuestState>((set) => ({
    isGuest: false,

    enableGuestMode: () =>
      set({
        isGuest: true,
      }),

    disableGuestMode: () =>
      set({
        isGuest: false,
      }),
  }));