import { prisma } from "../config/db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const getAllCategories = async (req, res) => {
  try{
    const categories = await prisma.category.findMany()
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id }
    });

    if(!category) {
      return res.status(404).json({ message: 'Category does not exist' });
    }

    res.json(category);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createCategory = async (req, res) => {

  const payload = await authMiddleware(req, res);

  if(payload.role !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });

  try{
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Some data is missing' });
    }
    
    const newCategory = await prisma.category.create({
      data: req.body
    });
  
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateCategory = async (req, res) => {
  
    const payload = await authMiddleware(req, res);
  
    if(payload.role !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });
  
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ message: 'Some data is missing' });
      }
  
      const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name }
      });
  
      res.json(updatedCategory);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
