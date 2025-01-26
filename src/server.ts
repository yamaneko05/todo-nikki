"use server";

import { redirect } from "next/navigation";
import { auth } from "./utils/auth";
import dayjs from "./utils/dayjs";
import { prisma } from "./utils/prisma";

export const getDays = async (date: Date) => {
  const DAYS_PER_FETCH = 24;

  const tasks = await prisma.task.findMany({
    where: {
      date: {
        lte: dayjs(date).add(DAYS_PER_FETCH, "day").toDate(),
        gte: date,
      },
    },
  });

  const diaries = await prisma.diary.findMany({
    where: {
      date: {
        lte: dayjs(date).add(DAYS_PER_FETCH, "day").toDate(),
        gte: date,
      },
    },
  });

  const days = [...Array(DAYS_PER_FETCH)].map((_, i) => {
    const currentDate = dayjs(date).add(i, "day");
    return {
      date: currentDate.toDate(),
      tasks: tasks.filter((task) => currentDate.isSame(task.date, "day")),
      diary: diaries.find((diary) => currentDate.isSame(diary.date, "day")),
    };
  });

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

export const updateTaskName = async (id: string, name: string) => {
  await prisma.task.update({
    where: { id: id },
    data: {
      name: name,
    },
  });
};

export const updateTaskDone = async (id: string, done: boolean) => {
  await prisma.task.update({
    where: { id: id },
    data: {
      done: done,
    },
  });
};

export const updateDiaryTitle = async (id: string, title: string) => {
  const diary = await prisma.diary.update({
    where: { id: id },
    data: { title: title },
  });

  return diary;
};

export const updateDiaryContent = async (id: string, content: string) => {
  const diary = await prisma.diary.update({
    where: { id: id },
    data: { content: content },
  });

  return diary;
};

export const createDiary = async (date: Date) => {
  const diary = await prisma.diary.create({
    data: {
      date: date,
      title: "",
      content: "",
      userId: (await auth())!.user!.id!,
    },
  });

  redirect(`/diary/${diary.id}`);
};

export const deleteDiary = async (id: string) => {
  await prisma.diary.delete({ where: { id: id } });

  redirect("/days");
};
