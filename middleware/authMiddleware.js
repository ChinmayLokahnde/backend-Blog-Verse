import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("JWT_SECRET at verify:", process.env.JWT_SECRET);
  const authHeader = req.headers.authorization;
  console.log("Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // ✅ Define token BEFORE using it
  console.log("Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Now it's safe to use
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(403).json({ msg: "Invalid Token" });
  }
};
