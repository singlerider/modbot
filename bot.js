#!/usr/bin/env node
"use strict";
let config = require("./config/config");
let irc = require("tmi.js");

let options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: config.username,
    password: config.password
  },
  channels: ["#" + config.username]
};

let bot = new irc.client(options);

bot.connect();

bot.on("connected", function(address, port) {
  bot.join("#" + config.username);
});

bot.on("chat", function(channel, user, message, self) {
  if (user.mod != true) {
    bot.mod("#" + config.username, user.username);
  }
});
