const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // because authHeader values is "Bearer <token>"

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
