require("dotenv").config();
const momentTZ = require("moment-timezone");
const axios = require("axios");
const { telegramChannelSendMsg } = require("./telegramClient");
const https = require("https");
const HTMLParser = require("node-html-parser");

const SJC_SOURCE = "https://sjc.com.vn/giavang/textContent.php";

const PETROL_SOURCE = "https://www.pvoil.com.vn/tin-gia-xang-dau";

const alertMarketNews = async () => {
  const now = momentTZ().tz(process.env.TIME_ZONE).format("DD/MM/YYYY");
  const reports = [`Tình hình thị trường ngày ${now}`];

  const goldResp = await axios.get(SJC_SOURCE, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  const goldParse = HTMLParser.parse(goldResp.data);

  const goldPriceTitle = goldParse.querySelector("table tr:nth-child(2) td:nth-child(1)").text;
  const goldPriceBuy = goldParse.querySelector("table tr:nth-child(2) td:nth-child(2) span").text;
  const goldPriceSell = goldParse.querySelector("table tr:nth-child(2) td:nth-child(3) span").text;
  reports.push(`\nGiá Vàng ${goldPriceTitle}`);
  reports.push(`🤑 Mua: ${goldPriceBuy} vnd`);
  reports.push(`🤑 Bán: ${goldPriceSell} vnd`);

  const oilResp = await axios.get(PETROL_SOURCE, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  const oilParse = HTMLParser.parse(oilResp.data);
  reports.push(`\nBảng giá xăng dầu`);

  const firstRow = oilParse.querySelector("tbody tr:nth-child(1) td:nth-child(2)").text;
  const firstRowPrice = oilParse.querySelector("tbody tr:nth-child(1) td:nth-child(3)").text;
  reports.push(`🛢️ ${firstRow}: ${firstRowPrice} vnd`);

  const secondRow = oilParse.querySelector("tbody tr:nth-child(2) td:nth-child(2)").text;
  const secondRowPrice = oilParse.querySelector("tbody tr:nth-child(2) td:nth-child(3)").text;
  reports.push(`🛢️ ${secondRow}: ${secondRowPrice} vnd`);

  const thirdRow = oilParse.querySelector("tbody tr:nth-child(3) td:nth-child(2)").text;
  const thirdRowPrice = oilParse.querySelector("tbody tr:nth-child(3) td:nth-child(3)").text;
  reports.push(`🛢️ ${thirdRow}: ${thirdRowPrice} vnd`);

  telegramChannelSendMsg(encodeURI(reports.join("\n")));
};

module.exports.alertMarketNews = alertMarketNews;
