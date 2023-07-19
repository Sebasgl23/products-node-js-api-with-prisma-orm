import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../services/products.services.js";

const router = Router();

router.get('/', async (req, res) => {
  await getAllProducts(req, res);
});

router.get('/:id', async (req, res) => {
  await getProductById(req, res);
});

router.post('/', async (req, res) => {
  await createProduct(req, res);
});

router.patch('/:id', async (req, res) => {
  await updateProduct(req, res);
});

router.delete('/:id', async (req, res) => {
  await deleteProduct(req, res);
});



export default router;
