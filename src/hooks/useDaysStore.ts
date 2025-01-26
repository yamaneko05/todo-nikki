import * as server from "@/server";
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
  loadDays: (date: Date) => void;
  deleteTask: (dayIndex: number, taskIndex: number) => void;
  createTask: (dayIndex: number, task: Task) => void;
  updateTaskName: (dayIndex: number, taskIndex: number, name: string) => void;
  updateTaskDone: (dayIndex: number, taskIndex: number, done: boolean) => void;
}

const useDaysStore = create<DaysStore>()(
  immer((set) => ({
    days: [],
    loadDays: async (date: Date) => {
      const days = await server.getDays(date);
      set((draft) => {
        draft.days = days;
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
