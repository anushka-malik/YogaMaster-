import jwt from 'jsonwebtoken';

 const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token
    req.user = decoded; // Attach decoded user to the request
    next(); // Proceed to the next middleware/route
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
export default authMiddleware;


