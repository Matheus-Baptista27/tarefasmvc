
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Redireciona para a página de login se não estiver autenticado
}

module.exports = { ensureAuthenticated };
