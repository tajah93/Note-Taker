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

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"), function (err) {
          console.log('Sent:')
      });
      readFile("./db/db.json", "utf8"
      ).then((data) => {
        var myNotes = [].concat(JSON.parse(data));
        res.json(myNotes);
      })
});

app.post("/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
  res.sendFile(path.join(__dirname, "./develop/db/db.json", "utf8"), ((err) => {
    var myNotes = [].concat(JSON.parse(data));
    newNote.id = myNotes.length + 1
    myNotes.push(newNote);
    return myNotes 
  }).then((myNotes) => {
    writeFile("./develop/db/db.json", JSON.stringify(myNotes))
    res.json(newNote);
  })
)});
 
// app.delete("/api/notes", function(req, res) {
//   fs.readFile("./develop/db/db.json", "utf8"
//   ).then ((data) => {
//     var myNotes = [].concat(JSON.parse(data));
//     var info = [];
//     for (let n = 0; myNotes.length; n++) {
//       if( === myNotes[n].id)
//     }

//   }
// }
// )

app.get("/", function (req, res) {
  res.sendFile(path.join(_dirname, "./public/index.html"))
}); 

app.get("*", function (req, res) {
  res.sendFile(path.join(_dirname, "index.html"))
}); 


app.listen(PORT, () => {
  console.log("App is listening on port " + PORT)
}

)