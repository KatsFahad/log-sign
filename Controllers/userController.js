const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
    where: { email },
  });
  if (userExists) {
    return res.json("User already exists");
  }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

  const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

const loginUser = async (req,res) =>{
    const {email, password} = req.body;

    const userExists = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!userExists){
        return res.json('Invalid crendetials')
    }
    const validPassword = bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.json('Invalid crendentials')
    }
    const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET,{
        expiresIn: '1h'
    })
    res.json({token})
}

module.exports = {
  getAllUsers,
  createUser,
};
