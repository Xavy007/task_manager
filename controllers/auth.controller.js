require('dotenv').config(); // Cargar .env
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const{User}=require('../models');

// 🔹 REGISTRAR USUARIO
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)

    try {
        // Verificar si el usuario ya existe
        const userExist = await User.findOne({ where: { email } });
        if (userExist) return res.status(400).json({ mensaje: 'El email ya está registrado' });

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar usuario en la BD
        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ mensaje: 'Usuario registrado', usuario: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// 🔹 LOGIN (Genera JWT)
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        // Buscar usuario por email
        const usuario = await User.findOne({ where: { email } });
        //console.log(usuario)
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        console.log(password,"-----------",usuario.password)
        const esCorrecta = await bcrypt.compare(password, usuario.password);
        
        if (!esCorrecta) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        
        // Crear token JWT
        const token = jwt.sign(
            { id: usuario.id, name: usuario.name, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        console.log(token)
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// 🔹 PERFIL PROTEGIDO
exports.getProfile = async (req, res) => {
    try {
        const usuario = await User.findByPk(req.usuario.id, { attributes: ['id', 'name', 'email'] });
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        res.json({ mensaje: 'Perfil de usuario', usuario });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
