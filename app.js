const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let campgrounds = [
	{name:"some place", image:"./images/firecamp.jpg"},
	{name:"some place", image:"./images/night.jpg"},
	{name:"some place", image:"./images/camping.jpg"},
	{name:"some place", image:"./images/firecamp.jpg"},
	{name:"some place", image:"./images/night.jpg"},
	{name:"some place", image:"./images/firecamp.jpg"},
	{name:"some place", image:"./images/night.jpg"}
]

app.get("/", function(req, res){
	res.render("index");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds});
});

app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds arrey
	let name = req.body.name;
	let image = req.body.image;
	campgrounds.push({name, image});
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


const port = process.env.PORT || 3000;
app.listen(port, () =>{
	console.log("the server has started");
});
