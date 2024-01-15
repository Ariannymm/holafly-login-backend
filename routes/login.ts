import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db.json";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ error: "Fields are required" });
    }

    // Buscar usuario
    const user: User | undefined = db.users.find((user) => user.email === email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Validar contraseña (bcrypt)
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generar token de acceso
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

export default router;