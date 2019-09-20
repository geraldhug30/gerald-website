const express = require('express');
const bodyParser = require('body-parser');

const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

//Mongoose db
mongoose.connect(process.env.MONGO_URI, { 
	useUnifiedTopology: true, 
	useNewUrlParser: true 
})
.then(() => console.log('DB is connected'));

// Check error
mongoose.connection.on('error', err => {
console.log('DB connection error: ' + err.message);
})

// express
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressLayouts);
app.use(express.static('public'));
// session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	// cookie: { secure: true }
  }))
// Connect Flash
app.use(flash());

// Global Var 
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg'),
	res.locals.error_msg = req.flash('error_msg'),
	res.locals.error= req.flash('error'),
	next();
});

// Route
app.use('/', require('./routes/route'));

app.listen(process.env.PORT || 3000, err => {
	if(err){
		console.log(err);
	}
	console.log('app is running')
})