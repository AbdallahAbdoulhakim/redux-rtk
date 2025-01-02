const notFound = (req, res, next) => {
  res.status(404);
  const err = new Error(`Resource not found at ${req.originalUrl}`);
  next(err);
};

export default notFound;
