const mineflayer = require("mineflayer");

const options = {
  host: "TheNoNameSMP.aternos.me",
  port: 22844,
  username: "[!]AfkBot[!]",
};

const bot = mineflayer.createBot(options);

let isAfk = false;
let afkInterval; // Store the interval ID here

function startAfk() {
  if (!isAfk) {
    isAfk = true;
    bot.chat("I am now afk!");
    afkInterval = setInterval(() => {
      // Toggles the jump state every 10000 milliseconds (10 seconds)
      bot.setControlState("jump", true);
    }, 10000);
  }
}

function stopAfk() {
  if (isAfk) {
    clearInterval(afkInterval); // Stop the interval
    bot.clearControlStates(); // Stop all bot movement
    isAfk = false;
    bot.chat("AFK mode stopped.");
  }
}

bot.once("spawn", () => {
  bot.chat("Successfully joined the server!");
  bot.chat("/gamemode creative"); // Ensure the bot is in creative mode upon joining
});

bot.on("chat", (username, message) => {
  if (username === bot.username) return;

  switch (message) {
    case "!tpame":
      bot.chat("Teleporting to " + username + "!");
      bot.chat("/tpa " + username);
      break;

    case "!tpaaccept":
      bot.chat("Accepting teleport request from " + username + "!");
      bot.chat("/tpaccept");
      break;

    case "!afkhere":
      bot.chat("Going to the location of " + username + "!");
      bot.chat("/tpa " + username);
      break;

    case "!afk":
      if (!isAfk) {
        startAfk(); // Start the AFK movement
      } else {
        bot.chat("Already in AFK mode.");
      }
      break;

    case "!stopafk":
      stopAfk(); // Stop the AFK movement
      break;

    case "!help":
      bot.chat("Available commands:");
      bot.chat("!tpame - Request the bot to teleport to you.");
      bot.chat("!tpaaccept - The bot accepts your teleport request.");
      bot.chat("!afkhere - Request the bot to start AFK mode at your location.");
      bot.chat("!afk - Start AFK movement.");
      bot.chat("!stopafk - Stop AFK movement.");
      bot.chat("!tpnether - Teleport to specific coordinates in the Nether.");
      bot.chat("!help - Show this help message.");
      break;

    case "!sleep":
      // Specific coordinates in the Nether to teleport to
      const netherX = 141.38;
      const netherY = 250.92;
      const netherZ = -94.59;
      bot.chat(`/execute in minecraft:the_nether run tp ${bot.username} ${netherX} ${netherY} ${netherZ}`);
      bot.chat("I am currently in nether so You guys can sleep ")
      break;

    default:
      // Optionally handle unknown commands or ignore them
      break;
  }
});
