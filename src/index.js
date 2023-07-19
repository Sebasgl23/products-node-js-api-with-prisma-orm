import express from 'express';

import productsRoutes from './routes/products.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/roles', rolesRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)


app.listen(3000, () => {
  console.log('Server on port 3000');
});
