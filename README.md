# MGNREGA District Performance Dashboard - Tamil Nadu

A simple, easy-to-use web application that allows citizens in Tamil Nadu to check district-level MGNREGA performance data. The dashboard is designed with a clean, icon-based interface, making it accessible for low-literacy rural users.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React, Vite, Tailwind CSS, Chart.js
- **Database:** MongoDB Atlas

## Features

-   **District-Level Data:** View key performance metrics for any district in Tamil Nadu.
-   **Key Metrics Display:**
    -   Total persons employed (👨‍🌾)
    -   Total wages paid (💰)
    -   Total work days generated (📅)
-   **Historical Performance:** A clear line/bar chart showing performance data for the last 6 months.
-   **Language Options:** Supports both English and Tamil to cater to a wider audience.
-   **Simple Interface:** Large fonts, big buttons, and icons for easy navigation and understanding.
-   **Geolocation (Bonus):** Can detect the user's approximate district to pre-select it.

## Folder Structure

The project is organized as a monorepo with two main folders:

```
project-root/
 ├─ backend/
 │   ├─ index.js           # Server entry point
 │   ├─ models/            # Mongoose database schemas
 │   ├─ routes/            # API endpoint definitions
 │   ├─ scripts/           # Data seeding scripts
 │   └─ .env               # Environment variables
 └─ frontend/
     ├─ src/               # React application source code
     ├─ public/
     └─ netlify.toml       # Deployment configuration for Netlify
```

## Setup and Installation Steps

Follow these steps to set up the project locally.

**1. Clone the Project**

```bash
git clone <your-repository-url>
cd <your-repository-name>
```

**2. Install Backend Dependencies**

```bash
cd backend
npm install
```

**3. Install Frontend Dependencies**

```bash
cd ../frontend
npm install
```

**4. Configure Environment Variables**

Create a `.env` file in the `backend` directory and add your MongoDB connection string.

```env
# backend/.env
MONGO_URI=mongodb+srv://admin:LOK%40prabu99@mnrega-cluster.ah2kn1d.mongodb.net/mnrega?retryWrites=true&w=majority
PORT=5000
```

## How to Run the Application

**1. Run the Backend Server**

```bash
cd backend
npm start
```
The backend will be running at `http://localhost:5000`.

**2. Run the Frontend Application**

```bash
cd frontend
npm run dev
```
The frontend development server will be running at `http://localhost:5173`.

## Deployment

**Backend (Render / Railway)**

1.  Push your code to a GitHub repository.
2.  Create a new "Web Service" on Render and connect your repository.
3.  Render will automatically detect the `render.yaml` file for configuration.
4.  Set the `MONGO_URI` and `PORT` as environment variables in the Render dashboard.

**Frontend (Vercel / Netlify)**

1.  Once the backend is deployed, get its public URL (e.g., `https://your-backend.onrender.com`).
2.  In the `frontend/netlify.toml` file, update the proxy redirect to point to your live backend URL.
3.  Connect your GitHub repository to Netlify. Netlify will detect the `netlify.toml` file and deploy the site.

## Screenshots

*(Add your screenshots here)*

`![Homepage](link-to-your-screenshot.png)`
`![District Report](link-to-your-screenshot.png)`

## Author

-   **Your Name**
    -   LinkedIn: `(your-linkedin-url)`
    -   GitHub: `(your-github-url)`
