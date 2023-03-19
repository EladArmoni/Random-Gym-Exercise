const notFoundMiddleware = (req, res) => {
    res.status(404).render('error')
}

module.exports=notFoundMiddleware