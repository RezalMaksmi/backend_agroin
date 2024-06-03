const logRequest = (req, res, next) => {
  console.log(`Telah terjadi request ke ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logRequest;
