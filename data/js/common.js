(function($){
	var tape = $('#tape'),
		url = 'http://ws.audioscrobbler.com/2.0/?method=library.gettracks&api_key=7e0ff9981958b0dccb6941597192baf3&user=boozerok&format=json';


	$.ajax({
		dataType: "json",
		url: url,
		success: function(data) {
			console.log(data.tracks.track[0].name);
			Tempo.prepare('tape').render(data.tracks.track);
		}
	});
})(jQuery)
