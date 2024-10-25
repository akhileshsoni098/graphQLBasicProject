const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.authentication = async function (req, res, next) {
  // Retrieve token from request headers
  let token = req.headers["x-auth-token"];

  // Check if token is provided
  if (!token) {
    return res.status(400).json({ status: false, message: "Log in first" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Attach user info to the request object
    req.user = {
      _id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    // console.log("User authenticated:", req.user);
    next(); 
  } catch (err) {
    console.log("Verification failed!", err)
    next()
  }
};
