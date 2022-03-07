const jwt = require("jsonwebtoken");
//const config = require("config");

const secret = process.env.jwtSecret;

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check is token exits

  if (!token) {
    res.status(401).send({ msg: "Token not found! Authorization denied" });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send({ msg: "Invalid Token, Access Denied" });
  }
};
