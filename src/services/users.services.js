import { prisma } from "../config/db.js";
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
  try{
    const users = await prisma.user.findMany({ include: { role: true }})
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true }
    });

    if(!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    res.json(user);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createUser = async (req, res) => {
  try{
    const { name, email, password, roleId } = req.body;
  
    if (!name || !email || !password || !roleId ) {
      return res.status(400).json({ message: 'Some data is missing' });
    }

    const userExists = await prisma.user.findUnique({
      where: { email }
    });
    
    if(userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: roleId
      }
    });

    delete newUser.password;
  
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if(!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    if (!name || !email || !password || !role ) {
      return res.status(400).json({ message: 'Some data is missing' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    });

    delete updatedUser.password;

    res.json(updatedUser);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if(!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    await prisma.user.delete({
      where: { id }
    });

    res.json({ message: 'User deleted successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


