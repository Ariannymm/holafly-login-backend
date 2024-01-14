const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db.json");

router.post("/", async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validations
        if(!email || !password) {
            return res.status(400).json({ error: "Fields are required" });
        } 
    
        // Search user
        const user = db.users.find((user) => user.email === email);
        
        if (!user) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
    
        // Validate password (bcrypt)
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
    
        // Generate access token
        const accessToken = jwt.sign({ userId: user.id }, "secret-key", { expiresIn: "1h" });
    
        res.status(200).json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          accessToken,
        });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });    
    }
});

module.exports = router;