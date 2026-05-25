import expresss from 'express';
import { register,login, logout } from '../controllers/authControllers';

const router = expresss.Router();

// Auth Service Route
router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;