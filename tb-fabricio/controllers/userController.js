const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).json(deletedUser);
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);    // Função extra para usuário específico pelo ID
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.postLogin = async (req, res) => {
    const { name, email, password } = req.body; // Ajustado para 'name' ao invés de 'username'
    try {
        const user = await User.findOne({ name: name, email: email });
        if (!user) {
            return res.status(401).json({ message: "Usuário não encontrado!" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Login inválido!" });
        }
        res.status(200).json({ message: "Logado com sucesso", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// Async Await Javascript
// Desestruturação
// Try e Catch

// Trabalho de Vocês
// Update User
// Delete User