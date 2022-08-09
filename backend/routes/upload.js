const router = require('express-promise-router')();
const graph = require('../graph.js');

router.post('/',
  async function(req, res) {
    
    if (!req.session.userId) {
      // Redirect unauthenticated requests to home page
      res.redirect('/index')
    } else {
            
      try {
        // Get the upload detail
        graph.uploadFile(req.app.locals.msalClient,req.session.userId, req.files.file).then((result) => {          
          res.send(result);
        });
        
      } catch (err) {
        res.send(JSON.stringify(err, Object.getOwnPropertyNames(err)));
      }
    }
  }
);


module.exports = router;