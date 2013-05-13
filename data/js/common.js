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
		for(var i = 0; i < jRace.length; i++) {
			var jThis = jRace.eq(i),
				sDate = jThis.find('.js-race-date').data('date'),
				sDate = new Date(sDate);
			if (dateNow < sDate) {
				return jThis;
			}
		}
	}

	var fShowNearest = function() {
		var jRaceNear = fGetNearest($('.js-race'));
		if (!jRaceNear) {
			return false;
		}
		var sRaceDate = jRaceNear.find('.js-race-date').data('date'),
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
	};

	var getRaces = $.getJSON('data/content/json/races.json');

	var fShowRaces = function() {
		getRaces.done(function(data) {
			jContentTempo.render(data.races);
			fShowNearest();
			fShowRace(data.races);
		});
	};

	var fGetRace = function(races, alias) {
		for (var i = 0; i < races.length; i++) {
			var race = races[i],
				raceAlias = races[i].race_alias;
			if ( alias == raceAlias ) {
				return races[i];
			}
		}
	};

	var fShowRace = function(races) {
		$('.js-race').on('click', function(e){
			e.preventDefault();
			var jThis = $(this),
				sThisAlias = jThis.data('race'),
				sEnabledClass = jThis.data('class-enabled'),
				sActiveClass = jThis.data('class-active'),
				aRace = fGetRace(races, sThisAlias);

			//jContentTempo.render(aRace);
			$('.js-race').removeClass(sEnabledClass).removeClass(sActiveClass);
			jThis.addClass(sEnabledClass).addClass(sActiveClass);

			history.pushState({race: 'au'}, 'Title', '/race.html');


			console.log( jThis.data('class-active') );

		});
	};

	var fShowChampionship = function() {
		console.log('champ');
	}

	var fShowActivity = function() {
		console.log('activity');
	}

	jMenuPin.bind('click', function(e, sContent){
		e.preventDefault();
		var jThis = $(this);
		if (!sContent) {
			var sContent = jThis.data('content');
		} else {
			if (jThis.data('content') != sContent) {
				return false;
			}
		}
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
	});



	//init
	jMenuPin.trigger('click', ['races'])
	fCountCurrYear();

})(jQuery);
