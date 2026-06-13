# Zizik Slack Bot

A okay slackbot that took me a long time to build and turned out okay!

## Features

- 🏓 **Latency Checker** - Monitor bot responsiveness
- 🐱 **Cat Facts** - Get random cat facts on demand
- 😂 **Jokes** - Brighten up your day with random jokes
- 🌍 **Translations** - Translate to any language or to Czech
- 🛰️ **ISS Tracker** - Track the International Space Station location in real-time

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
Get real-time latency measurements to ensure your bot is running smoothly.

**Response:**
```
🏓 Pong!
⚡ Latency: 1ms
```

---

### 🐱 Cat Facts - Random Cat Trivia
```
/zizik-catfact
```
Learn a new interesting fact about cats!

### 😂 Jokes - Random Humor
```
/zizik-joke
```
Get a random joke to make your team laugh!

**Response:**
```
Why don't scientists trust atoms?
Because they make up everything!
```

---

### 🇨🇿 Translate to Czech
```
/zizik-translatetomylanguage Hello world - this is example
```
Translate any text into Czech automatically.

**Output:**
```
In my (:flag-cz:) language it is: Ahoj světe
```

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
Get real-time coordinates of the International Space Station!

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
See a complete list of all available commands.

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

**Enjoy your Slack bot! 🎉**
