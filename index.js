var express = require("express"),
	app = express(),
	port = process.env.PORT || 3000,
	ip = process.env.IP;
	bodyParser = require('body-parser'); 
	todoRoutes = require('./routes/todos');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));    
app.use(express.static(__dirname + '/public'));//to look on views by default
app.use(express.static(__dirname + '/views'));//to look on views by default

app.get("/", function(req, res){
    res.sendFile("index.html");
})    
    
app.use("/api/todos", todoRoutes); 

app.listen(port, ip, function(){
    console.log("server is listining on PORT: " + port);
    console.log("server is listining on IP: " + ip)
    console.log("server is listining on URL: " + process.env.DATABASEURL)
})
