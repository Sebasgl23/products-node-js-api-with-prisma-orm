import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res) => {
  if(!req.headers.authorization) return res.status(401).json({ message: 'You must be logged in to access this resource' });

  const token = req.headers.authorization.split(' ')[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if(!payload) return res.status(401).json({ message: 'You must be logged in to access this resource' });

  req.user = payload;

  return payload;

}

