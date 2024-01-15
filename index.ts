import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loginRouter from "./routes/login";
import cardsRouter from "./routes/cards";

dotenv.config();

const app = express();
const port = process.env.PORT || 3100;

// middleware
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/cards', cardsRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

export default app;