var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser     =        require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./Public', {}));



var connection = mysql.createConnection({
	host: 'sql9.freemysqlhosting.net',
	user: 'sql9156464',
	password: 'IU3pU1VTBH',
	database : 'sql9156464'
})



app.post("/addItem", function (req, res) {

	var email  =""+req.body.email;
    var title  =""+req.body.title;
    var price  =""+req.body.price;
    var description  =""+req.body.description
    var type  =""+req.body.type;
    var date =""+req.body.date;

connection.query('INSERT INTO `Item`(`email`, `title`,`price`,`description`,`type`,`date`) VALUES ("'+email+'","'+title+'","'+price+'","'+description+'","'+type+'","'+date+'")', function (error, results, fields) {
		if(error){res.end(error.code)}else{
			res.end("Successfully registered: "+title);
		}
		// if(error){throw error};
	});
});


app.post("/signup", function (req, res) {
	var q1=req.body.email;
	var q2=req.body.password;
	result  = connection.query('INSERT INTO `Member`(`email`, `password`) VALUES ("'+q1+'","'+q2+'")', function (error, results, fields) {
		if(error){res.end(error.code)}else{
			res.end("Successfully registered: "+q1);
		}
	});
});

app.post("/signin", function (req, res) {
	var q1=req.body.email;
	var q2=req.body.password;
	result  = connection.query('SELECT * FROM `Member` WHERE `email` = "'+q1+'"', function (error, results, fields) {
		if(error){res.end(error.code)}else{
			if(results[0].password == q2){
				res.end("success");
			}else{
				res.end("failed")
			}
		}
	});
});

app.post("/loadMyItems", function (req, res) {
	var q1=req.body.email;
		
	result  = connection.query('SELECT * FROM `Item` WHERE `email` = "'+q1+'"', function (error, results, fields) {
		if(error){res.end(error.code)}else{
				res.end(JSON.stringify(results));
			
		}
	});
});



app.listen(3000, function () {

	console.log('Example app listening on port 3000!');
	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}

		console.log('connected to database as id ' + connection.threadId);
	});
})
