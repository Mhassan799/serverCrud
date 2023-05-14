// console.log('hello world');
const express = require ('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
app.use(express.json())

async function connectDb(){
try {
    await mongoose.connect("mongodb+srv://hassantanoli1807:abc12345@cluster0.lvqb72a.mongodb.net/", {
        UseNewUrlParser: true
    });
    console.log("databse connecteed succesfully")
}
catch(error){
    console.log(error);
    process.exit(1);
}
}
connectDb()


const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    phone:Number
    


})
const User = mongoose.model('user', UserSchema)

app.post('/create', async(req,res) =>{

    const {username, email, phone}= req.body
    const user = new User({

        username,email,phone
    })
    await user.save()
    res.status(200).json(user)
})


// for get post and reading data 

app.get('/getUser', async (req,res)=>{
    const user  = await User.find()
    res.status(200).json(user)
})





app.put('/update/:id', async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(user)
})


app.delete('/delete/:id', async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id,req.body,{new:true})
    res.json(user)
})
app.listen(port, ()=>{
console.log(`example app listening on port ${port}`)

})