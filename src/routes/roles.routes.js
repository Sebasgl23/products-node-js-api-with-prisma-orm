import { Router } from 'express';
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from '../services/roles.services.js';


const router = Router();

router.get('/', async (req, res) => {
  await getAllRoles(req, res);
});

router.get('/:id', async (req, res) => {
  await getRoleById(req, res);
});

router.post('/', async (req, res) => {
  await createRole(req, res);
});

router.patch('/:id', async (req, res) => {
  await updateRole(req, res);
});

router.delete('/:id', async (req, res) => {
  await deleteRole(req, res);
});

export default router;
