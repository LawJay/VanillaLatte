$(function(){
  $('#search').submit(function(){
    var query = $("#searchbar").val();

    getMovies(query);
    return false;
  });
});

function getMovies(query) {
  var url="http://www.omdbapi.com/?s="+query+"&type=movie";

  $.getJSON(url, function(jsondata){
    //handle what we've found.
    console.log(jsondata);
    changePosters(jsondata)
});
}

function changePosters(jsondata){
  //clear out all the img tags in movieList
  $('#movieList').empty();
  //now, add in new img tags.
  var imgstring = "";
  for(var i=0; i < 10; i++) {
    var poster = jsondata.Search[i].Poster;
    console.log(poster);
    imgstring += "<img src='" + poster + "'alt='there should be a cat here...'"+"class='movieimg'>";

    //append the img string

  }
  $("#movieList").append(imgstring);
  hover();
  changeImg();
  }
