const express = require('express');
const mysql2 = require('mysql2');
const sequelize = require('sequelize');
const TelegramBot = require('node-telegram-bot-api');
const helper = require('./helper.js');
const config = require('./config/index.js');

const bot = new TelegramBot(config.TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const text = `Здравствуйте, ${helper.getUser(msg)}!`;
  bot.sendMessage(helper.getChatId(msg), text);
});