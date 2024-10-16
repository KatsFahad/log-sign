const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authourization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.json("Token is missing");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json("Invalid token or expired token");
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
