const router = require("express-promise-router")();
const graph = require("../graph.js");

router.get("/", async function (req, res, next) {
  //console.log(req.app.locals);
  if (
    !req.session.userId ||
    !req.app.locals.users ||
    Object.keys(req.app.locals.users).length === 0
  ) {
    //console.log("redirected to index");
    // Redirect unauthenticated requests to home page
    // res.redirect("auth/signin");
    res.status(401);
    res.send("401");
    //console.log("unauthorise");
    //throw new Error("Not authorized.");
  } else {
    const params = {
      active: { drive: true },
    };

    // Get the user
    const user = req.app.locals.users[req.session.userId];
    try {
      // Get the events

      const details = await graph.getFileDetails(
        req.app.locals.msalClient,
        req.session.userId
      );
      details.push(
        req.app.locals.users[req.session.userId].displayName.length === 0
          ? req.app.locals.users[req.session.userId].email
          : req.app.locals.users[req.session.userId].displayName
      );
      res.json(details);
    } catch (err) {
      res.send(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
  }
});

module.exports = router;
