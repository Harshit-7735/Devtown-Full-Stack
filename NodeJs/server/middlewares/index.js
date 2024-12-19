// it is middleware to check if the user is authorised or not
// if the user is authorised then pass the user data to the next middleware
// else return the error

const { verifyToken } = require("../utils/auth");

module.exports.isAutorised = (req, res, next) => {
  try {
    // get the token from the headers
    const token = req.headers.authorization;
    // check if the token is present
    const decoded = verifyToken(token);
    // if the token is not present then return the error
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorised",
        success: false,
      });
    }
    // if the token is present then pass the user data to the next middleware
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
