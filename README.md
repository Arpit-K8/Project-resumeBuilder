# Project Resume Builder

A full-stack modern Resume Builder web application built with the MERN stack (MongoDB, Express, React, Node.js). The application leverages artificial intelligence using OpenAI to help users craft professional resumes automatically, and uses ImageKit for efficient image management.

## Tech Stack

### Frontend (Client)
- **Framework:** React 19 with Vite
- **State Management:** Redux Toolkit (`react-redux`, `@reduxjs/toolkit`)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7 (`react-router-dom`)
- **Icons:** Lucide React
- **Other Utilities:** `react-hot-toast` for notifications, `react-pdftotext` for parsing PDF data.

### Backend (Server)
- **Framework:** Node.js, Express.js
- **Database:** MongoDB (`mongoose`)
- **Authentication:** JWT (`jsonwebtoken`) and `bcrypt` for secure password hashing
- **File Upload & Storage:** `multer` and ImageKit (`imagekit`, `@imagekit/nodejs`) for avatar and file management
- **AI Integration:** OpenAI API (`openai`) to generate professional resume content dynamically

## Features
- **User Authentication:** Secure signup and login functionality.
- **AI-Powered Generation:** Integrate OpenAI to draft and refine professional resume summaries, experience bullet points, etc.
- **Image Management:** Seamlessly upload and manage profile pictures via ImageKit.
- **PDF Parsing:** Capable of reading initial resume data using `react-pdftotext`.
- **Responsive Design:** Clean, modern, and mobile-friendly UI built with Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas Database URI
- OpenAI API Key
- ImageKit Account API Keys

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone <repository-url>
   cd Project-resumeBuilder
   ```

2. **Backend Setup:**
   Navigate to the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
   - Create a `.env` file in the `server` directory based on `.env.example` and add your MongoDB connection URI, JWT Secret, OpenAI Key, and ImageKit Credentials.
   - Start the development server using nodemon:
     ```bash
     npm run server
     ```

3. **Frontend Setup:**
   Open a new terminal window, navigate to the `client` directory, and install dependencies:
   ```bash
   cd client
   npm install
   ```
   - Create a `.env` file in the `client` directory based on `.env.example` adding the required backend route base URL configurations.
   - Start the React development frontend server:
     ```bash
     npm run dev
     ```

4. **Access the Application:** Open your browser and navigate to `http://localhost:5173`.

## Folder Structure
- `client/`: Contains the React frontend UI codebase, built using Vite.
- `server/`: Contains the Node & Express.js server, handling Mongoose models, secured routes, and controllers.
