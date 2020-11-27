const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  var authHeader = req.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.isAuth = false;
    return next();
  }
  //? case there is autorization header and starts with Bearer
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    req.role = null;
    return next();
  }
  //? case there is a token that have minimun one caracter
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY);
  } catch (err) {
    req.isAuth = false;
    req.role = null;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    req.role = null;
    return next();
  }
  //? user is authentificated
  req.isAuth = true;
  req.userId = decodedToken.userId;
  req.is_admin = decodedToken.is_admin;
  return next();
};
module.exports = isAuth;