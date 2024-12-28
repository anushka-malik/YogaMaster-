// latest working code
import express from 'express';
import { addUser, loginUser, getProfile, updateProfile,bookAppointment , listAppointment} from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Sign Up Route
router.post('/', addUser);

// Login Route
router.post('/login', loginUser);

// Get Profile
router.get('/get-profile', authUser, getProfile);

// Update Profile
router.post('/update-profile', authUser, updateProfile);

router.post('/book-appointment', authUser,bookAppointment)

router.get('/appointments',authUser,listAppointment)
export default router; 



