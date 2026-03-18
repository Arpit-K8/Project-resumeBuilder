/*
Dependencies Description:
express: Web framework for Node.js
dotenv: Loads environment variables from a .env file into process.env
cors: Middleware for enabling Cross-Origin Resource Sharing
bcrypt: Library for hashing passwords
jsonwebtoken: Library for creating and verifying JSON Web Tokens
mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js
multer: Middleware for handling multipart/form-data, which is primarily used for uploading files
*/

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';



dotenv.config({ override: true });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
await connectDB();


app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.use('/api/users', userRouter );
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
