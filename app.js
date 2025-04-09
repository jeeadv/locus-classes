import express from "express";
import connectionPool from './db.mjs';

const app = express();
app.use(express.json());


app.post("/user/login", async (req, res) => {
  const user = req.body;
  console.log("Start /user/login");

  if (await isUserExist(user)) {
    if (isValidUser(user)) {
      res.json({ message: "Welcome to Locus Classes." });
    } else {
      res.json({ message: "Incorrect password" });
    }
  } else {
    res.json({ message: "User does not exist." });
  }

  console.log("End /user/login");
});

app.post("/user/signup", async (req, res) => {
  const user = req.body;
  console.log("Start /user/signup");

  if (!(await isUserExist(user))) {
    await onBoardUser(user);
    res.json({ message: "User added." });
  } else {
    res.json({ message: "User already exists." });
  }

  console.log("End /user/signup");
});

app.get("/user", (req, res) => {
  res.json({ message: "Welcome to Goa Singham!" });
});

async function isUserExist(user) {
  console.log("Checking if user exists in DB...");

  try {
    const [results] = await connectionPool.query(
      'SELECT * FROM users WHERE username = ?',
      [user.username]
    );

    if (results.length > 0) {
      return true;
    }
    return false;
  } catch (err) {
    console.error('DB error in isUserExist:', err);
    return false;
  }
}

async function isValidUser(user) {
  console.log("Checking user credentials...");
  try {
      const [results] = await connectionPool.query(
        'SELECT * FROM users WHERE username = ? and password = ?',
        [user.username, user.password]
      );

      if (results.length > 0) {
        return true;
      }
      return false;
    } catch (err) {
      console.error('DB error in isUserExist:', err);
      return false;
    }
}

async function onBoardUser(user) {
  console.log("Adding new user...");

  try {
    const [result] = await connectionPool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [user.username, user.password]
    );

    console.log('User inserted. Affected rows:', result.affectedRows);
  } catch (err) {
    console.error('DB error in onBoardUser:', err);
  }
}

export default app;