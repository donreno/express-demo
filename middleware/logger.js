const log = (req, res, next) => {
    console.log(`Received request ${req.method} path ${req.path}`);
    next();
};

module.exports = log;