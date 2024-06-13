import express, { Application, Request, Response } from "express";
import session from 'express-session';
import mongodb_connection from "./src/config/db";
import configureApp from "./src/config/routes"
import dotenv from "dotenv";
import passport from 'passport';
import path from 'path';


dotenv.config()
mongodb_connection();

const app: Application = express();
const PORT = process.env.PORT as string;
const APP_URL = process.env.APP_URL as string;
const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET as string;


app.use('/', express.static(path.join(__dirname, 'src/uploads')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));


app.use(session({
  secret: EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

configureApp(app);

app.get("/", (req: Request, res: Response) => {
  res.send("PRO SPEECH APP")
});


app.get('/register', (req, res) => {
  res.render('register');
});

app.listen(PORT, (): void => {
  console.log(`Server is working on ${APP_URL}`);
});
