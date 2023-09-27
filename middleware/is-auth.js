const jwt = require('jsonwebtoken');

/*module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env['JWTKey ']);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};*/

module.exports = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];

    const decodedToken = await jwt.verify(
        token,
        process.env.JWT_KEY
    );
    const user = await decodedToken;
    req.user = user
    next();
  } catch (err) {
    res.status(401).json({
      err: new Error("Invalid request !")
    })
  }
}
