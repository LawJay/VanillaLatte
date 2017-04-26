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
//function to change the image
    function changeImg() {
        $(document).ready(function() {
            $('.movieimg').click(function() {
                var currentimage = $(this).attr('src');
                var imdbID = $(this).attr('id');
                $('#mainImg').attr('src', currentimage);

                //get the plot and title from what the id embedded on the img's id attribute.
                getTitle(imdbID)
            });
        });
    }
    //get the title of the current image by using the imdbID from the id attribute to pull more data.
    function getTitle(id) {
        //prepare the url
        var url2 = "http://www.omdbapi.com/?i=" + id + "&plot=short"
        $.getJSON(url2, function(jsondata) {
            //handle the results.
            changeTitle(jsondata)
        });
    }

    function changeTitle(jsondata) {
        //clear the old out. we'll add it back in.
        var title = jsondata.Title;
        var plot = jsondata.Plot;
        var director = jsondata.Director;
        var awards = jsondata.Awards;
        var year = jsondata.Year;
        var rating = jsondata.Rated;

        if(awards === "N/A") {
          awards = "No awards";
        }
        //add in the information after clearing the html of the old tags
        $('#movieTitle').empty();
        $('#movieTxt').empty();
        $('#year').empty();
        $('#director').empty();
        $('#awards').empty();

        if(itseaster){

        $('#movieTitle').append("M' Lady");
        $('#movieTxt').append("If you want sick memes you have came to the right place darling.");
        $('#year').append("Released in " + "1996" + ". Rated " + "PG");
        $('#director').append("Directed by " + "Murray Lyne");
        $('#awards').append("Awards: Them All!");

      } else {

        $('#movieTitle').append(title);
        $('#movieTxt').append(plot);
        $('#year').append("Released in " + year + ". Rated " + rating);
        $('#director').append("Directed by " + director);
        $('#awards').append(awards);
      }

        //REVIEWS
        if(itseaster){
        var metascore = "100";
        var imdbrating = "10";
        var votes = "1,000,000";
        console.log(jsondata.Ratings);

        for (var i=0; i < jsondata.Ratings.length; i++) {

          if (jsondata.Ratings[i].Source === "Rotten Tomatoes") {

            var rottentomatoes = "100%";
          }
        }
      } else {

        var metascore = jsondata.Metascore;
        var imdbrating = jsondata.imdbRating;
        var votes = jsondata.imdbVotes;
        var rottentomatoes = "";
        console.log(jsondata.Ratings);

        for (var i=0; i < jsondata.Ratings.length; i++) {

          if (jsondata.Ratings[i].Source === "Rotten Tomatoes") {

            rottentomatoes = jsondata.Ratings[i].Value;
          }
        }
      }

        if (rottentomatoes === undefined) {
          rottentomatoes = "No score found"
        } else {
          rottentomatoes.concat("%");
        }

        //these strings prep the data in a html format.
        var metacriticString = "<h5>MetaCritc </h5>" + metascore + " of 100";
        var imdbString = "<h5>IMDB</h5>" + imdbrating + "/10" + "<br>" + "Based on " + votes + " Votes";
        var rottentomatoesstring = "<h5> Rotten Tomatoes </h5>" + rottentomatoes;

        $('#metacritic').empty();
        $('#imdb').empty();
        $('#rottentomatoes').empty();
        $('#metacritic').append(metacriticString);
        $('#imdb').append(imdbString);
        $('#rottentomatoes').append(rottentomatoesstring)

        //CAST
        if (itseaster) {
          var notableActors = "Murray Lyne";
        } else {
        var notableActors = jsondata.Actors;
      }

        //empty the element
        $('#actorslist').empty();

        //add in the new actors, but split the data if possible.
        var actors = notableActors.split(",");
        for(var i = 0; i < actors.length; i++) {
          $('#actorslist').append("<li> " + actors[i] + "</li>");
        }


    }
    changeImg(); //reload the function
