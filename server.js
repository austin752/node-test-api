var app = require('./app');
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// const express = require('express');
// const exp = express();
// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require('jwks-rsa');

// // Authentication middleware. When used, the
// // Access Token must exist and be verified against
// // the Auth0 JSON Web Key Set
// const checkJwt = jwt({
//   // Dynamically provide a signing key
//   // based on the kid in the header and 
//   // the signing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`
//   }),

//   // Validate the audience and the issuer.
//   audience: 'YOUR_API_IDENTIFIER',
//   issuer: `https://YOUR_AUTH0_DOMAIN/`,
//   algorithms: ['RS256']
// });

// // This route doesn't need authentication
// exp.get('/api/public', function(req, res) {
//   res.json({
//     message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
//   });
// });

// // This route need authentication
// exp.get('/api/private', checkJwt, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated to see this.'
//   });
// });

// const checkScopes = jwtAuthz([ 'read:messages' ]);

// exp.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//   });
// });

// //use sessions for tracking logins
// exp.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: db
//   })
// }));