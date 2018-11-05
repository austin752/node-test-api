var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var User = require('../models/user');

var url = 'mongodb://<USERNAME>:<PASSWORD>@cluster0-shard-00-00-0ynct.mongodb.net:27017,cluster0-shard-00-01-0ynct.mongodb.net:27017,cluster0-shard-00-02-0ynct.mongodb.net:27017/mongo-data?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
var url2 = 'mongodb://<USERNAME>:<PASSWORD>@cluster0-shard-00-00-0ynct.mongodb.net:27017,cluster0-shard-00-01-0ynct.mongodb.net:27017,cluster0-shard-00-02-0ynct.mongodb.net:27017/mongo-users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

// get data from selected database
router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('../views/users/dashboard', {items: resultArray});
    });
  });
});

// post item to databse
router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/dashboard');
});

// post data to database to update item
router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      console.log('Item updated');
      db.close();
    });
  });
  res.redirect('/dashboard');
});

// post to database to delete item
router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      console.log('Item deleted');
      db.close();
    });
  });
  res.redirect('/dashboard');
});

// // user routes

// route for Home-Page
router.get('/', function (req, res, next) {
  res.render('../views/index');
});

// route for user signup
router.get('/register', function(req, res, next) {
      res.render('../views/users/register');
  })
  .post('/register', function (req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {

      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
      }

    mongo.connect(url2, function(err, db) {
      //assert.equal(null, err);
      // var emailQuery = db.collection('mongo-users').find({email:userData.email})
      // var userQuery = db.collection('mongo-users').find({username:userData.username})
      // if(emailQuery){
      //   console.log('Email already used, please try again.');
      //   res.redirect('/register');
      //   //res.json({status : "error", message:'email already used, please try again.'}).redirect('/register');
      // }else if(userQuery){
      //   console.log('Username already in use, please try again.');
      //   res.redirect('/register');
      //   //res.json({status : "error", message:'email already used, please try again.'}).redirect('/register');
      // }else{
        db.collection('mongo-users').insertOne(userData, function(err, result) {
          assert.equal(null, err);
          res.redirect('/login');
          console.log('User added');
          db.close();
        });
      //}
    });
  }
});


// route for user Login
router.get('/login', function(req, res, next) {
      res.render('../views/users/login');
  })
  .post('/login', function (req, res, next) {
      var username = req.body.username,
          password = req.body.password;
          
      mongo.connect(url2, function(err, db) {
        db.collection('mongo-users').findOne({'username': username})
        .then(function(doc) {
          console.log(doc);
              if(!doc){
                  console.log('user not found')
                  res.redirect('/login');
              } else if (password != doc.password) {
                  res.redirect('/login');
                  //console.log({userData:password})
              } else {
                  //req.session.user = user;
                  res.redirect('/dashboard');
                  console.log(user)
              }
          });
        });
      });



// route for user's dashboard
router.get('/dashboard', function(req, res, next) {
  res.render('../views/users/dashboard');
  // if (req.session.user && req.cookies.user_sid) {
  //     res.render('../views/users/dashboard');
  // } else {
  //     res.redirect('/login');
  // }
});


// route for user logout
router.get('/logout', function(req, res, next) {
  res.clearCookie('user_sid');
  //req.session.reset();
  res.redirect('/');
  // if (req.session.user && req.cookies.user_sid) {
  //     res.clearCookie('user_sid');
  //     res.redirect('/');
  // } else {
  //     res.redirect('/login');
  // }
});

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
router.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/dashboard');
  } else {
      next();
  }    
};

// route for handling 404 requests(unavailable routes)
router.use(function (req, res, next) {
res.status(404).send("Sorry can't find that!")
});


function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    res.redirect('/dashboard');
  }
};


module.exports = router;
