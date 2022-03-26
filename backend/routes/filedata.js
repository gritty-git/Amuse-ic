const router = require('express-promise-router')();
const graph = require('../graph.js');

router.get('/',
  async function(req, res, next) {
    if (!req.session.userId) {
      // Redirect unauthenticated requests to home page
      res.redirect('/index')
    } else {
      const params = {
        active: { drive: true }
      };

      // Get the user
      const user = req.app.locals.users[req.session.userId];
      try {
        // Get the events
        const details = await graph.getFileDetails(
          req.app.locals.msalClient,
          req.session.userId,
          );

        res.json(details);
      } catch (err) {
        res.send(JSON.stringify(err, Object.getOwnPropertyNames(err)));
      }
    }
  }
);


module.exports = router;