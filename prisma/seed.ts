import { fakerJA as faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const createDummyTask = () => ({
  name: faker.lorem.words(),
  date: faker.date.between({
    from: dayjs().add(-16, "day").toDate(),
    to: dayjs().add(64, "day").toDate(),
  }),
  done: false,
});

const createDummyDiary = (date: Date) => ({
  title: faker.lorem.words(),
  date: date,
  content: faker.lorem.paragraphs(),
});

const prisma = new PrismaClient();

(async () => {
  await prisma.task.deleteMany();
  await prisma.diary.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: "だいち",
      email: "o.yamaneko0331@example.com",
      tasks: {
        create: [...Array(128)].map(() => createDummyTask()),
      },
      diaries: {
        create: faker.date
          .betweens({
            from: dayjs().add(-16, "day").toDate(),
            to: dayjs().add(64, "day").toDate(),
            count: 16,
          })
          .map((date) => createDummyDiary(date)),
      },
    },
  });
})();
