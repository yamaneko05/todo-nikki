import * as server from "@/server";
import dayjs from "@/utils/dayjs";
import { Diary, Task } from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Day {
  date: Date;
  tasks: Task[];
  diary?: Diary;
}

interface DaysStore {
  days: Day[];
  loadDays: () => void;
  loadNextDays: () => void;
  loadPreviousDays: () => void;
  deleteTask: (dayIndex: number, taskIndex: number) => void;
  createTask: (dayIndex: number, task: Task) => void;
  updateTaskName: (dayIndex: number, taskIndex: number, name: string) => void;
  updateTaskDone: (dayIndex: number, taskIndex: number, done: boolean) => void;
}

const useDaysStore = create<DaysStore>()(
  immer((set, get) => ({
    days: [],
    loadDays: async () => {
      const dateGte = dayjs().add(-4, "day");
      const dateLte = dateGte.add(15, "day");
      const days = await server.getDays(dateGte.toDate(), dateLte.toDate());

      set((draft) => {
        draft.days = days;
      });
    },
    loadNextDays: async () => {
      const dateGte = dayjs(get().days.slice(-1)[0].date).add(1, "day");
      const dateLte = dateGte.add(15, "day");
      const newDays = await server.getDays(dateGte.toDate(), dateLte.toDate());
      set((draft) => {
        draft.days = [...draft.days, ...newDays];
      });
    },
    loadPreviousDays: async () => {
      const dateLte = dayjs(get().days[0].date).subtract(1, "day");
      const dateGte = dateLte.subtract(15, "day");
      const newDays = await server.getDays(dateGte.toDate(), dateLte.toDate());
      set((draft) => {
        draft.days = [...newDays, ...draft.days];
      });
    },
    deleteTask: (dayIndex: number, taskIndex: number) =>
      set((draft) => {
        draft.days[dayIndex].tasks = draft.days[dayIndex].tasks.filter(
          (_, i) => i != taskIndex,
        );
      }),
    createTask: (dayIndex: number, task: Task) => {
      set((draft) => {
        draft.days[dayIndex].tasks.push(task);
      });
    },
    updateTaskName: (dayIndex: number, taskIndex: number, name: string) => {
      set((draft) => {
        draft.days[dayIndex].tasks[taskIndex] = {
          ...draft.days[dayIndex].tasks[taskIndex],
          name: name,
        };
      });
    },
    updateTaskDone: (dayIndex: number, taskIndex: number, done: boolean) => {
      set((draft) => {
        draft.days[dayIndex].tasks[taskIndex] = {
          ...draft.days[dayIndex].tasks[taskIndex],
          done: done,
        };
      });
    },
  })),
);

export default useDaysStore;
