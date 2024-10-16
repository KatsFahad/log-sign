const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  if (users.length > 0) {
    res.json(users);
  } else {
    res.json("No users found");
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: email,
  });
  if (userExists) {
    res.json("User already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.json('User created')
  }
  const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

module.exports = {
  getAllUsers,
  createUser
};
