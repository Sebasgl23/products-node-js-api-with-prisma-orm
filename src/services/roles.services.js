import { prisma } from "../config/db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const getAllRoles = async (req, res) => {

  const payload = await authMiddleware(req, res);

  if(payload.role !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });

  try{
    const roles = await prisma.role.findMany()
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getRoleById = async (req, res) => {

  const payload = await authMiddleware(req, res);

  if(payload.role !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });

  try {
    const { id } = req.params;
    const role = await prisma.role.findUnique({
      where: { id }
    });

    if(!role) {
      return res.status(404).json({ message: 'Role does not exist' });
    }

    res.json(role);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createRole = async (req, res) => {

  const payload = await authMiddleware(req, res);

  if(payload.role !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });

  try{
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Some data is missing' });
    }
    
    const newRole = await prisma.role.create({
      data: req.body
    });
  
    res.json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateRole = async (req, res) => {

  const payload = await authMiddleware(req, res);

  if(payload.role !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });

  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Some data is missing' });
    }

    const updatedRole = await prisma.role.update({
      where: { id },
      data: { name }
    });

    res.json(updatedRole);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteRole = async (req, res) => {

  const payload = await authMiddleware(req, res);

  if(payload.role !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });

  try {
    const { id } = req.params;

    await prisma.role.delete({
      where: { id }
    });

    res.json({ message: 'Role deleted' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

