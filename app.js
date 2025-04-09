import express from "express";

const app = express()
app.use(express.json())

import connectionPool from './db.mjs'

export default app

app.post("/user/login", (request, response, next) => {
    console.log(request.body);
    console.log("Start /user/login");
    if (isUserExist(request.body)) {
        if (isValidUser(request)) {
            response.json({ message: "Welcome to locus classes." });
        }
        else {
            response.json({ message: "Incorrect password" });
        }
    }
    else {
        response.json({ message: "User does not exists." });
    }

    console.log("End /user/login");
});

app.post("/user/signup", (request, response, next) => {
    console.log(request.body);
    console.log("Start /user/signup");
    if (!isUserExist(request.body)) {
        onBoardUser(request.body);
        response.json({ message: "User added." });
    }
    else {
        response.json({ message: "User already exists." });
    }

    console.log("End /user/signup");
});

app.get("/user", (request, response, next) => {
    console.log("Welcome to Goa Singham!");
    response.json({ message: "Welcome to Goa Singham!" });
});

function isUserExist(user) {
    console.log("user existence check");
    const sql = 'SELECT * FROM users';
    connectionPool.promise().query(sql, (err, results) => {
        if (err) {
            console.error('Error reading data:', err);
            return;
        }
        console.log('Data retrieved successfully:');
        console.log(results);
        results.forEach(function (result) {
            console.log(result["username"] + " " + result["password"]);
            if (result["username"] == user["username"]) {
                console.log("Found!");
                return true;
            }
        });
    });
    console.log("Not Found!");
    return false;
}

function isValidUser(user) {
    const sql = 'SELECT * FROM users';
    connectionPool.promise().query(sql, (err, results) => {
        if (err) {
            console.error('Error reading data:', err);
            return;
        }
        console.log('Data retrieved successfully:');
        console.log(results);
        results.forEach(function (result) {
            console.log(result["username"] + " " + result["password"]);
            if (result["username"] == user["username"] && result["password"] == user["password"]) {
                console.log("Found!");
                return true;
            }
        });
    });
    console.log("Not Found!");
    return false;
}

function onBoardUser(user) {
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const values = [user["username"], user["password"]];

    connectionPool.promise().query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return;
      }
      console.log('Data inserted successfully. Affected rows:', result.affectedRows);
    });
    console.log("user added");
}



