const bcrypt = require("bcrypt");

const password = "backend123"; // La contraseña en texto plano
const saltRounds = 10; // Número de rondas de encriptación

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error("Error al encriptar la contraseña:", err);
    } else {
        console.log("Contraseña encriptada:", hash);
    }
});
