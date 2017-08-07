
/**
 * let's look at a bunch of videos and get their transcript urls
 */
var MongoClient = require('mongodb').MongoClient;
var url         = "mongodb://localhost:27017/bjjc_development";
var page        = require("webpage").create();

page.settings.userAgent = "Mozilla/5.0 (X11; rv:24.0) Gecko/20130909 Firefox/24.0";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var query = { transcript_url: { $exists: true } }; // { address: "Park Lane 38" };
  db.collection("videos").find(query).limit(10).toArray(function(err, result) {
    if (err) throw err;
    console.log("+++ db result:", result);
    db.close();
  });
}); 

// https://www.youtube.com/embed/dQw4w9WgXcQ
page.open("https://www.youtube.com/watch?v=4fE_njY63o4", function (status) {
  console.log("+++ +++ in?");

  if (status !== "success") {

    console.log("Failed to load page");

    phantom.exit();
  } else {
    console.log("+++ +++ status ok?")
    var whatever = page.evaluate(function(s) {
      if (yt.config_.TTS_URL.length) {
        var thisXml = yt.config_.TTS_URL+"&kind=asr&fmt=srv1&lang=en"
        // window.location.href = yt.config_.TTS_URL+"&kind=asr&fmt=srv1&lang=en"
        console.log("+++ +++ thisXml:", thisXml)
        return thisXml;
      }
    })
    console.log("+++ +++ whatever:", whatever)

    /* if (yt.config_.TTS_URL.length) {
      var thisXml = yt.config_.TTS_URL+"&kind=asr&fmt=srv1&lang=en"
      // window.location.href = yt.config_.TTS_URL+"&kind=asr&fmt=srv1&lang=en"
      console.log("+++ +++ thisXml:", thisXml)
    } */
  }
});

