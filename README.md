# -U
# TRON USDT Webhook Monitor

监控 TRON 网络上指定地址的 USDT (TRC-20) 交易，并通过 Webhook 发送通知。

## 功能特性

- 实时监控多个 TRON 地址的 USDT 交易
- 支持收入和支出两种交易类型
- Webhook 通知，支持自动重试和指数退避
- RESTful API 管理监控地址
- SQLite 持久化存储，避免重复通知
- 自动清理 7 天前的交易记录

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 为 `.env` 并配置：

```bash
cp .env.example .env
```

```env
# TRON 网络配置
TRON_FULL_HOST=https://api.trongrid.io
TRON_API_KEY=your-trongrid-api-key

# 服务器配置
PORT=3000

# 轮询间隔 (毫秒)
POLL_INTERVAL_MS=5000
```

### 运行

开发模式：
```bash
npm run dev
```

生产模式：
```bash
npm run build
npm start
```

## API 接口

### 添加监控地址

```bash
POST /api/watch
Content-Type: application/json

{
  "address": "TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "webhookUrl": "https://your-webhook-endpoint.com/callback"
}
```

### 删除监控地址

```bash
DELETE /api/watch/:address
```

### 获取所有监控地址

```bash
GET /api/watch
```

### 获取单个监控地址

```bash
GET /api/watch/:address
```

### 健康检查

```bash
GET /api/health
```

## Webhook 通知格式

当检测到 USDT 交易时，将向配置的 URL 发送 POST 请求：

```json
{
  "交易类型": "收入",
  "交易金额": 100.5,
  "出账地址": "TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "入账地址": "TYyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
  "交易时间": "2026-01-04 12:30:45",
  "交易哈希": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

| 字段 | 说明 |
|------|------|
| 交易类型 | `收入` 或 `支出` |
| 交易金额 | USDT 金额 |
| 出账地址 | 发送方地址 |
| 入账地址 | 接收方地址 |
| 交易时间 | 交易确认时间 |
| 交易哈希 | 链上交易 ID |

## 项目结构

```
src/
├── index.ts          # 入口文件
├── config.ts         # 配置管理
├── api/
│   └── routes.ts     # API 路由
├── db/
│   └── store.ts      # SQLite 数据存储
├── tron/
│   ├── client.ts     # TronWeb 客户端
│   └── monitor.ts    # 交易监控器
├── webhook/
│   ├── sender.ts     # Webhook 发送
│   └── types.ts      # 类型定义
└── types/
    └── tronweb.d.ts  # TronWeb 类型声明
```

## 技术栈

- Node.js + TypeScript
- Express.js
- TronWeb
- better-sqlite3
- Axios

## License

MIT

