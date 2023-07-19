import { Router } from "express"; 
import { register, login } from "../services/auth.services.js";

const router = Router();

router.post('/register', async (req, res) => {
  await register(req, res);
});

router.post('/login', async (req, res) => {
  await login(req, res);
});

export default router;
