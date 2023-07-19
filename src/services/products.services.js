import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const getAllProducts = async (req, res) => {
  try{
    const products = await prisma.product.findMany({ include: { category: true }})
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });

    if(!product) {
      return res.status(404).json({ message: 'Product does not exist' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createProduct = async (req, res) => {
  try{

    const payload = await authMiddleware(req, res);

    if(payload.role !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });

    const { name, description, price, categoryId, stock } = req.body;
  
    if (!name || !description || !price || !categoryId || !stock ) {
      return res.status(400).json({ message: 'Some data is missing' });
    }
    
    const newProduct = await prisma.product.create({
      data: req.body
    });
  
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};

export const updateProduct = async (req, res) => {

  const payload = await authMiddleware(req, res);

  if(payload.role !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });

  try {
    const { id } = req.params;
    const { name, description, price, categoryId, stock } = req.body;

    if (!name || !description || !price || !categoryId || !stock ) {
      return res.status(400).json({ message: 'Some data is missing' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        categoryId,
        stock
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteProduct = async (req, res) => {

  const payload = await authMiddleware(req, res);

  if(payload.role !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });

  if(user.role.name !== 'ADMIN') return res.status(401).json({ message: 'You must be an admin to create products' });

  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id }
    });

    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

