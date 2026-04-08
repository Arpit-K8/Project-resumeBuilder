import User from "../models/User.js";
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Resume from "../models/Resume.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
const PASSWORD_REGEX = /^(?=\S{8,64}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

const normalizeEmail = (email = '') => email.trim().toLowerCase();
const normalizeName = (name = '') => name.trim().replace(/\s+/g, ' ');

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

//CONTROLLER FOR USER REGISTRATION
//POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const name = normalizeName(`${req.body?.name ?? ''}`);
    const email = normalizeEmail(`${req.body?.email ?? ''}`);
    const password = `${req.body?.password ?? ''}`;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields: name, email, and password are required' });
    }

    if (!NAME_REGEX.test(name) || name.length < 2 || name.length > 50) {
      return res.status(400).json({ message: 'Name must be 2-50 characters and contain letters only (no numbers or special chars)' });
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return res.status(400).json({ message: 'Please enter a valid email address (e.g., user@example.com)' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        message: 'Password must be 8-64 characters with at least one uppercase letter, one lowercase letter, one number, and one special character'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

    // Create new user
    const hashedPassword = await bycrpt.hash(password, 10);
    const newUser = await User.create({ 
        name, email, password: hashedPassword 
    });

    //return success response with token
    const token = generateToken(newUser._id);
    newUser.password = undefined; // Exclude password from response

    return res.status(201).json({ 
        message: 'User registered successfully',
        user: newUser,
        token
    });

    }catch (error) {
    console.error('Error registering user:', error);
      const status = /buffering timed out|mongo|database|connect/i.test(error?.message || '') ? 503 : 500;
      return res.status(status).json({message: error.message || 'Registration failed'});
    }
}

//CONTROLLER FOR USER LOGIN
//POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const email = normalizeEmail(`${req.body?.email ?? ''}`);
    const password = `${req.body?.password ?? ''}`;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bycrpt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    // Return success response with token
    user.password = undefined; // Exclude password from response
    return res.status(200).json({
      message: 'Login successful',
      user,
      token
    });

  } catch (error) {
    console.error('Error logging in user:', error);
    const status = /buffering timed out|mongo|database|connect/i.test(error?.message || '') ? 503 : 500;
    return res.status(status).json({ message: error.message || 'Login failed' });
  }
};

//CONTROLLER FOR GETTING USER BY ID
// GET: /api/users/data

export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = undefined; // Exclude password from response
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user data:', error);
      const status = /buffering timed out|mongo|database|connect/i.test(error?.message || '') ? 503 : 500;
      return res.status(status).json({ message: error.message || 'Failed to fetch user data' });
    }
}

// CONTROLLER FOR GETTING USER RESUMES
// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;

        // return user resumes
        const resumes = await Resume.find({userId });
        return res.status(200).json({ resumes });
    } catch (error) {
        console.error('Error fetching user resumes:', error);
      const status = /buffering timed out|mongo|database|connect/i.test(error?.message || '') ? 503 : 500;
      return res.status(status).json({ message: error.message || 'Failed to fetch resumes' });
    }
}
