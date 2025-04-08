import express from "express";

const app = express()
app.use(express.json())

export default app

var usersMap = new Map();

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
    console.log(usersMap);
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
    console.log(usersMap);
    console.log("End /user/signup");
});

function isUserExist(user) {
    console.log("user existence check");
    return usersMap.has(user["username"]);
}

function isValidUser(user) {
    console.log("user validity check");
    return usersMap.get(user["username"]) == user["password"];
}

function onBoardUser(user) {
    usersMap.set(user["username"], user["password"]);
    console.log("user added");
}



