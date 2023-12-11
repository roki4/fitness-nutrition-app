const express = require("express");
const mysql2 = require("mysql2");
const sequelize = require("sequelize");
const TelegramBot = require("node-telegram-bot-api");
const helper = require("./src/helper.js");
const config = require("./config/index.js");
const keyboard = require('./src/keyboard.js');

const bot = new TelegramBot(config.TOKEN, { polling: true });

let goal_for_day = 1;

bot.onText(/\/start/, async (msg) => {
  const text = `Здравствуйте, ${msg.from.first_name}!\n Нажмите ТЫК, чтобы отметитить, что вы поработали сегодня 30 минут.`;

  await bot.sendMessage(helper.getChatId(msg), text, {
    reply_markup: {
      keyboard: [[keyboard.home]],
    },
  });
});

bot.onText(/ТЫК/, async (msg) => {
  if (goal_for_day === 8) {
    await bot.sendMessage(
      helper.getChatId(msg),
      `${helper.convertCountToTime(
        goal_for_day
      )}\nВы прозанимались сегодня 4 часа! Можете отдыхать.`,
      {
        reply_markup: {
          keyboard: [[keyboard.home]],
        },
      }
    );
    await bot.sendMessage(helper.getChatId(msg), "🎉");

    goal_for_day = 0;
  }

  await bot.sendMessage(
    helper.getChatId(msg),

    `Ваш счёт: ${goal_for_day} - (${helper.convertCountToTime(goal_for_day)})`,
    {
      reply_markup: {
        keyboard: [[keyboard.home]],
      },
    }
  );

  goal_for_day++;
});
