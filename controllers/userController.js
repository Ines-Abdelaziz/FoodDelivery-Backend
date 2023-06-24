const User = require('../models/User');
module.exports = {
  register: async (req, res) => {
    try {
      
      const {NomClient, PrenomClient, email, mdp, numTlf } = req.body;
      // Check if user already exists
      const existingUser = await User.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists ' });
      }

      // Create new user
      console.log(req.body)
      const newUser = await User.createUser({
        NomClient,
        PrenomClient,
        email,
        mdp,
        numTlf,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error:error });
    }
  },

  login: async (req, res) => {
    try {
      const { mail, pwd } = req.body;
      if(!mail){
        return res.status(404).json({user:req.body, params:req.params, message: 'No mail found' });
      }

      // Find user by email
      const user = await User.findUserByEmail(mail);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check password
      if (user.mdp !== pwd) {
        return res.status(401).json({user:req.body, message: 'Invalid credentials'});
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getinfo:async(req,res)=>{
    try{
      const {id} = req.params
      const user = await User.getinfo(id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    }catch(error){
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

};
