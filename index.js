const axios = require("axios");
const translate = require('google-translate-api-x');
require('dotenv').config({ path: 'tokens.env' });

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/dsb-zizikping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running")
})();

app.command("/dsb-zizikhelp", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/dsb-zizikping - Check bot latency
/dsb-zizikcatfact - Get a cat fact
/dsb-zizikjoke - Get a random joke
`
  });
});

app.command("/dsb-zizikcatfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/dsb-zizikjoke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.command("/dsb-translatetozizikslanguage", async ({ command, ack, respond }) => {
  await ack();
  console.log("Received text to translate:", command.text);
  
  if(!command.text) {
    await respond({ text: "Please type any text to translate to my Language" });
    return;
  }

  try {
    console.log("Sending text to Google TranslateAPI");
    const result = await translate(command.text, { to: 'cs' });
    await respond({ text: `In Ziziks language it is: ${result.text}` });
    console.log("Translation result:", result.text);
  } catch (err) {
    await respond({ text: "I didnt know how but im unable to translate that" });
  }
});
