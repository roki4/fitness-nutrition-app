const express = require("express");
const mysql2 = require("mysql2");
const sequelize = require("sequelize");
const TelegramBot = require("node-telegram-bot-api");
const helper = require("./src/functions/helper.js");
const config = require("./config/index.js");
const keyboard = require("./src/keyboard/keyboard.js");
const kb = require("./src/keyboard/keyboard-button.js");
const foodCalories = require("./src/databases/foodsCalories.json");

const bot = new TelegramBot(config.TOKEN, { polling: true });

const buttonsApp = Object.keys(kb);

bot.on('message', async (msg) => {
  let currentKeyboard;
  const chatId = helper.getChatId(msg);

  switch (msg.text) {
    case kb.start:
      await sendHomeMenu(chatId);
      break;

    case kb.home.find_out_the_calories_of_a_dish:
    await requestDishCalories(chatId).then((name) => {    

        caloriesInDish(chatId, name)
      });
    break;

    case kb.menu_find_out_the_calories_of_a_dish.to_home:
      console.log('TO HOOOOME')
      await sendHomeMenu(chatId);
      break;
  }
});

//                                                                         FUNCTIONS

async function requestDishCalories(chatId) {
  await bot.sendMessage(
    chatId,
    'Write the name of the dish whose calorie content you want to know.',
    {
      reply_markup: {
        keyboard: keyboard.menu_find_out_the_calories_of_a_dish,
      },
    }
  );
  return new Promise((resolve) => {
    bot.on('message', (msg) => {
      if (msg.chat.id === chatId) {
        bot.off('message', this); // Remove the listener after one response
        resolve(msg.text);
      }
    });
  });
}

async function caloriesInDish(chatId, dishName) {
  if (kb.menu_find_out_the_calories_of_a_dish.to_home === dishName) {
    return;
  }
  const dish = foodCalories.find((item) => item.foodName.toLowerCase() === dishName.toLowerCase());  

  if (!dish) {

    await bot.sendMessage(chatId, `This dish was not found. Try again.`, {
      reply_markup: {
        keyboard: keyboard.home
      }
    })
    
  } else {

    await bot.sendMessage(
      chatId,
      `Calories in ${dish.foodName} is ${dish.calories}`,
      {
        reply_markup: {
          keyboard: keyboard.menu_find_out_the_calories_of_a_dish,
        },
      }
    );

    }
  }
  
  

  async function sendNotFound(chatId, currentKeyboard) {
    await bot.sendMessage(chatId, `Invalid text. Select text from the dropdown menu.`, {
      reply_markup: {
        keyboard: currentKeyboard
      }
    });
  }
  
  async function sendHomeMenu(chatId) {
    await bot.sendMessage(chatId, 'Hello, welcome to FitBot, select an item from the main menu.', {
      reply_markup: {
        keyboard: keyboard.home,
      },
    });
  }