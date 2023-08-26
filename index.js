const express = require("express");
const dotenv = require("dotenv");
const {connectDB} = require("./source/config/db");
const expressMongoSanitize = require("express-mongo-sanitize");
const expressRateLimit = require("express-rate-limit");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const {usersRouter} = require("./source/routes/users");
const {adminRouter} = require("./source/routes/Admin");
const {judgesRouter} = require("./source/routes/judges");
const app = express();
const limiter = expressRateLimit({
    max: 250,
    windowMs: 1000*60*60,
    legacyHeaders: false,
    standardHeaders:true
});
const staticFilesDirectory = path.join(__dirname, 'public');

dotenv.config();
const PORT = process.env.PORT||5566;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI);

app.set('view engine','ejs')
app.use(cors());
app.use(helmet());
app.use(express.static(staticFilesDirectory))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json({limit: limiter}));
app.use(expressMongoSanitize({
    replaceWith: "_",
    allowDots: true
}));

app.use("/users",usersRouter);
app.use("/admin",adminRouter);
app.use("/judges", judgesRouter)

app.get("/test",(req,res)=>{
    res.send('Backend running').end()
})

app.get("/",(req,res)=>{
    res.status(200).render('home');
    res.end();
})
app.get("/register",(req,res) =>{
    res.render("form").status(200);
    res.end()
})
app.get("/gallery",(req,res)=>{
    res.status(200).render("gallery");
    res.end()

})


process.env.NODE_ENV === "development" ? app.use(logger("dev")) : null;

app.listen(PORT,() =>{
    console.log(`Essay competition Server running on port ${PORT}`);
})



