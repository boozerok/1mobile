(function ($) {
	var jContent = $('.js-content'),
		jContentTempo = Tempo.prepare(jContent),
		jMenu = $('.js-menu'),
		jMenuPin = jMenu.find('.js-menu-pin'),
		sMenuPinOn = jMenu.data('class-enabled'),
		dateNow = new Date();

	var fCountdown = function(isoDate, box) {
		var isoDate = isoDate,
			dateEnd = new Date(isoDate),
			dateNow = new Date(),
			timeDiff = dateEnd.getTime() - dateNow.getTime();

		if (timeDiff <= 0) {
			clearTimeout(timer);
			return false;
			// Run any code needed for countdown completion here
		}

		var seconds = Math.floor(timeDiff / 1000),
			minutes = Math.floor(seconds / 60),
			hours = Math.floor(minutes / 60),
			days = Math.floor(hours / 24);

		hours %= 24;
		minutes %= 60;
		seconds %= 60;

		$('.js-race-at-days', box).text(days);
		$('.js-race-at-hours', box).text(hours);
		$('.js-race-at-mins', box).text(minutes);
		$('.js-race-at-secs', box).text(seconds);

		var timer = setTimeout(function(){
			fCountdown(isoDate, box);
		}, 1000);
	};

	var fGetNearest = function(jRace) {
		var jThis;
		jRace.each(function(){
			var sDate = $(this).find('.js-race-date').data('date');
			sDate = new Date(sDate);
			if (dateNow < sDate) {
				jThis = $(this);
				return false;
			}
		});
		if (jThis) {
			return jThis;
		}
	}

	var fShowNearest = function() {
		var jRace = $('.js-race'),
			jRaceNear = fGetNearest(jRace),
			sRaceDate = jRaceNear.find('.js-race-date').data('date'),
			jRaceCount = jRaceNear.find('.js-race-at'),
			sToggleClass = jRaceNear.data('class-enabled');

		jRaceNear.addClass(sToggleClass);

		fCountdown(sRaceDate, jRaceCount);
	};

	var fCountCurrYear = function() {
		var jCopyYear = $('.js-foot-copy'),
			sCopyYear = $('.js-foot-copy').text(),
			sCurrYear = dateNow.getFullYear();
		jCopyYear.text(sCopyYear + '-' + sCurrYear);
	}

	var fShowRaces = function() {
		$.getJSON('data/content/json/races.json', function(data) {
			jContentTempo.render(data.races);
			fShowNearest();
		});
	};

	jMenuPin.bind('click', function(e, sContent){
		e.preventDefault();
		var jThis = $(this);
		if (!sContent) {
			var sContent = jThis.data('content');
		}
		console.log(sContent)
		switch (sContent) {
			case 'races':
				fShowRaces();
				break;
			case 'championship':
				fShowChampionship();
				break;
			case 'activity':
				fShowActivity();
				break;
		};
		jMenuPin.removeClass(sMenuPinOn);
		jThis.addClass(sMenuPinOn);
	}).trigger('click', ['races']);

	//init
	fCountCurrYear();

})(jQuery);
