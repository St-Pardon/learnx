# 🚀 LearnX API

A robust, type-safe REST API built with Node.js and PostgreSQL for modern educational platforms.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=sequelize&logoColor=white)

## ✨ Features

- 🔒 Secure user authentication & authorization
- 🎯 Type-safe development with TypeScript
- 📦 Modern ORM with Sequelize
- 🚦 Comprehensive error handling
- 📚 Well-documented API endpoints
- 🔄 Real-time data synchronization

## 🚀 Quick Start

### Prerequisites

Make sure you have these installed:
- Node.js (v14+)
- PostgreSQL
- npm/yarn

### Setup in 3 Easy Steps

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/learnx.git
   cd learnx
   npm install
   ```

2. **Configure Environment**
   Create `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=learnx_db
   ```

3. **Launch**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see your API in action! 🎉

## 🛠 API Reference

### User Management
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/users | POST | Create user |
| /api/users | GET | List all users |
| /api/users/:id | GET | Get user details |
| /api/users/:id | PUT | Update user |
| /api/users/:id | DELETE | Delete user |

## 💻 Development

### Project Structure
```
src/
 ├── app/
 │   ├── controllers/   # Business logic
 │   └── routes/       # API routes
 ├── config/           # Configuration files
 ├── models/           # Data models
 └── app.ts           # Application entry
```

### Available Scripts
- `npm run dev` - Development mode
- `npm start` - Production mode
- `npm run build` - Build project
- `npm test` - Run tests

## 🤝 Contributing

We love contributions! To contribute:

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Push to your branch
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for your own learning and development!

## 🆘 Support

Need help? Open an issue or contact our team at support@learnx.com

---
Built with ❤️ by the LearnX Team