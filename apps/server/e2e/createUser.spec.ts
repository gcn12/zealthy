import { test, expect } from "@playwright/test";
import { prisma } from "../prisma/prisma";

const user1 = {
  email: "abcdef11@gmail.com",
  name: "Danny Brown Townson",
  subject: "abcdef this does not work 1201",
  description: "long text goes here",
};

const user2 = {
  email: "user20000011@gmail.com",
  name: "Wooo Brown aaaaa",
  subject: "noewfwwf wefoiwefewf",
  description: "short text is here",
};

test("Create two users, update the status of first to 'open'", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  await page.getByLabel("Email").fill(user1.email);
  await page.getByLabel("Name").fill(user1.name);
  await page.getByLabel("Subject").fill(user1.subject);
  await page.getByLabel("Description of issue").fill(user1.description);
  await page.getByRole("button").click();
  await expect(page.getByText(/Sent successfully/)).toBeVisible();

  await page.reload();

  await page.getByLabel("Email").fill(user2.email);
  await page.getByLabel("Name").fill(user2.name);
  await page.getByLabel("Subject").fill(user2.subject);
  await page.getByLabel("Description of issue").fill(user2.description);
  await page.getByRole("button").click();
  await expect(page.getByText(/Sent successfully/)).toBeVisible();

  await page.goto("http://localhost:3000/dashboard");
  await page.waitForURL("**/dashboard");

  await expect(page.getByRole("link").nth(1)).toHaveText(
    new RegExp(user1.email, "g")
  );
  await expect(page.getByRole("link").first()).toHaveText(
    new RegExp(user2.email, "g")
  );

  await expect(page.getByRole("link").first()).not.toHaveText(/Open/);

  await page.getByRole("link").first().click();

  await page.waitForURL("**/ticket/**");
  await expect(page.getByText(user1.email)).not.toBeVisible();

  await expect(page.getByText(/New/)).toBeVisible();
  await expect(page.getByText(/Open/)).not.toBeVisible();
  await page.getByRole("button", { name: "New" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/Open/)).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Escape");
  await expect(page.getByText(/New/)).not.toBeVisible();

  await page.getByRole("link", { name: "Back" }).click();
  await page.waitForURL("**/dashboard");
  await expect(page.getByRole("link").first()).toHaveText(/Open/);
});

test.beforeAll(async () => {
  await prisma.ticket.deleteMany({ where: { email: user1.email } });
  await prisma.ticket.deleteMany({ where: { email: user2.email } });
});

test.afterAll(async () => {
  await prisma.ticket.deleteMany({ where: { email: user1.email } });
  await prisma.ticket.deleteMany({ where: { email: user2.email } });
});
