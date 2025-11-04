import { test, expect, firefox } from "@playwright/test";

test.describe("My Test Suite", () => {
  test.setTimeout(60000);

  test("My Test Case", async () => {
    const browser = await firefox.launch();
    const page = await browser.newPage();

    try {
      await authenticate(page);
    } finally {
      await browser.close();
    }
  });
});

async function authenticate(page) {
  await page.goto("https://bitheap.tech");
  await page.click("#menu-item-2330");
  await page.locator("[name='xoo-el-username']").fill("playwright");
  await page.locator("[name='xoo-el-password']").fill("playwright");
  await page
    .locator(
      "css=body > div.xoo-el-container.xoo-el-style-popup.xoo-el-popup-active > div.xoo-el-modal > div > div > div.xoo-el-srcont > div > div > div.xoo-el-section.xoo-el-active > div > form > button"
    )
    .click();
  const text = await page
    .locator(
      "css=#page > div.site.kv-site.kv-main > content > div > section.background-id_808080m16.section-2.meruhy39.undefined.kv-full-page > div.position-relative.kv-content > div > div > div > div:nth-child(1) > h2"
    )
    .textContent();

  if (text !== "Welcome to bitheap") {
    console.error("The authentication was not successful!");
  }
  await page.screenshot({ path: "screenshot.png" });
}
