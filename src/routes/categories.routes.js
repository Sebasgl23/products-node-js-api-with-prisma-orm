import { Router } from "express";

import { getAllCategories, getCategoryById, createCategory } from "../services/categories.services.js";

const router = Router();


router.get('/', async (req, res) => {
  await getAllCategories(req, res);
});

router.get('/:id', async (req, res) => {
  await getCategoryById(req, res);
});

router.post('/', async (req, res) => {
  await createCategory(req, res);
});
  
export default router;
