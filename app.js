const express = require("express");
const mysql2 = require("mysql2");
const sequelize = require("sequelize");
const TelegramBot = require("node-telegram-bot-api");
const helper = require("./src/functions/helper.js");
const config = require("./config/index.js");
const keyboard = require("./src/keyboard/keyboard.js");
const kb = require("./src/keyboard/keyboard-button.js");
const foodCalories = require('./src/databases/foodsCalories.json');


const bot = new TelegramBot(config.TOKEN, { polling: true });


bot.on("message", (msg) => {
  switch(msg.text) {
    case kb.start:
      bot.sendMessage(helper.getChatId(msg), `Hello, welcome to FitBot, select an item from the main menu.`, {
        reply_markup: {
          keyboard: keyboard.home
        }
      });
    break;

    case kb.home.find_out_the_calories_of_a_dish:
      bot.sendMessage(helper.getChatId(msg), `Write the dish whose calorie content you want to know.`, {
        reply_markup: {
          keyboard: keyboard.menu_find_out_the_calories_of_a_dish
        }
      });
      bot.on('message', (msg) => {
        caloriesInDish(msg);
      })
      break;
      
    case kb.menu_find_out_the_calories_of_a_dish.to_home:
      bot.sendMessage(helper.getChatId(msg), `You have moved to the main menu.`, {
        reply_markup: {
          keyboard: keyboard.home
        }
      })
      break;
  }
});


//                                                             functions

const caloriesInDish = (msg) => {
  let end = false;
  for (let i = 0; i < foodCalories.length; i++) {
    

    for (let j = 0; j < foodCalories[i].foodItems.length; j++) {


      if (foodCalories[i].foodItems[j].foodName === msg.text) {

        const calories = foodCalories[i].foodItems[j].calories;
        bot.sendMessage(helper.getChatId(msg), `Calories in ${msg.text} is ${calories}`, {
          reply_markup: {
            keyboard: keyboard.menu_find_out_the_calories_of_a_dish
          }
        });
        end = true;
        
      }
      if (end === true) {
        break;
      }
      
    }

   
  }
}