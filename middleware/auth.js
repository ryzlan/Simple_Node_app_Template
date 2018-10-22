const jwt = require('jsonwebtoken');
const config = require('config')

module.exports=function(req, res,next){
// checking whether token exist before accessing a route
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).send("Access denied , NO token found");


// checking whether token is valid or not
  try {
      const decode= jwt.verify(token, config.get('jwtPrivateKey'))
      req.user = decoded ;
      next();
  } catch (e) {
    res.status(400).send('Invalid token')
  }
}

 
