const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')

const app=express();
app.use(express.json());
const SECRET_KEY="12345";

let users=[];

//register
app.post('/register',async(req,res)=>{
    const {email,password}=req.bodyl
    const existingUser=users.find((u)=>u.email===email);
    if(existingUser){
        return res.status(400).json({message:"user alreayd exixts"});

    }
    const hashedPassword=await bcrypt(password,10);
    const user={
        id:users.length+1,
        email,
        password:hashedPassword
    };
    users.push(user);
    res.json({message:"user regsiered successfully"});
})

//login

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=users.find((u)=>u.email===email);
    if(!user){
        return res.status(400).json({message:"user notfound"});

    }
    const isMatch=await bcrypt(password,user.password);
    if(!isMatch){
        return res.status(401).json({message:'invalid credentials'});

    }

    const token=jwt.sign(
        {id:user.id,email:user.email},
        SECRET_KEY,
        {expiresIn:"1h"}
    );
    res.json({token});
})

function verifyToken(req,res,next){
    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403);
    
        req.user = decoded;
        next();
      });
    }
    
    /* =========================
       PROTECTED ROUTE
    ========================= */
    app.get("/protected", verifyToken, (req, res) => {
      res.json({
        message: "You accessed protected data!",
        user: req.user,
      });
    });
    
    /* =========================
       START SERVER
    ========================= */
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
    

