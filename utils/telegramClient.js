require("dotenv").config();
const XMLHttpRequest = require("xhr2");

const api_token = process.env.TELEGRAM_BOT_API_TOKEN;
const chat_id = process.env.TELEGRAM_CHANNEL_NAME;

const telegramChannelSendMsg = (msg) => {
  try {
    const urlString = `https://api.telegram.org/bot${api_token}/sendMessage?chat_id=${chat_id}&text=${msg}`;
    const request = new XMLHttpRequest();
    request.open("GET", urlString);
    request.send();

    return request.response;
  } catch (error) {
    console.log("🚀 ~ telegramChannelSendMsg ~ error", error);
  }
};

module.exports.telegramChannelSendMsg = telegramChannelSendMsg;
