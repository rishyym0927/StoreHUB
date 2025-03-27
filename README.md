# 🚀 StoreHUB
### Where Code Sharing Meets Innovation

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/rishyym0927/StoreHUB?style=for-the-badge)](https://github.com/rishyym0927/StoreHUB/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/rishyym0927/StoreHUB?style=for-the-badge)](https://github.com/rishyym0927/StoreHUB/network)
[![GitHub issues](https://img.shields.io/github/issues/rishyym0927/StoreHUB?style=for-the-badge)](https://github.com/rishyym0927/StoreHUB/issues)
[![GitHub license](https://img.shields.io/github/license/rishyym0927/StoreHUB?style=for-the-badge)](https://github.com/rishyym0927/StoreHUB/blob/main/LICENSE)

</div>

---

## 🌟 Why StoreHUB?

StoreHUB transforms component sharing into a seamless experience. Built by developers, for developers, it's where innovation meets practicality. Whether you're looking to discover, integrate, or share components, StoreHUB is your go-to platform. It is a platform where you can post your components in any framework you want and let other people use, like, or comment on them. You can also post your sandboxed projects and engage in real-time communication within the community for different frameworks, fostering innovation and collaboration.

---

## 🎯 Features That Set Us Apart

| Feature              | Description                                | Status       |
|----------------------|--------------------------------------------|--------------|
| 🔍 Component Sharing | Component discovery            | ✅ Live      |
| 🤝 Collaboration     | Real-time co-editing support              | ✅ Live      |
| 🌐 Multi-Framework   | Support for React, Vue, Angular           | ✅ Live      |
| 🔒 Enterprise Security | SOC2 & GDPR compliant                   | 🛧 Coming Soon |
| 📊 Analytics         | Usage insights & metrics                  | 🛧 Coming Soon |

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

### Backend and Database Setup

1. **Navigate to the Backend Directory**:
   ```bash
   cd StoreHUB-auth
   ```

2. **Set Up the Database**:
   - **Using Aiven (Cloud Database)**:
     1. Sign up at [Aiven](https://aiven.com) and log in.
     2. Click "Create Service" and select "MySQL".
     3. Choose a cloud provider and region (default options work fine).
     4. After creation, copy the connection URI from the service page.
     5. Use this URI in your `.env` file under `DATABASE_URL`.
   
   - **Setting Up MySQL Locally**:
     - **Windows**:
       1. Download and install MySQL from [MySQL official website](https://dev.mysql.com/downloads/installer/).
       2. Open MySQL Workbench or Command Line Client.
       3. Create a new database:
          ```sql
          CREATE DATABASE storehub;
          ```
     - **MacOS (Homebrew)**:
       ```bash
       brew install mysql
       brew services start mysql
       mysql -u root -p
       CREATE DATABASE storehub;
       ```
     - **Linux (Ubuntu/Debian)**:
       ```bash
       sudo apt update
       sudo apt install mysql-server
       sudo systemctl start mysql
       mysql -u root -p
       CREATE DATABASE storehub;
       ```

3. **Configure Environment Variables**:
   - Copy the example environment file and update necessary values:
     ```bash
     cp .env.example .env
     ```
   - Edit the `.env` file and set required database and service credentials.
   - Ensure `NODE_ENV` is set to `development`.

4. **Install Backend Dependencies**:
   - Ensure you have Go installed.
   - Navigate to the backend directory and run:
     ```bash
     go mod tidy
     ```

5. **Start Essential Services**:
   - **Using Docker Compose (Recommended)**:
     ```bash
     docker-compose up --build
     ```
   - **Manually Install and Start Each Service**:
     - **Redis**:
       - Install:
         ```bash
         sudo apt install redis -y  # Ubuntu/Debian
         brew install redis          # MacOS
         ```
       - Run:
         ```bash
         redis-server
         ```
     - **Prometheus**:
       - Install:
         ```bash
         wget https://github.com/prometheus/prometheus/releases/latest/download/prometheus-
         tar.gz
         tar -xvf prometheus-*.tar.gz
         cd prometheus-*
         ```
       - Run:
         ```bash
         ./prometheus --config.file=prometheus.yml
         ```
     - **Grafana**:
       - Install:
         ```bash
         sudo apt install grafana -y  # Ubuntu/Debian
         brew install grafana         # MacOS
         ```
       - Run:
         ```bash
         grafana-server
         ```

6. **Run the Backend Server Manually**:
   - Ensure all required services are running.
   - Start the backend application:
     ```bash
     go run main.go
     ```

### Frontend Installation (React + Vite)

1. Navigate to the frontend directory:
   ```bash
   cd StoreHUB-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with necessary values.

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` to access the frontend! 🌟



## 🤝 Contributing

We believe in the power of community! Here's how you can contribute:

1. 🍴 Fork the repository
2. 🌱 Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. ✍️ Commit changes:
   ```bash
   git commit -m 'Add AmazingFeature'
   ```
4. 🚀 Push to your branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 🎉 Open a Pull Request

We welcome contributions of all kinds, from bug fixes to feature implementations!

---

## 💻 Environment Setup

To ensure a smooth development experience, configure your environment as follows:

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

Made with ❤️ by the StoreHUB Team

[⬆ Back to top](#-storehub)

</div>

