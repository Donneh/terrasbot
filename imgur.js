
// Generate a random image, and make sure it's not an "invalid link"
// redirect pic.
function grabPic() {
    var randURL = generateURL();
    getMeta(randURL, function(wth) {
      // The "invalid" images have a width of 161.
      if (wth && wth !== 161) {
        document.getElementById("question5").style.backgroundImage = "url('" + randURL + "')";
      } else {
        // If the test fails, start over.
        grabPic();
      }
    });
  }

  // Generate a new imgur.com url, ending with a series of 5 
  // random, case-sensitive letters and numbers.
function generateURL() {
var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
var link = "http://i.imgur.com/";
for (var i = 0; i < 5; i++) {
    link = link.concat(alpha[Math.floor(Math.random() * alpha.length)]);
}
return link.concat('.jpg');
}

// // Extract the metadata from an image url.
function getMeta(url, callback) {
  $("<img/>").attr("src", url).load(function(){
    callback(this.width);
  });
}