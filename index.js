const express = require('express')
const app = express()
const port = 5000
const bodyParser =require("body-parser");
const config = require("./config/key")

const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require("mongoose")
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('새해복 많이 받으세요')
})

app.post('/register', (req,res) =>{
  const user = new User(req.body)


  user.save()
  .then(userInfo => {
    return res.status(200).json({
      success: true
    })
  })
  .catch(err => {
    return res.json({success: false, err})
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})