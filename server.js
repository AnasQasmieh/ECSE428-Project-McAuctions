var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('./Public', {}));

var connection = mysql.createConnection({
    host: 'sql9.freemysqlhosting.net',
    user: 'sql9156464',
    password: 'IU3pU1VTBH',
    database: 'sql9156464'
})

app.post("/getItems", function(req, res) {

    var category = "" + req.body.category;
    if (category == "any") {
        connection.query('SELECT * FROM `Item`', function(error, results, fields) {
            if (error) {
                res.end(error.code)
            } else {
                res.end(JSON.stringify(results));

            }
        });
    } else {
        connection.query('SELECT * FROM `Item`WHERE `category` = "' + category + '"', function(error, results, fields) {
            if (error) {
                res.end(error.code)
            } else {
                res.end(JSON.stringify(results));

            }
        });
    };
});
app.post("/addItem", function(req, res) {

    var email = "" + req.body.email;
    var title = "" + req.body.title;
    var price = "" + req.body.price;
    var description = "" + req.body.description
    var type = "" + req.body.type;
    var date = "" + req.body.date;
    var category = "" + req.body.category;
    var img1 = "" + req.body.img1;
    console.log("ADDING ITEM TO DATABASE" + JSON.stringify(req.body))
    connection.query('INSERT INTO `Item`(`email`, `title`,`price`,`description`,`type`,`date`,`category`,`img1`) VALUES ("' + email + '","' + title + '","' + price + '","' + description + '","' + type + '","' + date + '","' + category + '","' + img1 + '")', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end("Successfully registered: " + title);
        }
        // if(error){throw error};
    });
});

app.post("/bid", function(req, res) {

    var itemID = "" + req.body.itemID;
    var price = "" + req.body.price;
    var buyer = "" + req.body.buyer
    connection.query(
            'INSERT INTO `Bid` (`itemID`,`email`,`price`) VALUES ("'+itemID+'","'+buyer+'","'+price+'")',
            function(error,results,fields){
                  if (error) {
            res.end(error.code)
        } 

            }
        );
    connection.query('UPDATE `Item` Set `price`="' + price + '",`buyer`="' + buyer + '" WHERE `itemID`="' + itemID + '"', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end("success");
        }
        // if(error){throw error};
    });
});

app.post("/signup", function(req, res) {
    var q1 = req.body.email;
    var q2 = req.body.password;
    var q3 = req.body.firstName;
    var q4 = req.body.lastName;
    connection.query('INSERT INTO `Member`(`email`, `password`, `firstName`, `lastName`) VALUES ("' + q1 + '","' + q2 + '","' + q3 + '","' + q4 + '")', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end("successfully registered: " + q1);
        }
    });
});

app.post("/removeItem", function(req, res) {
    var itemID = req.body.itemID;
    connection.query('DELETE FROM `Item` WHERE  `Item`.`itemID` =' + itemID + ';', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end("success");
        }
    });
});

app.post("/signin", function(req, res) {
    var q1 = req.body.email;
    var q2 = req.body.password;
    result = connection.query('SELECT * FROM `Member` WHERE `email` = "' + q1 + '"', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {

            if (results.length == 0) {
                res.end("failed")
            } else if (results[0].password == q2) {
                res.end("success");
            } else {
                res.end("failed")
            }
        }
    });
});

app.post("/loadMyItems", function(req, res) {
    var q1 = req.body.email;

    result = connection.query('SELECT * FROM `Item` WHERE `email` = "' + q1 + '"', function(error, results, fields) {
        if (error) {
            res.end(error.code);
        } else {
            res.end(JSON.stringify(results));

        }
    });
});
app.post("/moneyEarned", function(req, res) {
    var email = req.body.email;

    result = connection.query('SELECT * FROM `Item` WHERE `email` = "' + email + '" AND `sold`="1"', function(error, results, fields) {
        if (error) {
            res.end(error.code);
        } else {
            var r = 0;
            for (var i = 0 ; i < results.length; i++){
                r+= results[i].price;
            }

            res.end(JSON.stringify(r));

        }
    });
});

app.post("/getProfile", function(req, res) {
    var q1 = req.body.email;

    result = connection.query('SELECT * FROM `Member` WHERE `email` = "' + q1 + '"', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end(JSON.stringify(results));
        }
    });
});
app.post("/getBuyers", function(req, res) {
    var id = req.body.itemID;

    connection.query('SELECT * FROM `Bid` WHERE `itemID` = "' + id + '"', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end(JSON.stringify(results));
        }
    });
});

app.post("/markSold", function(req, res) {
    var id = req.body.itemID;

    connection.query('UPDATE `Item` SET `sold`= true where `itemID`="'+id+'"', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end(JSON.stringify(results));
        }
    });
});




// -------------------- CHANGE USER DETAILS SCRIPT ----------------------//


app.post("/changeFirstName", function(req, res) {
    var q1 = req.body.email;

    connection.query('UPDATE `Member` SET `firstName` = ? WHERE `email` = ?', [req.body.fName, q1], function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end(JSON.stringify(results));
        }
    });
});

app.post("/changeLastName", function(req, res) {
    var q1 = req.body.email;


    connection.query('UPDATE `Member` SET `lastName` = ? WHERE `email` = ?', [req.body.lName, q1], function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end(JSON.stringify(results));
        }
    });
});

app.post("/changeEmail", function(req, res) {
    var q1 = req.body.email;

    /*
    result = connection.query('SELECT * FROM `Member` WHERE `email` = "' + q1 + '"', function(error, results, fields) {
        if (error) {
            console.log("DUP ENTRY");
            res.end(error.code);
        } else {
            connection.query('UPDATE `Member` SET `email` = ? WHERE `email` = ?', [req.body.newEmail, q1]);
            res.end(JSON.stringify(results));
        }
    }); */

    connection.query('UPDATE `Member` SET `email` = ? WHERE `email` = ?', [req.body.newEmail, q1], function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end(JSON.stringify(results));
        }
    });

});





// ------------------------- SALE UPLOAD SCRIPT -------------------------//

// This uploads to local directory

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res) {
    console.log("uploading file");

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/Public/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name), function(err) {
            if (err) {
                console.log("error: " + err);
            }
        });

    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('ERROR:   ======   An error has occured: \n' + err);

    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {

    });

    // parse the incoming request containing the form data
    form.parse(req, function(err, fields, files) {

        console.log("ADDING ITEM TO DATABASE");
        console.log(JSON.stringify(fields));
        connection.query('INSERT INTO `Item`(`email`, `title`,`price`,`description`,`type`,`date`,`category`,`img1`) VALUES ("' + fields.email + '","' + fields.title + '","' + fields.price + '","' + fields.description + '","' + fields.type + '","' + fields.date + '","' + fields.category + '","uploads/' + fields.img1 + '")', function(error, results, fields) {
            if (error) {
                res.end(error.code)
            } else {
                res.end("Successfully registered: ");
            }
            // if(error){throw error};
        });

    });

});


// ------------------------- SALE EDIT SCRIPT -------------------------//

app.post('/updateSale', function(req, res) {
    console.log("uploading file");
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '/Public/uploads');

    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name), function(err) {
            if (err) {
                console.log("error: " + err);
            }
        });
    });

    form.on('error', function(err) {
        console.log('ERROR:   ======   An error has occured: \n' + err);
    });

    form.on('end', function() {});

    form.parse(req, function(err, fields, files) {

        console.log("MODIFYING ITEM IN DATABASE");
        console.log(JSON.stringify(fields));
        connection.query('UPDATE `Item` SET `title`= "' + fields.title +
            '", `price`= "' + fields.price +
            '", `description`= "' + fields.description +
            '", `type`= "' + fields.type +
            '", `date`= "' + fields.date +
            '", `category`= "' + fields.category +
            '", `img1`= "uploads/' + fields.img1 +
            '" WHERE `itemID`= "' + fields.itemID + '"',
            function(error, results, fields) {
                if (error) {
                    res.end(error.code)
                } else {
                    res.end("Successfully registered: ");
                }
            });
    });
});

app.post("/editTitle", function(req, res){
    connection.query('UPDATE `Item` SET `title`= "' + req.body.newTitle + '" WHERE `itemID`= "' + req.body.itemID + '"', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end(JSON.stringify(results));
        }
    });
});

app.post("/editPrice", function(req, res){
    connection.query('UPDATE `Item` SET `price`= "' + req.body.newPrice + '" WHERE `itemID`= "' + req.body.itemID + '"', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end(JSON.stringify(results));
        }
    });
});

app.post("/editDescription", function(req, res){
    connection.query('UPDATE `Item` SET `description`= "' + req.body.newDescription + '" WHERE `itemID`= "' + req.body.itemID + '"', function(error, results, fields) {
        if (error) {
            res.end(error.code)
        } else {
            res.end(JSON.stringify(results));
        }
    });
});


app.listen(3000, function() {

    console.log('Example app listening on port 3000!');
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected to database as id ' + connection.threadId);
    });
})