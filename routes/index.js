const express = require('express');
const router = express.Router();
const createModel = require("./users");

router.get("/",(req,res)=>{
  // req.session.something = "Session Set";
  res.cookie('age ',25);
  res.render("index");
});

// Read the cookie
router.get("/read",(req,res)=>{
  console.log(req.cookies);
  res.send("Check Cookie in console.")
})

//Delete the cookie
router.get("/deletecookie",(req,res)=>{
  res.clearCookie("age");
  res.send("Clear the Cookie");
})

router.get("/checksession",(req,res)=>{
  console.log(req.session);
  if(req.session.something === "Session Set"){
    res.send("Session is working fine.")
  }else{
    res.send("Session is Working fine but it's deleted now!");
  }
});

router.get("/removesession",(req,res)=>{
  req.session.destroy((err)=>{
    if(err) throw err;
    res.send("Session is remove .");
  })
})

// Create the user
router.get('/create',async (req,res)=>{
  const createUser = await createModel.create({
    username:"@Raza123",
    name:"Raza Ali",
    email:"raza@gmail.com",
    age:23
  });
  res.send(createUser);
});

// All users
router.get("/users",async (req,res)=>{
  const allUsers = await createModel.find();
  // console.log(allUsers)
  res.send(allUsers);
});

// Delete the user
router.get("/delete",async (req,res)=>{
  const deletedUser = await createModel.findOneAndDelete({
    username:"Raza123"
  });
  res.send(deletedUser);
});

module.exports = router;