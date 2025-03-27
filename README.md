# 🚀 StoreHUB
## Where Code Sharing Meets Innovation

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/rishyym0927/StoreHUB?style=for-the-badge)](https://github.com/rishyym0927/StoreHUB/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/rishyym0927/StoreHUB?style=for-the-badge)](https://github.com/rishyym0927/StoreHUB/network)
[![GitHub issues](https://img.shields.io/github/issues/rishyym0927/StoreHUB?style=for-the-badge)](https://github.com/rishyym0927/StoreHUB/issues)
[![GitHub license](https://img.shields.io/github/license/rishyym0927/StoreHUB?style=for-the-badge)](https://github.com/rishyym0927/StoreHUB/blob/main/LICENSE)

</div>

---

## 🌟 Why StoreHUB?

StoreHUB transforms component sharing into a seamless experience. Built by developers, for developers, it's where innovation meets practicality.

🔹 **Post Components in Any Framework** – Share your work effortlessly.  
🔹 **Engage & Collaborate** – Like, comment, and use components from others.  
🔹 **Sandboxed Projects** – Upload complete projects with real-time community feedback.  
🔹 **Multi-Framework Support** – React, Vue, Angular, and more!  

Join a vibrant developer community where innovation thrives! 🚀

---

## 🎯 Features That Set Us Apart

| Feature              | Description                                | Status       |
|----------------------|--------------------------------------------|--------------|
| 🔍 **Component Sharing** | Easily discover & share components    | ✅ Live      |
| 🤝 **Collaboration**     | Real-time co-editing support          | ✅ Live      |
| 🌐 **Multi-Framework**   | Support for React, Vue, Angular       | ✅ Live      |
| 🔒 **Enterprise Security** | SOC2 & GDPR compliant               | 🛧 Coming Soon |
| 📊 **Analytics**         | Usage insights & metrics              | 🛧 Coming Soon |

---

## 🛠️ Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

---

## 🚀 Quick Start

### 📌 Backend and Database Setup

1. **Navigate to the Backend Directory**:
   ```bash
   cd StoreHUB-auth
   ```
2. **Set Up the Database**:
   - **Using Aiven (Cloud Database)**:
     - Sign up at [Aiven](https://aiven.com) and create a MySQL service.
     - Copy the connection URI into `.env` under `DATABASE_URL`.
   - **Setting Up MySQL Locally**:
     - **Windows**: [MySQL Installer](https://dev.mysql.com/downloads/installer/)
     - **MacOS**:
       ```bash
       brew install mysql
       brew services start mysql
       ```
     - **Linux (Ubuntu/Debian)**:
       ```bash
       sudo apt update && sudo apt install mysql-server -y
       sudo systemctl start mysql
       ```
3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with necessary credentials.
4. **Install Backend Dependencies**:
   ```bash
   go mod tidy
   ```
5. **Start Essential Services** (Recommended: Docker Compose):
   ```bash
   docker-compose up --build
   ```
6. **Run Backend Manually**:
   ```bash
   go run main.go
   ```

### 🌐 Frontend Installation (React + Vite)

1. **Navigate to the frontend directory**:
   ```bash
   cd StoreHUB-frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` to access the frontend! 🎉

---

## 🤝 Contributing

We believe in the power of community! 🚀

1. 🍴 **Fork the repository**
2. 🌱 **Create a new branch**:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. ✍️ **Commit changes**:
   ```bash
   git commit -m 'Add AmazingFeature'
   ```
4. 🚀 **Push your branch**:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 🎉 **Open a Pull Request**

Your contributions make StoreHUB better! 🔥

---

## 💻 Environment Setup

- **Frontend**:
  - Node.js v16+
  - NPM or Yarn
- **Backend**:
  - Go 1.18+
  - MySQL database
  - Redis server

---

## 📝 License

StoreHUB is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

---

## 🌟 Our Contributors

<div align="center">

[![Contributors](https://contrib.rocks/image?repo=rishyym0927/StoreHUB)](https://github.com/rishyym0927/StoreHUB/graphs/contributors)

</div>

---

## 📞 Support

<div align="center">

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:support@storehub.dev)
[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/your-invite-link)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/storehub)

</div>

---

<div align="center">

Made with ❤️ by the **StoreHUB Team**

[⬆ Back to top](#-storehub)

</div>

