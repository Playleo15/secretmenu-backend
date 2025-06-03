
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('MONGO_URI', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const User = require('./models/User');

app.post('/register', upload.single('foto'), async (req, res) => {
    try {
        const { usuario, email, telefono, password } = req.body;
        const foto = req.file ? req.file.buffer.toString('base64') : "";
        const nuevoUsuario = new User({ usuario, email, telefono, password, foto });
        await nuevoUsuario.save();
        res.send({ success: true, message: "Usuario registrado correctamente" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Error en el servidor" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const user = await User.findOne({ usuario, password });
        if (user) {
            res.send(user);
        } else {
            res.send("error");
        }
    } catch (err) {
        res.status(500).send({ error: "Error en el servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
