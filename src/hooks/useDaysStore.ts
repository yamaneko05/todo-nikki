import { Task } from "@prisma/client";
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
  deleteTask: (dayIndex: number, taskIndex: number) => void;
  createTask: (dayIndex: number, task: Task) => void;
  updateTask: (
    dayIndex: number,
    taskIndex: number,
    name: string,
    done: boolean,
    date: Date,
  ) => void;
}

const useDaysStore = create<DaysStore>()(
  immer((set) => ({
    days: [],
    setDays: (days: Day[]) =>
      set((draft) => {
        draft.days = days;
      }),
    deleteTask: (dayIndex: number, taskIndex: number) =>
      set((draft) => {
        draft.days[dayIndex].tasks = draft.days[dayIndex].tasks.filter(
          (_, i) => i != taskIndex,
        );
      }),
    createTask: (dayIndex: number, task: Task) => {
      set((draft) => {
        draft.days[dayIndex].tasks.push({
          ...task,
          dayDate: task.date,
        });
      });
    },
    updateTask: (
      dayIndex: number,
      taskIndex: number,
      name: string,
      done: boolean,
      date: Date,
    ) => {
      set((draft) => {
        draft.days[dayIndex].tasks[taskIndex] = {
          ...draft.days[dayIndex].tasks[taskIndex],
          name: name,
          done: done,
          date: date,
        };
      });
    },
  })),
);

export default useDaysStore;
