const manage404 = (req,res, next) => {
    res.status(404).json({
        msj:"404 not found",
        img:"https://appmaster.io/api/_files/gLKT845SHV7cRiSsiFSDk6/download/"
    });
}

module.exports = manage404;