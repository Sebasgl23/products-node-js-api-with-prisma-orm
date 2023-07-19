import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../services/users.services.js";

const router = Router();

router.get('/', async (req, res) => {
  await getAllUsers(req, res);
});

router.get('/:id', async (req, res) => {
  await getUserById(req, res);
});

router.post('/', async (req, res) => {
  await createUser(req, res);
});

router.patch('/:id', async (req, res) => {
  res.send('This is the update user route')
});

router.delete('/:id', async (req, res) => {
  res.send('This is the delete user route')
});

export default router;
