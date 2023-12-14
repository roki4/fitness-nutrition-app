const express = require("express");
const mysql2 = require("mysql2");
const sequelize = require("sequelize");
const TelegramBot = require("node-telegram-bot-api");
const helper = require("./src/functions/helper.js");
const config = require("./config/index.js");
const kb = require("./src/keyboard/keyboard-button.js");
const keyboard = require("./src/keyboard/keyboard.js");

const bot = new TelegramBot(config.TOKEN, { polling: true });

bot.on("message", (msg) => {
  switch (msg.text) {
    case "/start":
      menu(msg);
      break;
    case keyboard.home.start_clicker_four_hour:
      four_hour_clicker(msg);
      break;
  }
});

//                                                                                main_functions
const four_hour_clicker = (msg) => {
  let goal_for_day = 1;

  bot.onText(/В главное меню/, (msg) => {
    bot.sendMessage(helper.getChatId(msg), "Выберите пункт в главного меню.", {
      reply_markup: {
        keyboard: kb.home,
      },
    });
  });

  bot.onText(/4-часовой кликер/, (msg) => {
    bot.sendMessage(
      helper.getChatId(msg),
      'Запустился режим 4-часового кликера. Нажмите "ТЫК", чтобы прибавить +30 мин.\nВаш нынешний счёт равен 0:00',
      {
        reply_markup: {
          keyboard: kb.clicker_four_hour_menu,
        }
      }
    );
  });

  bot.onText(/ТЫК/, (msg) => {
    if (goal_for_day !== 8) {
    bot.sendMessage(
      helper.getChatId(msg),

      `Ваш счёт: ${goal_for_day} - (${helper.convertCountToTime(
        goal_for_day
      )})`,
      {
        reply_markup: {
          keyboard: kb.clicker_four_hour_menu,
        },
      }
    );
    }
    goal_for_day++;
    if (goal_for_day === 9) {
      goal_for_day = 0;

      bot.sendMessage(
        helper.getChatId(msg),
        "Вы достигли сегодня поставленной цели!\nМожете отдыхать."
      );
      bot.sendMessage(
        helper.getChatId(msg),
        '🎉',
        {
          reply_markup: {
            keyboard: kb.home,
          },
        }
      );
    }
  });
};

const menu = (msg) => {
  console.log("function menu");

  const text = `Здравствуйте, ${msg.from.first_name}!\nВыберите пункт из выпадающего меню.`;

  bot.sendMessage(helper.getChatId(msg), text, {
    reply_markup: {
      keyboard: kb.home,
    },
  });
};