const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "kk",
      email: "kk@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    } else {
      res.status(400).json("no such user");
    }
  });
  if (!found) return res.status(404).json("no such user");
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("fail");
  }
});

app.post("/register", (req, res) => {
  if (req.body.email === database.users[0].email) {
    res.json("user already exist");
  } else {
    const { email, name, password } = req.body;

    database.users.push({
      id: "125",
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date(),
    });
  }
  res.json(database.users[database.users.length - 1]);
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  const found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    } else {
      res.status(400).json("no such user");
    }
  });
  if (!found) return res.status(404).json("no such user");
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
