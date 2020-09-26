var fs = require("fs");
var util = require("util");
var express = require("express");
var path = require("path"); 

var app = express(); 

var PORT = process.env.PORT || 8080;

var readFile = util.promisify(fs.readFile);
var writeFile= util.promisify(fs.writeFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"), function (err) {
          console.log('Sent:')
      });
      readFile("./db/db.json", "utf8"
      ).then((data) => {
        var myNotes = [].concat(JSON.parse(data));
        res.json(myNotes);
      })
});

app.post("/api/notes", function(req, res) {
  
  var newNote = req.body;
  readFile("./db/db.json", "utf8");
  console.log(newNote);
  res.sendFile(path.join(__dirname, "./db/db.json", "utf8"), function (err) {
    var myNotes = [];
    let newId = newNote.id
    myNotes.push(newId);
    return newId
  }); ((newId) => {
    writeFile("./db/db.json", JSON.stringify(myNotes))
    res.json(newId);
  })
});
 
app.delete("/api/notes/:id", function(req, res) {
  readFile("./db/db.json", "utf8"
  ).then ((data) => {
    var myNotes = [].concat(JSON.parse(data));
    var info = [];
    var keepID = paresInt(req.params.id);
    for (let n = 0; n < myNotes.length; n++) {
      if(info === myNotes[n].id) {
        keepID.push(myNotes[n])
      }
    }
    return keepID
  }).then ((myNotes) => {
    writeFile("./db/db.json", JSON.stringify(myNotes))
    res.json(myNotes);
  })
});

app.get("/", function (req, res) {
  res.sendFile(path.join(_dirname, "./public/index.html"))
}); 

// app.get("*", function (req, res) {
//   res.sendFile(path.join(_dirname, "./public/index.html"))
// }); 


app.listen(PORT, () => {
  console.log("App is listening on port " + PORT)
}

)