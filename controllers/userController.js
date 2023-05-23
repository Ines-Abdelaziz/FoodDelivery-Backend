const User = require('../models/User');

module.exports = {
  register: async (req, res) => {
    try {
      const { nom, prenom, email, mdp, numTlf } = req.body;

      // Check if user already exists
      const existingUser = await User.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Create new user
      const newUser = await User.createUser({
        nom,
        prenom,
        email,
        mdp,
        numTlf,
      });

      res.status(201).json({ message: 'Registration successful', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, mdp } = req.body;

      // Find user by email
      const user = await User.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check password
      if (user.mdp !== mdp) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Authentication successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
