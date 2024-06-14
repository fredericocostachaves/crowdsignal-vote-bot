import puppeteer from "puppeteer"; //npm i puppeteer; npx @puppeteer/browsers install chrome@stable

const browser = await puppeteer.launch({
  //executablePath: '/usr/bin/chromium-browser', // local onde o chromium tá instalado
  headless: true, // set to false to see browser and test if script works
  args: ["--incognito"],
});

async function runVotes() {
  for (let i = 0; i < 25; i++) {
    console.log("Votou "+ i +" vezes?");
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(`https://poll.fm/13862347/`);
    await page.evaluate(() => {
      document.querySelector("#PDI_answer61821574").click();
      document.querySelector(".pds-vote-button").click();
    });
    await page.close();
  }
}

function sleep(seconds) {
  console.log(`Sleeping for ${seconds} seconds...`);
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < seconds * 1000);
}

while (true) {
  console.log("Voting batch running");
  await runVotes();
  sleep(Math.floor(Math.random() * 20 + 10));
}
