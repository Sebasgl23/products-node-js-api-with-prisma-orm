import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, name, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const role = await prisma.role.findUnique({
    where: { name: "USER" },
  });

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      roleId : role.id,
    },
  });

  delete newUser.password;

  res.json(newUser);
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  

  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ id: user.id, name: user.name, email:user.email, role:user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    token
  });
}
