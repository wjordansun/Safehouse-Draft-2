console.log('May Node be with you') // shows that node is working

const express = require('express') // in order to use express you need to require it
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient
//const uri = "mongodb://73.112.72.197:27016"
//const uri = "mongodb+srv://wjordansun:ekoater@cluster0.dqtjr.mongodb.net/login_info?retryWrites=true&w=majority";
const uri = "mongodb://127.0.0.1:27016";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect(err => {
 	// perform actions on the collection object
 	if (err) return console.error(err)
 	console.log('Connected to Database')

	const db = client.db('login_info')
	const login_info = db.collection('login_info')

 	app.set('view engine', 'ejs') // tells Express we're using EJS as template engine, goes before express handlers

 	app.listen(3000, function() {		// creates a server on port 3000, access on localhost:3000
		console.log('listening on 3000')
	})

	// app.get('/', function(req, res) {	// function(request, response)
	// 		res.send('Hello World')
	// })

	// app.get('/', (req, res) => {	// same code as above
	// 		res.send('Hello World')		// send method comes with response object
	// })

	app.use(bodyParser.urlencoded({ extended: true })) //body-parser goes before CRUD handlers
	//app.use(bodyParser.json())
	app.use(express.static('public'))

 	app.get('/', (req, res) => {
      console.log('appid: ' + process.env.APP_ID)
      res.render('index.ejs');
	})

  app.post('/login', (req, res) => {
    // console.log(req.body);
    // login_info.insertOne(req.body)
      
 		// 	.then(result => {
    //       res.redirect('/')
          
 		// 	})
 		// 	.catch(error => console.error(error))
    
    const query = {
      "username": (req.body.username),
      "password": (req.body.password)
    }
    console.log(query);
    login_info.findOne(query, function (err, users) {
      if (err) {
        res.render('index.ejs', { message: "ERROR finding username/password" })
      }
      if (users) {
        res.render('login.ejs');
      }
      else {
        res.render('index.ejs', { message: "Wrong username or password" })
      }
			
    });
  });
})








