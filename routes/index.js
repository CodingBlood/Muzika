var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user_id){
      res.render('index');
  }else{
    res.redirect('/profile');
  }
});

// Basic Login Functionality===============================================================================================================
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
const Console = require("console");
const {contentDisposition} = require("express/lib/utils");
const uri = "mongodb+srv://root:root@muzika.p9xm6zz.mongodb.net/?retryWrites=true&w=majority";

const requiredLogin = (req,res,next) => {
  if(!req.session.user_id){
    return res.redirect('/login');
  }else {
    next();
  }
}
router.get('/login', function(req, res, next) {
  if(!req.session.user_id){
    res.render('login');
  }else{
    res.redirect('/profile');
  }
});
router.post('/login', async function(req, res, next) {
  const username = req.body.uname;
  const pass = req.body.pass;
  await MongoClient.connect(uri,async function (err, db) {
    if (err) throw err;
    const dbo = db.db('Muzika');
    const User = dbo.collection("User");
    const found = await User.findOne({ username });
    if(found){
      const validPassword = await bcrypt.compare(pass,found.password);
      if(validPassword){
        req.session.user_id = found._id;
        console.log("1");
        res.redirect('/profile');
      }else{
        console.log("2");
        res.redirect('/login');
      }
    }else{
      console.log("3");
      res.redirect('/login');
    }
  });
});
router.get('/signup', function(req, res, next) {
  if(!req.session.user_id){
    res.render('signup');
  }else{
    res.redirect('/profile');
  }
});
router.post('/signup', async function(req, res, next) {
  const password = req.body.pass;
  const username = req.body.uname;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username:username,
    password:hash
  });
  MongoClient.connect(uri,function (err,db){
    if(err) throw err;
    const dbo = db.db("Muzika");
    dbo.collection("User").insertOne(user, function (err, res){
      if(err) throw err;
      console.log("Inserted Record");
      db.close();
    });
  });
  res.redirect('/login');
});
router.get('/logout', function (req,res, next){
  if(!req.session.user_id){
    res.render('login');
  }else{
    req.session.destroy();
    res.redirect('/login');
  }
})
router.get('/profile',requiredLogin,function (req,res,next){
  res.render('profile');
  // }
});
module.exports = router;



//======================================Defining luxury Section========================
router.get('/luxury', function (req,res){
  res.render('luxury');
});
var musicPath = "http://172.17.0.1:4000/helloworld.mp3"; //change this path to your music file.
var onclickHTML = "var audio = new Audio('" + musicPath + "'); audio.play();"
var musicPath1 = "http://172.17.0.1:4000/helloworld1.mp3"; //change this path to your music file.
var onclickHTML1 = "var audio = new Audio('" + musicPath1 + "'); audio.play();"
var musicPath2 = "http://172.17.0.1:4000/helloworld2.mp3"; //change this path to your music file.
var onclickHTML2 = "var audio = new Audio('" + musicPath2 + "'); audio.play();"
router.get('/music', function (req, res) {
  res.send('<button onclick="' + onclickHTML + '">click me to hear music</button><button onclick="' + onclickHTML1 + '">click me to hear music</button><button onclick="' + onclickHTML2 + '">click me to hear music</button>'); //this creates a button that the user can click to play some audio.
});
router.get('/player', function (req, res) {
  res.render('player');
});
router.get('/youtube_player', function (req, res) {
  res.render('youtube_player');
});