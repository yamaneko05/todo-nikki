import { getDays } from "@prisma/client/sql";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Day {
  date: Date;
  tasks: getDays.Result[];
}

interface DaysStore {
  days: Day[];
  setDays: (days: Day[]) => void;
}

const useDaysStore = create<DaysStore>()(
  immer((set) => ({
    days: [],
    setDays: (days: Day[]) =>
      set((draft) => {
        draft.days = days;
      }),
  })),
);

export default useDaysStore;
