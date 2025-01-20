"use server";

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
