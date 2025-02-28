const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ error: "Acceso denegado. No hay token" });
    }

    try {
        const tokenSinBearer = token.replace("Bearer ", ""); // Remover "Bearer " si está presente
        const verificado = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
        
        if (!verificado) {
            return res.status(403).json({ error: "Token no válido" });
        }

        req.usuario = verificado; // Adjuntar usuario autenticado a la solicitud
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token no válido o expirado" });
    }
};

module.exports = authMiddleware;
