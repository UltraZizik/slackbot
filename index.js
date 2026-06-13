const axios = require("axios");
//imported google API for translation
const translate = require('google-translate-api-x');

require('dotenv').config({ path: 'tokens.env' });

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});
//command from tutorial the starting point
app.command("/zizik-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `🏓 Pong!\n⚡ Latency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running")
})();
//this is frm tutorial but it is mostly modified
app.command("/zizik-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`🤖 Available Commands:
🏓 /zizik-ping - Check bot latency
🐱 /zizik-catfact - Get a cat fact
😂 /zizik-joke - Get a random joke
🇨🇿 /zizik-translatetomylanguage - Translate text to my language
🌍 /zizik-translator - First specify your language and then type the text after a space.
🛰️ /zizik-isssatellites - Get the current ISS location
`
  });
});
//this is from the tutorial and it makes a catfact
app.command("/zizik-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `🐱 Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});
//this is from the tutorial and it makes a joke
app.command("/zizik-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`😂 ${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});
//this(not from th original tutorial) translates something from literally any language to Czech
app.command("/dzb-translatetomylanguage", async ({ command, ack, respond }) => {
  await ack();
  console.log("Received text to translate:", command.text);
  
  if(!command.text) {
    await respond({ text: "Please type any text to translate to my Language" });
    return;
  }

  try {
    console.log("Sending text to Google TranslateAPI");
    const result = await translate(command.text, { to: 'cs' });
    await respond({ text: `In my (🇨🇿) language it is: ${result.text}` });
    console.log("Translation result:", result.text);
  } catch (err) {
    await respond({ text: "I didnt know how but im unable to translate that" });
  }
});
//this makes you translate something into any language
app.command("/zizik-translator", async ({ command, ack, respond }) => {
  await ack();

  if(!command.text) {
    await respond({ text: "Type something to translate" });
    return;
  }
  //language choosing
  //these two trim the text to the first space
  const trim = command.text.trim();
  const space =trim.indexOf(' ');
  //this is if there is no specified language because the space is missing
  if (space === -1) {
    await respond({ text: "Please provide a target language" });
    return;
  }
  //this extracts the the language it wants to translate and turns it into a code.
  //the second line just gets the text to  translate and puts it in as in the first translator
  const lang = trim.substring(0, space);
  const textToTranslate = trim.substring(space + 1);
  //this is the same as before
  try {
    const result = await translate(textToTranslate, { to: lang });
    await respond({ text: `🌍Translation: ${result.text}` });
  } catch (err) {
    await respond({ text: "I didnt know how but im unable to translate that" });
  }
});
//this tells you ISS location
app.command("/zizik-isssatellites", async ({ command, ack, respond }) => {
  await ack(); 

  try {
  const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544")
  await respond({ text: `🛰️ ISS Location: ${response.data.latitude}, ${response.data.longitude}` });
  } catch (err) {
    await respond({ text: "I didnt know how but im unable to get ISS location" });
  }
});

