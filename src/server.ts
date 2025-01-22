"use server";

import { auth } from "./utils/auth";
import { prisma } from "./utils/prisma";
import { getDays as getDaysSql } from "@prisma/client/sql";

export const getDays = async (date: Date) => {
  const tasks = await prisma.$queryRawTyped(getDaysSql(date));

  const days = Object.entries(
    Object.groupBy(tasks, (result) => result.dayDate!.toISOString()),
  ).map(([date, results]) => ({
    date: new Date(date),
    tasks: results!.filter((task) => task.id),
  }));

  return days;
};

export const deleteTask = async (id: string) => {
  await prisma.task.delete({ where: { id: id } });
};

export const createTask = async (date: Date) => {
  const task = await prisma.task.create({
    data: {
      date: date,
      name: "",
      userId: (await auth())!.user!.id!,
      done: false,
    },
  });

  return task;
};

export const updateTask = async (
  id: string,
  name: string,
  done: boolean,
  date: Date,
) => {
  const task = await prisma.task.update({
    where: { id: id },
    data: {
      name: name,
      done: done,
      date: date,
    },
  });

  return task;
};
