import { fakerJA as faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const createDummyTask = () => ({
  name: faker.lorem.words(),
  date: faker.date.between({
    from: dayjs().add(-8, "day").toDate(),
    to: dayjs().add(32, "day").toDate(),
  }),
  done: false,
});

const prisma = new PrismaClient();

(async () => {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: "だいち",
      email: "o.yamaneko0331@example.com",
      tasks: {
        create: [...Array(64)].map(() => createDummyTask()),
      },
    },
  });
})();
