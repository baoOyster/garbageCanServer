const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({err: err.message, success: false});
}

module.exports = errorHandler;