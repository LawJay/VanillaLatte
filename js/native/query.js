$(function() {
    $('#search').submit(function() {
        var query = $("#searchbar").val();
        getMovies(query);
        return false;
    });
});

//get an array of movies

function getMovies(query) {
    var url = "http://www.omdbapi.com/?s=" + query + "&type=movie";
    $.getJSON(url, function(jsondata) {
        //handle what we've found.
        changePosters(jsondata)
    });
}
var itseaster = false;


var easter_egg = new Konami(function() { alert('Konami Code!'); itseaster = true;});

function changePosters(jsondata) {
    //clear out all the img tags in movieList
    $('#movieList').empty();
    //now, add in new img tags.


    if (itseaster){
      $('html').css('background-image','url(Media/pepe.jpg)');
      var audio = new Audio('/Media/sfx/meme.mp3');
      audio.play();
      var imgstring = "";
      var limit = 10;
      var totalResults = jsondata.totalResults;
      if(totalResults <= 10) {

        limit = totalResults;
      }
      for (var i = 0; i < limit; i++) {
          var poster = "Media/easter_egg.jpg";
          var id = jsondata.Search[i].imdbID;

          //if there's no poster, use jordan's classy potato.

          if (poster === "N/A") {
              poster = "Media/easter_egg.jpg";
          }

          imgstring += "<img src='" + poster + "'alt='Media/easter_egg.jpg'" + "class='movieimg' id='" + id + "'>";
          //append the img string
      }
      $("#movieList").append(imgstring);
      hover();
      changeImg();
    }
    else
    {
    var imgstring = "";
    var limit = 10;
    var totalResults = jsondata.totalResults;
    if(totalResults <= 10) {

      limit = totalResults;
    }
    for (var i = 0; i < limit; i++) {
        var poster = jsondata.Search[i].Poster;
        var id = jsondata.Search[i].imdbID;

        //if there's no poster, use jordan's classy potato.

        if (poster === "N/A") {
            poster = "/Media/potato.png";
        }

        imgstring += "<img src='" + poster + "'alt='/Media/potato.png'" + "class='movieimg' id='" + id + "'>";
        //append the img string
    }
    $("#movieList").append(imgstring);
    hover();
    changeImg();
  }
}
