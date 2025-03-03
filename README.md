# StyleGenius: AI-Powered Fashion Personalizer 
**Your Virtual Stylist That Learns Your Taste & Predicts Trends** 
--- 
## Overview 
StyleGenius is an innovative full-stack application that leverages AI to deliver personalized fashion recommendations. 
By combining modern web technologies with on-device and cloud-based AI services, StyleGenius transforms personal shopping into an interactive, trend-aware experience. 
Whether you’re looking for style analysis, virtual try-on capabilities, or real-time trend updates, StyleGenius has you covered. 
--- 
## Why StyleGenius? 
- **Personalized Experience**: Uses AI to learn your unique style and provide tailored recommendations. 
- **Real-Time Updates**: Implements live data streams to keep you ahead of the fashion curve. 
- **Cutting-Edge Tech Stack**: Built using the latest technologies in the MERN ecosystem plus advanced AI libraries. 
- **Scalable Architecture**: Designed with modern, job-ready principles for performance and maintainability. 
--- 
## Core Features 
1. **AI Style Quiz** 
    - Analyze user-uploaded outfit photos using a TensorFlow.js-powered CNN. 
    - Generate a detailed style profile validated with Zod schema. 
2. **Virtual Try-On** 
    - Remove backgrounds and overlay fashion items using AR-like previews via React Three Fiber. 
3. **Trend Predictor** 
    - Utilize time-series analysis with fast Redis caching to forecast fashion trends. 
4. **Social Feed** 
    - Get real-time style updates and share your looks with friends using WebSocket-driven features. 

--- 
## Tech Stack 
| Layer | Technology | Purpose | 
| -------------- | -------------------------------------- | ------------------------------- | 
| **Frontend** | React + Vite, React Router 6 | Core UI & navigation | 
| **State** | Zustand + React Query | Global state management | 
| **Styling** | Tailwind CSS + Headless UI | Responsive, modern design | 
| **Forms** | React Hook Form + Zod | Form handling & validation | 
| **Backend** | Node.js/Express (ESM) | API & server logic | 
| **AI Service** | TensorFlow.js (Node) | On-device AI processing | 
| **Database** | MongoDB Atlas + Redis | Persistent storage & caching | 
| **Real-time** | WebSocket | Live recommendations | 
| **AI APIs** | OpenAI (CLIP), Replicate | Image analysis & processing | 

--- 
##Getting Started

Prerequisites

Node.js (v14 or higher)

npm or yarn

MongoDB Atlas account (or local MongoDB instance)

Redis server (for caching

Installation

Frontend

Clone the repository and navigate to the frontend directory:
```sh
git clone https://github.com/Osama-Alsafwani/stylegenius.git 
cd stylegenius/style-genius-frontend 
```
Install dependencies:
`npm install`

Run the development server:
`npm run dev`

Backend

Navigate to the backend directory:
cd ../style-genius-backend 

Install dependencies:
`npm install`

Configure environment variables:

Create a .env file with variables such as: 
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
REDIS_URL=your_redis_url
```

Run the backend server:
`npm run dev`

Running the Application

Start the backend server on port 5000.

Start the frontend server on port 3000.

Open your browser and navigate to http://localhost:3000 to explore StyleGenius.


Contributing

Contributions are welcome! 
Feel free to fork the repository, create a feature branch, and submit a pull request. 
Please adhere to the existing code style and include tests where applicable.

License

This project is licensed under the MIT License.

Contact

For questions or collaboration ideas, please reach out to -email@example.com.
Crafted with passion for modern web development and AI innovation.
