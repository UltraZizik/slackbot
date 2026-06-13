# Zizik Slack Bot

A okay slackbot that took me a long time to build and turned out okay!

## Features

- 🏓 **Latency Checker** - ping-pong: measures latency.
- 🐱 **Cat Facts** - random catfacts.
- 😂 **Jokes** - random Jokes.
- 🌍 **Translations** - Translate to any language or to my Czech language as im from Czech republic!
- 🛰️ **ISS Tracker** - says where the ISS is.

##  Quick Start

### Prerequisites
- Node.js 14+
- Slack App with Bot Token
- `tokens.env` file with tokens

### Installation

```bash
npm install
```

### Environment Variables

Create a `tokens.env` file:
```
SLACK_BOT_TOKEN=xoxb-your-token-here
SLACK_APP_TOKEN=xapp-your-token-here
```
Everything is in the tutorial for slackbot!

### Run the Bot

```bash
node index.js
```

## 📋 Commands

### 🏓 Ping - Check Bot Latency
```
/zizik-ping
```
Get your latency so you know how fast your bot communicates or if there are any problems.

**Response:**
```
🏓 Pong!
⚡ Latency: 1ms
```
<img width="257" height="107" alt="Snímek obrazovky 2026-06-13 183044" src="https://github.com/user-attachments/assets/6fddaa73-0017-4b1f-9215-8004d85ad3ba" />


### 🐱 Cat Facts - Random Cat Trivia
```
/zizik-catfact
```
<img width="378" height="83" alt="Snímek obrazovky 2026-06-13 183122" src="https://github.com/user-attachments/assets/9d3a3350-48f3-4d7b-92e4-75585726e68b" />


Some random catfact for your day!

### 😂 Jokes - Random Humor
```
/zizik-joke
```
Random joke to make your family laugh!

**Response:**
```
Why don't scientists trust atoms?
Because they make up everything!
```
<img width="388" height="97" alt="Snímek obrazovky 2026-06-13 183158" src="https://github.com/user-attachments/assets/f26cee0e-9ef0-4d05-8732-d71c6689acd9" />


### 🇨🇿 Translate to Czech
```
/zizik-translatetomylanguage Hello world - this is example
```
Translate any text into Czech automatically becasue why not?

**Output:**
```
In my (:flag-cz:) language it is: Ahoj světe
```
<img width="307" height="52" alt="Snímek obrazovky 2026-06-13 182954" src="https://github.com/user-attachments/assets/706340ff-587f-4af0-91ba-a5cb8faafb22" />

**Code Snippet:**
```javascript
app.command("/zizik-translatetomylanguage", async ({ command, ack, respond }) => {
  await ack();
  
  if(!command.text) {
    await respond({ text: "Please type any text to translate to my Language" });
    return;
  }

  try {
    const result = await translate(command.text, { to: 'cs' });
    await respond({ text: `In my (Czech) language it is: ${result.text}` });
  } catch (err) {
    await respond({ text: "I couldn't translate that" });
  }
});
```

---

### 🌍 Universal Translator
```
/zizik-translator <language-code> <text>
```
Translate text to any language in the world!

**Examples:**
```
/zizik-translator es Hello world             # Spanish
Translation: Hola Mundo
/zizik-translator fr Hello world             # French
Translation: Bonjour le monde
/zizik-translator ja Hello world             # Japanese
Translation: こんにちは世界
/zizik-translator de Hello world             # German
Translation: Hallo Welt
```
<img width="348" height="305" alt="Snímek obrazovky 2026-06-13 182844" src="https://github.com/user-attachments/assets/0953907a-4d6e-4030-83ba-d57c007f92d7" />

**Code Snippet:**
```javascript
app.command("/zizik-translator", async ({ command, ack, respond }) => {
  await ack();

  const trim = command.text.trim();
  const space = trim.indexOf(' ');
  
  if (space === -1) {
    await respond({ text: "Please provide a target language" });
    return;
  }

  const lang = trim.substring(0, space);
  const textToTranslate = trim.substring(space + 1);

  try {
    const result = await translate(textToTranslate, { to: lang });
    await respond({ text: `Translation: ${result.text}` });
  } catch (err) {
    await respond({ text: "I couldn't translate that" });
  }
});
```

---

### 🛰️ ISS Location Tracker
```
/zizik-isssatellites
```
Get coordinates to ISS thats all

**Response:**
```
ISS Location: 51.6442, -0.3354
(Latitude, Longitude)
```

**Code Snippet:**
```javascript
app.command("/zizik-isssatellites", async ({ command, ack, respond }) => {
  await ack(); 

  try {
    const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    await respond({ 
      text: `ISS Location: ${response.data.latitude}, ${response.data.longitude}` 
    });
  } catch (err) {
    await respond({ text: "I couldn't get ISS location" });
  }
});
```

---

### ℹ️ Help - View All Commands
```
/zizik-help
```
<img width="773" height="204" alt="Snímek obrazovky 2026-06-13 180021" src="https://github.com/user-attachments/assets/6bbb9758-b76b-4a69-bafc-a742ec361447" />

Help is just simply help it helps you out with commands!

## 🛠️ Tech Stack

- **Framework:** Slack Bolt for JavaScript
- **HTTP Client:** Axios
- **Translation:** google-translate-api-x
- **Environment:** dotenv

## 📦 Dependencies

```json
{
  "dependencies": {
    "axios": "^1.x.x",
    "dotenv": "^16.x.x",
    "@slack/bolt": "^3.x.x",
    "google-translate-api-x": "^1.x.x"
  }
}
```

## 📝 License

No license

## 👨‍💻 Author

**UltraZizik**

---

**there can be older code or some msitakes so be kind or report them immediately**

