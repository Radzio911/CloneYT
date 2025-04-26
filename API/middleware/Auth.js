import jwt from "jsonwebtoken";

export const auth = (secretToken) => {
  return (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, secretToken, (err, decoded) => {
      if (err) req.user = null;
      else req.user = decoded.id;
    });
    next();
  };
};
