const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        console.error("❌ No se proporcionó un token en la cabecera.");
        return res.status(403).json({ error: "Acceso denegado. No se proporcionó un token." });
    }

    try {
        // 🔥 Remover "Bearer " si está presente en la cabecera
        const tokenSinBearer = token.startsWith("Bearer ") ? token.slice(7) : token;

        // 🔍 Verificar el token
        const verificado = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);

        if (!verificado || !verificado.id) {
            console.error("❌ Token inválido o no contiene ID.");
            return res.status(403).json({ error: "Token no válido" });
        }

        console.log(`🔑 Usuario autenticado con ID: ${verificado.id}`);

        // 🔥 Asignar usuario a req para que esté disponible en los controladores
        req.usuario = verificado;

        next();
    } catch (error) {
        console.error("❌ Error en autenticación:", error.message);
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};

module.exports = authMiddleware;
