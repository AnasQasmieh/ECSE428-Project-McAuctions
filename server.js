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

app.post("/getItems", function (req, res) {

	var category  =""+req.body.category;
	if(category=="any"){
		connection.query('SELECT * FROM `Item`', function (error, results, fields) {
			if(error){res.end(error.code)}else{
				res.end(JSON.stringify(results));

			}
		});
	}else{
		connection.query('SELECT * FROM `Item`WHERE `category` = "'+category+'"', function (error, results, fields) {
			if(error){res.end(error.code)}else{
				res.end(JSON.stringify(results));

			}
		});
	};
});
app.post("/addItem", function (req, res) {

	var email  =""+req.body.email;
	var title  =""+req.body.title;
	var price  =""+req.body.price;
	var description  =""+req.body.description
	var type  =""+req.body.type;
	var date =""+req.body.date;
	var category = ""+req.body.category;

	connection.query('INSERT INTO `Item`(`email`, `title`,`price`,`description`,`type`,`date`,`category`) VALUES ("'+email+'","'+title+'","'+price+'","'+description+'","'+type+'","'+date+'","'+category+'")', function (error, results, fields) {
		if(error){res.end(error.code)}else{
			res.end("Successfully registered: "+title);
		}
		// if(error){throw error};
	});
});

app.post("/bid", function (req, res) {

	var itemID  =""+req.body.itemID;
	var price  =""+req.body.price;
	var buyer  =""+req.body.buyer


	connection.query('UPDATE `Item` Set `price`="'+price+'",`buyer`="'+buyer+'" WHERE `itemID`="'+itemID+'"', function (error, results, fields) {
		if(error){res.end(error.code)}else{
			res.end("success");
		}
		// if(error){throw error};
	});
});


app.post("/signup", function (req, res) {
	var q1=req.body.email;
	var q2=req.body.password;
	connection.query('INSERT INTO `Member`(`email`, `password`) VALUES ("'+q1+'","'+q2+'")', function (error, results, fields) {
		if(error){res.end(error.code)}else{
			res.end("Successfully registered: "+q1);
		}
	});
});

app.post("/removeItem", function (req, res) {
	var itemID=req.body.itemID;
	connection.query('DELETE FROM `Item` WHERE  `Item`.`itemID` ='+itemID+';', function (error, results, fields) {
		if(error){res.end(error.code)}else{
			res.end("success");
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
