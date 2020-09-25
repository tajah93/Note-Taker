var fs = require("fs");
var express = require("express");
var path = require("path"); 

var app = express(); 

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/assets/notes.html"), function (err) {
          console.log('Sent:')
      });
      fs.readFile("./develop/db/db.json", "utf8"
      ).then((data) => {
        var myNotes = [].concat(JSON.parse(data));
        res.json(myNotes);
      })
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
  res.sendFile(path.join(__dirname, "./develop/db/db.json", "utf8"), ((err) => {
    var myNotes = [].concat(JSON.parse(data));
    newNote.id = myNotes.length + 1
    myNotes.push(newNote);
    return myNotes 
  }).then((myNotes) => {
    fs.writeFile("./develop/db/db.json", JSON.stringify(myNotes))
    res.json(newNote);
  })
)});
 
app.delete("/api/notes", function(req, res) {
  fs.readFile("./develop/db/db.json", "utf8"
  ).then ((data) => {
    var myNotes = [].concat(JSON.parse(data));
    var info = [];
    for (let n = 0; myNotes.length; n++) {
      if( === myNotes[n].id)
    }

  }
}
)


app.listen(PORT, () => {
  console.log("App is listening on port " + PORT)
}

)