var artistRequest = function(id){
    $.ajax({
        url: 'https://api.spotify.com/v1/search?type=artist&query='+id
    }).success(function(response){
    var artists = response.artists.items;
    console.log(artists);
    var result=artists[0].id;
    albumsRequest(result);
    /*for(var i=0,len=artists.length;i<len;i++){
        var artist = artists[i];
        result= result + "<li>" + artist.name + "</li>";
    }*/
    $(".author").html(artists[0].name);
    $(".btn-info").html(artists[0].name);
    var info= "<p> name: "+artists[0].name+"</p><p>"+"<img src='"+artists[0].images[0].url+"'</img>";//</p><p>Genres, followers and popularity
    $("#myModal .modal-body #name").html(artists[0].name);
    $("#myModal .modal-body img").attr("src",artists[0].images[0].url);
    result="Genres:";
    console.log(artists[0].genres)
    for(var i=0, len=artists[0].genres.length;i<len;i++){
        console.log(artists[0].genres[i]);
        result=result+"<li>" +artists[0].genres[i]+"</li>";
    }
    console.log(result);
    $("#myModal .modal-body #genres").html(result);
    console.log(artists[0].followers.total);
    $("#myModal .modal-body #followers").html("Followers: "+artists[0].followers.total);
});

}

var albumsRequest =function(id){
    $.ajax({
        url: 'https://api.spotify.com/v1/artists/'+id+'/albums'
    }).success(function(response){
    var albums = response.items;
    console.log(albums);
    var result=albums[0].id;
    tracksRequest(result);
    $("#album").html(albums[0].name);
    $(".cover img").attr("src",albums[0].images[1].url);


   /* var leftDiv = document.createElement("div"); //Create left div
        leftDiv.id = "left"; //Assign div id
        
        a = document.createElement('img');
        a.setAttribute('src', albums[0].images[1].url);
        leftDiv.appendChild(a);
        document.getElementById("cover").appendChild(leftDiv);

    //$("#cover").html(albums[0].images[1].url)
    /*for(var i=0,len=artists.length;i<len;i++){
        var artist = artists[i];
        result= result + "<li>" + artist.name + "</li>";
    }
    $("#results").html(result);*/
});

}

var tracksRequest = function(id){
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/'+id
    }).success(function(response){
    var tracks = response.tracks.items;
    console.log(tracks);
    var result=tracks[0].preview_url;
    $("#tittle").html(tracks[0].name);
    $("audio").attr("src",result);
    $("audio").attr("class","js-player");
    var list="";
    for(var i=0,len=tracks.length;i<len;i++){
        list= list + "<li>" + tracks[i].name + "</li>";
        console.log(tracks[i].name);
    }
    $("#myListModal .modal-body #tracks").html(list);

    //var audioDiv = document.createElement("div"); //Create left div
      //  audioDiv.id = "audio"; //Assign div id
        
     /*   audio = document.createElement('audio');
        audio.setAttribute('src', result);
        audio.setAttribute('class','js-player');
        //audioDiv.appendChild(audio);
        document.getElementById("preview").appendChild(audio);



    /*<audio src="https://example.com/song.mp3" class="js-player"></audio>
    $("#results").html(result); */
    //previewRequest(result);
    /*for(var i=0,len=artists.length;i<len;i++){
        var artist = artists[i];
        result= result + "<li>" + artist.name + "</li>";
    }
    $("#results").html(result);*/
});

}

var previewRequest = function(id){
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/'+id+'/tracks?offset=0&limit=50'
    }).success(function(response){
    var track = response.items;
    console.log(track);
    var result=track[0].preview_url;
    /*for(var i=0,len=artists.length;i<len;i++){
        var artist = artists[i];
        result= result + "<li>" + artist.name + "</li>";
    }*/
    $("#results").html(result);
});

}


function printTime () {
  var current = $('.js-player').prop('currentTime');
  console.debug('Current time: ' + current);
  $(".seekbar progress").attr("value",current);
}

// Have printTime be called when the time is updated


$(document).ready(function(){
    artistRequest("lil wayne");
    var play=false;
    $('.btn-play').click(function(){
        //alert("play");
        if(!play){
            $('.js-player').trigger('play');
            play=true;
            $('.js-player').on('timeupdate', printTime);
        }
        else{
            $('.js-player').trigger('pause');
            play=false;
        }
        
        $(".btn-play").toggleClass('playing');
        $(".btn-play").toggleClass('disabled');
    });

    
})
