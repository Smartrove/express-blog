require("dotenv/config");
const express = require("express");
const path = require("path");
const { config, engine } = require("express-edge");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");
const edge = require("edge.js");

const app = express();

//connecting to the database
// const connection = mongoose.connect(process.env.DB_BLOG_URI, () => {
//   if (connection) {
//     console.log("database connected successfully");
//   }
// });

mongoose
  .connect(process.env.DATABASE_BLOG_URI)
  .then(() => {
    console.log(`database connected successfully`);
  })
  .catch((err) => {
    console.log(err);
  });

//setting a static file
app.use(express.static("public"));
app.use(connectFlash());
const mongoStore = connectMongo(expressSession);
app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);
//setting templating engine
app.use(engine);
app.set("views", `${__dirname}/views`);

const createPostController = require("./controller/createPost");
const homePageController = require("./controller/homepage");
const storePostController = require("./controller/storePost");
const getPostController = require("./controller/getPost");
const getGenericsController = require("./controller/getGenerics");
const getElementsController = require("./controller/getElements");
const getIndexController = require("./controller/getIndex");
const registerUserController = require("./controller/createUser");
const storeUserController = require("./controller/storeUser");
const loginController = require("./controller/login");
const loginUserController = require("./controller/loginUser");
const logOutController = require("./controller/logout");

//fileupload middleware innit
app.use(fileUpload());

// create custom middleware
const storePost = require("./middleware/storePost");
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

// body parser innit
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//global middleware

// app.use("*", (req, res, next) => {
//   edge.global("auth", req.session.userId);

//   next();
// });

app.use("*", (req, res, next) => {
  app.locals.auth = req.session.userId;
  next();
});

app.get("/", homePageController);
app.get("/auth/logout", auth, logOutController);
app.get("/post/:id", getPostController);
app.get("/generic", getGenericsController);
app.get("/elements", getElementsController);
app.get("/index-2", getIndexController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", auth, storePost, storePostController);
app.get("/auth/register", redirectIfAuthenticated, registerUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);

//middleware like route for 404 page
app.use((req, res) => res.render("notfound"));

app.listen(process.env.PORT, () => {
  console.log(`Server started successfully`);
});
