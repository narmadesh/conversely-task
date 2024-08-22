const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const requireAuth = require("./middleware/authenticate");
const register = require('./routes/register')
const login = require('./routes/login')
const post = require('./routes/post')
const logout = require('./routes/logout')
const profile = require('./routes/profile')
dotenv.config()
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/post", post);
app.use("/api/logout", logout);
app.use("/api/profile", profile);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
