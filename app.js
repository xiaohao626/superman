var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var placeRouter = require("./routes/place");
var combosRouter = require("./routes/combos");
var commentRouter = require("./routes/comment");
var orderRouter = require("./routes/order");
var featureRouter = require("./routes/feature");
var scenicRouter = require("./routes/scenic");
var personalizedRouter = require("./routes/personalized");

var app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  // res.header("Content-Type", "application/json");
  next();
});

// 路由 TODO: 优化
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/place", placeRouter);
app.use("/combos", combosRouter);
app.use("/comment", commentRouter);
app.use("/order", orderRouter);
app.use("/feature", featureRouter);
app.use("/scenic", scenicRouter);
app.use("/userList", usersRouter);
app.use("/delUser", usersRouter);
app.use("/personalized", personalizedRouter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 设置跨域
app.use(
  cors({
    origin: ["http://localhost:8080"], // 允许这个域的访问
    methods: ["GET", "POST"], // 只允许GET和POST请求
    allowedHeaders: ["Content-Type", "Authorization"], // 只允许带这两种请求头的连接访问
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
