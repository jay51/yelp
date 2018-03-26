<<<<<<< HEAD
const express	= require("express"),
	bodyParser	= require("body-parser"),
	mongoose	= require("mongoose"),
	app 		= express();
	

mongoose.connect("mongodb://localhost/yelp_camp");
=======
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
>>>>>>> 9590a5b67e7b538ad94a2cc68a094f8e8315c73e
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

<<<<<<< HEAD
// DB schema
const campgroundsSchema = mongoose.Schema({
	name:String,
	image:String,
	description:String
});

// DB model 
const Campground = mongoose.model("campgrounds", campgroundsSchema);

// // first campground
// Campground.create({
// 	name:"big hells",
// 	image:"https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197__340.jpg",
// 	description:"nice view and water. No bath rooms but beatfull nature"
	
// }, (err, camp)=> console.log(err ? err : camp ));


app.get("/", function(req, res){
	res.send("the main route '/'");
});

app.get("/campgrounds", function(req, res){
	// find campgrounds from DB
	Campground.find({}, (err, campgrounds)=>{
		if(err) return err ;
		res.render("index", {campgrounds});
	});
=======
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
>>>>>>> 9590a5b67e7b538ad94a2cc68a094f8e8315c73e
});

app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds arrey
	let name = req.body.name;
	let image = req.body.image;
<<<<<<< HEAD
	let desc = req.body.descreption;
	// add campground to DB
	Campground.create({
		name:name,
		image:image
	}, (err, camp)=>console.log(err ? err : camp));
	
	//redirect back to campgrounds page
	res.redirect("/index");
=======
	campgrounds.push({name, image});
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
>>>>>>> 9590a5b67e7b538ad94a2cc68a094f8e8315c73e
});


app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


<<<<<<< HEAD
app.get("/campgrounds/:id", function(req, res){
	let campgroundId = req.params.id; 
	Campground.findById(campgroundId, (err, foundCampground) =>{
		if (err) return err;
		console.log(foundCampground);
		res.render("show", { foundCampground });
	});
});


=======
>>>>>>> 9590a5b67e7b538ad94a2cc68a094f8e8315c73e
const port = process.env.PORT || 3000;
app.listen(port, () =>{
	console.log("the server has started");
});
