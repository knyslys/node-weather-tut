const express = require("express");
const path = require("path");
const hbs = require("hbs");
const weather = require("./weather.js");
const app = express();
const pathToHTML = path.join(__dirname, "../public"); // for public html ( static)
const viewsPathHbs = path.join(__dirname, "../templates/views");
const partialPathHbs = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 3001;
app.set("views", viewsPathHbs); // path for dynamic pages
app.set("view engine", "hbs"); // making express use hbs
hbs.registerPartials(partialPathHbs);
app.use(express.static(pathToHTML)); // setting express render static pages

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Provide a city",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Vakaris",
    title: "Weather app - about me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather app - help",
    message: "Ask any help",
  });
  // res.render("help", { title: "Weather app - help", message: "Ask any help" });
  // res.redirect("/weather");
});

app.get("/weather", (req, res) => {
  if (!req.query.city) {
    res.send({ error: "You must provide city" });
    return;
  }

  weather.geocode(req.query.city, (error, response) => {
    if (error) {
      res.send({ error: error });
      return 0;
    }

    res.send({
      temperature: response.current.temperature,
      location: response.location.name,
      region: response.location.region,
      latitude: response.location.lat,
      longitude: response.location.lon,
      localtime: response.location.localtime,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "You must provide search" });
    return;
  }

  res.send({ products: [] });
});
//app.com
//app.com/help
//app.com/about

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server is running");
});
