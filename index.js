require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const taskRouter = require("./app/routers/task.routes");

const app = express();
const server = require('http').Server(app);

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//add header
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routers
app.use("/api/", taskRouter);

const db = require("./app/schemas");
db.sequelize.sync();
// For Local development
// db.sequelize.sync({ force: true }).then(() => {     
//     console.log("Drop and re-sync db.");
// });

app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on ${process.env.APP_PORT}`);
});

module.exports = {
    app,
    server
}