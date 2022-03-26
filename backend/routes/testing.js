const router = require('express-promise-router')();

router.get('/chut',
  async function(req, res, next) {
    console.log("chutiya");
    res.send({text : "chutiya"});
  }
);

module.exports = router;