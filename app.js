const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')
const errorController = require('./controllers/error')
const app = express();
const session = require('express-session')
const mongoose = require('mongoose')
const MongoDBStore=require('connect-mongodb-session')(session)
const path = require('path')
const MONGODB_URI='mongodb+srv://aryancodez72:ycFcDoPxK2gk9Tl2@cluster0.ae3na.mongodb.net/shop?retryWrites=true&w=majority'
const store=new MongoDBStore({
  uri:MONGODB_URI,
  collection:'sessions'
})
// const mongoConnect=require('./util/database').mongoConnect;
const User = require('./models/user')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session(
  {secret:'my secret',resave:false,saveUninitialized:false
,store:store}))

app.use((req, res, next) => {
  if (!req.session.user) {
    // console.log("here")
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      // console.log("i came here")
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(authRoutes)
app.use(errorController.get404);
// app.listen(3000);
mongoose.
  connect('mongodb+srv://aryancodez72:ycFcDoPxK2gk9Tl2@cluster0.ae3na.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    app.listen(3000)
  })
  .catch(err => {
    console.log(err)
  })