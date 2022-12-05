# Vietnam Market News

A simple report that runs periodically daily about Vietnam's market information

👉 Subscribe to telegram channel: [@vndmarketnews](https://t.me/vndmarketnews) to receive daily updates

## Sample report

```
Tình hình thị trường ngày 06/12/2022

Giá Vàng SJC 1L, 10L
🤑 Mua:  66,250,000 vnd
🤑 Bán: 67,050,000 vnd

Bảng giá xăng dầu
🛢️ Xăng RON 95-III: 22.700 vnd
🛢️ Xăng E5 RON 92-II: 21.670 vnd
🛢️ Dầu DO 0,05S-II: 23.210 vnd
```

## Usage

### Pm2

```
pm2 start index.js --name market-news
```

### Docker

```
docker build -t cronjob .
```
