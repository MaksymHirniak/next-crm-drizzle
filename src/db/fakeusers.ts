import { db } from "./index";
import { users } from "./schema";
import { faker } from "@faker-js/faker";

async function runSeed() {
  const fakeUsers = [];
  
  for (let i = 0; i < 100; i++) {
    fakeUsers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: i % 10 === 0 ? "admin" : "user", 
    });
  }
  await db.insert(users).values(fakeUsers);
  process.exit(0);
}

runSeed().catch((err) => {
  console.error("Error seeding db", err);
  process.exit(1);
});