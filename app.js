const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https"); 

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/0d9515b4c9";

    const options = {
        method: "POST",
        auth: "Sweety1:064a05df09fc41bb39ce5abb5ea87277-us21"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end()

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port: 3000");
});

// API Key
// 064a05df09fc41bb39ce5abb5ea87277-us21

// List id
// 0d9515b4c9