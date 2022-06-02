const watcher = require('./watcher')
const inquirer = require('inquirer');
require('dotenv').config()

var questions = [

  {
    type: 'input',
    name: 'from',
    message: "输入你要跟单的大冤种地址:",
    default: function () {
      return process.env.WATCH_FROM
    },
  },
    {
    type: 'input',
    name: 'privatekey',
    message: "输入你的私钥（只会存储在本机当中，可查源码）:",
    default: function () {
      return process.env.WATCH_FROM
    },
  },
      {
    type: 'input',
    name: 'publickey',
    message: "输入你的公钥（只会存储在本机当中，可查源码）:",
    default: function () {
      return process.env.WATCH_FROM
    },
  },

];

inquirer.prompt(questions).then(watcher.start);