const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

app.use('/api/login', require("./routes/login"));
app.use('/api/cards', require("./routes/cards"));


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;