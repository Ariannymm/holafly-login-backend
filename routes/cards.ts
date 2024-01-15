import express, { Request, Response, Router } from "express";
import db from "../db.json";

const router: Router = express.Router();

router.get("/:userId", (req: Request, res: Response) => {
   const userId: string = req.params.userId;
   const cards = db.cards.filter((card: { userId: number }) => card.userId === +userId);

   return res.status(200).json({
       cards
   });
});

export default router;