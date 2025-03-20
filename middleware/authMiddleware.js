const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ mensaje: 'Acceso denegado' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(403).json({ mensaje: 'Token inválido' });
    }
};