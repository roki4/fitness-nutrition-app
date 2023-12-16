const express = require("express");
const mysql2 = require("mysql2");
const sequelize = require("sequelize");
const TelegramBot = require("node-telegram-bot-api");
const helper = require("./src/functions/helper.js");
const config = require("./config/index.js");
const keyboard = require("./src/keyboard/keyboard.js");
const kb = require("./src/keyboard/keyboard-button.js");

const bot = new TelegramBot(config.TOKEN, { polling: true });

bot.on("message", (msg) => {
  
});