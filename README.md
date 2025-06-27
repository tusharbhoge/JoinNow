#  **Fullstack Assignment — Real-Time Event Check-In App (by Detrator)**

This project is a **fullstack real-time event join app** developed as part of a technical assignment by **Detrator**.

The app allows users to:
- Log in using just an email
- View a list of events
- Join an event
- See the live list of attendees in real-time using **Socket.io**

---

## 🎥 Demo Video

[![Watch the video](https://youtu.be/DSv47p0-1T4)](https://youtu.be/DSv47p0-1T4)

---

## **🖥️ Backend Setup**

The backend is a **GraphQL + Socket.io** server built with:

- **Apollo Server** (GraphQL API)
- **Express 5**
- **Socket.io** (Realtime)
- **Prisma ORM** (Data modeling)
- **PostgreSQL** (Database)
- **TypeScript**

---

### 📁 Backend Folder Structure: `server/`

This is where the entire backend code is located.
```
server/
├── dist/                      # Compiled JS output (from TypeScript)
├── node_modules/
├── prisma/                    # Prisma ORM setup
│   ├── migrations/            # DB migration history
│   └── schema.prisma          # Prisma schema definition
├── src/
│   ├── generated/             # Auto-generated Prisma client
│   └── graphql/               # GraphQL API logic
│       ├── user/              # User-related GraphQL modules
│       │   ├── index.ts
│       │   ├── mutations.ts
│       │   ├── queries.ts
│       │   |── resolvers.ts
│       |   └── typeDefs.ts    # GraphQL type definitions
│       └── index.ts           # GraphQL entry point
├── .env                       # Environment variables
├── .env.example               # Sample .env for setup
├── package.json
├── tsconfig.json              # TypeScript config
└── yarn.lock / package-lock.json
```

---

### ⚙️ Tech Stack

| Layer        | Tech Used                 |
|--------------|---------------------------|
| Language     | TypeScript                |
| API Server   | Apollo Server + Express 5 |
| Realtime     | Socket.io                 |
| ORM          | Prisma                    |
| DB           | PostgreSQL                |


---

### ✅ Steps to Run Backend Locally

1. **Navigate to the backend folder & install dependencies**
   ```bash
   cd server
   npm install
2. **Setup your environment variables**
  - Copy the example .env file:
     ```bash
     cp .env.example .env
     
   - Replace the `DATABASE_URL` inside `.env` with your actual PostgreSQL connection string. You can get a free database from:
     - NeonDB
     - Aiven
     - Railway
3. **Generate Prisma Client & Run Migrations**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
4. **Start the server**
   ```bash
    npm run dev
---
### 🌐 Server Details

- **GraphQL Endpoint**: `http://localhost:8000/graphql`
- **Socket.io**: runs on the same port `8000`
- **Event emitted**: `attendeeUpdate`

---
### 🧪 Test Your Setup

You can test the GraphQL API using:

- 🧪 **Apollo Sandbox** (auto-opens in browser)
- 🛠️ **GraphQL Playground**, **Postman**, or **Insomnia**

---
---
## **📱 Frontend Setup**

The frontend is built using **React Native with Expo**, using:

- **Expo Router** for navigation  
- **Zustand** for global state (auth, joined event ID)  
- **React Query** for data fetching  
- **GraphQL Request** for API interaction  
- **Socket.io Client** for real-time updates

---

### 📁 Frontend Folder Structure: `client/`

This is the root of your Expo React Native project.
```
client/
├── app/                    
│   ├── event/
│   │   ├── [id].tsx         → Event detail page (dynamic route)
│   │── _layout.tsx          → Layout wrapper for event screens
│   ├── index.tsx            → Event list or home screen
│   └── login.tsx            → Login screen
├── assets/                  → Images, icons, splash, etc.
├── src/
│   ├── lib/
│   │   └── graphqlClient.ts → GraphQL client config
│   └── state/
│       └── authStore.ts     → Zustand store for auth state
├── app.json                 → Expo config file (API base URL here)
├── tsconfig.json            → TypeScript configuration
├── package.json             → Project dependencies
└── README.md                → Project documentation
```

---

### ⚙️ Tech Stack

| Layer         | Technology             |
|---------------|-------------------------|
| Framework     | React Native + Expo     |
| Navigation    | Expo Router             |
| State Mgmt    | Zustand                 |
| Data Fetching | Tanstack Query             |
| API Layer     | GraphQL Request         |
| Realtime      | Socket.io Client        |

---

### ✅ Steps to Run Frontend Locally
**Navigate to the frontend folder & install dependencies**

   ```bash
   cd client
   npm install
   ```

**Running the Frontend – Two Approaches**

You can run the frontend in two different ways depending on your target platform:

---

### 🖥️ 1. Web Browser (Expo Web)

**Run the app directly in your browser:**
  ```bash
  npx expo start
  ```
- Then press `w` in the terminal to launch the web app.
**✅ Make sure to update API_BASE_URL in your app.json:**
  ```bash
    {
    "expo": {
        "extra": {
        "API_BASE_URL": "http://<your-local-ip>:8000"
        }
      }
    }
  ```

- Replace `<your-local-ip>` with your system IP address (e.g., `192.168.1.5`)

- Use `localhost` only if both frontend and backend are running on the same machine via web

- Don't forget to include the port: `8000`
---
### 📱 2. Android Device (via Expo Go)

**Run the app on a physical Android device:**

1. Install **Expo Go** from the Play Store
2. Run the following command in terminal:

   ```bash
   npx expo start
   ```
3. Press `a`
4. Scan the QR code with **Expo Go app**
**✅ Ensure API_BASE_URL in app.json uses your local IP address:**

  ```bash
"API_BASE_URL": "http://192.168.x.x:8000"
```
- ❌ localhost will not work on a physical device

- 🔢 The port 8000 (used by backend) must be included

- 📶 Both your device and PC must be connected to the same Wi-Fi network
**✅ Choose the method based on your test platform, and make sure your backend is running before launching the app.**

---
---

## **📦 Sample Data**
This project comes with some pre-seeded dummy data (users and events) for testing purposes.

**🧑‍🤝‍🧑 Users**
| #  | Name         | Email                                       |
|----|--------------|---------------------------------------------|
| 1  | Tushar Bhoge | [tushar@gmail.com](mailto:tushar@gmail.com) |
| 2  | Ayesha Khan  | [ayesha@gmail.com](mailto:ayesha@gmail.com) |
| 3  | Rohan Mehta  | [rohan@gmail.com](mailto:rohan@gmail.com)   |
| 4  | Sneha Patil  | [sneha@gmail.com](mailto:sneha@gmail.com)   |
| 5  | Akash Sharma | [akash@gmail.com](mailto:akash@gmail.com)   |
| 6  | Priya Desai  | [priya@gmail.com](mailto:priya@gmail.com)   |

---

**🎫 Events**

| #  | Event Name            | Location |
|----|-----------------------|----------|
| 1  | Tech Fest 2025        | Pune     |
| 2  | AI & ML Meetup        | Mumbai   |
| 3  | React Native Bootcamp | Delhi    |
| 4  | Open Mic Night        | Chennai  |
| 5  | Startup Networking    | Hydrabad |

---
### 🛠️ View or Edit Data Locally
You can easily explore or modify the data using **Prisma Studio**:
```bash
cd server
npx prisma studio
```
This will open an interactive GUI in your browser where you can manage your database visually.
