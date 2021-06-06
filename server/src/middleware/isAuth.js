const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).send("Access Denied");
    try {
      const token = authHeader.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  };
};
