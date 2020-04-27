var express = require("express");
var router = express.Router();

// function getUser(req, res, next) {
//   try {
//     var user = {
//       name: "zhanghhhh",
//       age: "100"
//     };
//     req.user = user;
//     next();
//   } catch (e) {
//     next(e);
//   }
// }

// router.get("/", function(req, res, next) {
//   try {
//     res.send(req.user);
//   } catch (e) {
//     res.send(e);
//   }
// });

router.get("/show", async (req, res, next) => {
  try {
    let result = await require("../services/user").show();

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get("/select", async (req, res, next) => {
  try {
    let param = req.query;
    for (x in param) {
      console.log(x + " " + param[x]);
      let result = await require("../../services/users").select(x, param[x]);
      res.send(result);
    }
  } catch (e) {
    res.send(e);
  }
});
router.get("/update", async (req, res, next) => {
  try {
    let param = req.query;
    let attributename = [],
      attribute = [];
    for (x in param) {
      console.log(x + " " + param[x]);
      attributename.push(x);
      attribute.push(param[x]);
    }
    let result = await require("../../services/users").update(
      attributename[0],
      attribute[0],
      attributename[1],
      attribute[1]
    );
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get("/insert", async (req, res, next) => {
  try {
    let param = req.query;
    for (x in param) {
      console.log(x + " " + param[x]);
      let result = await require("../../services/users").insert(x, param[x]);
      res.send(result);
    }
  } catch (e) {
    res.send(e);
  }
});
module.exports = router;
