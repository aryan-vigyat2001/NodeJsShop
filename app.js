const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const app = express();
const mongoose = require('mongoose')
const path = require('path')
// const mongoConnect=require('./util/database').mongoConnect;
const User = require('./models/user')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('62a59f9248acc2909d994e42')
      .then(user => {
        req.user = user
        next();
      })
      .catch(err => console.log(err));
  });

app.use('/admin', adminRoutes)
app.use(shopRoutes)


app.use(errorController.get404);
// app.listen(3000);
mongoose.
  connect('mongodb+srv://aryancodez72:ycFcDoPxK2gk9Tl2@cluster0.ae3na.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    User.findOne().then(user=>{
      if(!user)
      {
        const user=new User({
          name:'Aryan',
          email:'aryan@gmail.com',
          cart:{
            items:[]
          }
        });
        user.save()

      }
    })
    app.listen(3000)
  })
  .catch(err => {
    console.log(err)
  })