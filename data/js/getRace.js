(function ($) {
	var jRace = $('.js-race');
	jRace.click(function(e){
		e.preventDefault();
		$('.p-races').addClass('-races_alone');
	})
})(jQuery);
