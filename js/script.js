/* Author:
	Patrick Baldwin
*/

jQuery(document).ready(function($) {
	// Stuff to do as soon as the DOM is ready. Use $() w/o colliding with other libs;
	var $tracks = $('.track'),
		$playbackControls = $('.control-button'),
		$volumeControls = $('.volume'),
		$muteControls = $('.mute'),
		masterVolume = 0,
		currentTime = 0;

	// Sync time across all tracks.
	function syncTime() {
		for (i = 0; i < $tracks.length; i++) {
			$tracks[i].currentTime = currentTime;
		}
	}

	function playbackControl(control) {

		if (control === "pause") {
			currentTime = $tracks[0].currentTime;
		}

		if (control === "stop") {
			currentTime = 0,
			control = "pause";
		}

		syncTime();

		$tracks.trigger(control);
	}

	function volumeControl(control, level) {
		if (control === "master") {
			for (i = 0; i < $tracks.length; i++) {
				var trackLevel = $volumeControls.eq(i).attr('value') / 100 - masterVolume;
				if ( trackLevel > 0 ) {
					$tracks[i].volume = trackLevel;
				} else {
					$tracks[i].volume = 0;
				}
			} 
		} else {
			var trackNumber = control.slice(5,6) - 1,
			level = level / 100 - masterVolume;
			if (level > 0) {
				$tracks[trackNumber].volume = level;
			} else {
				$tracks[trackNumber].volume = 0;
			}
		}
	}

	function muteControl(control, mute) {
		var track = $tracks[control.slice(5,6) - 1];
		if (mute) {
			track.muted = true;
		} else {
			track.muted = false;
		}

	}

	$playbackControls.click( function() {
		var controlName = $(this).attr('rel');
		playbackControl(controlName);
	});

	$volumeControls.change( function() {
		var $this = $(this),
			controlName = $this.attr('name'),
			controlLevel = $this.attr('value');

		if (controlName === "master") {
			masterVolume = Math.abs(controlLevel / 100);
		}

		volumeControl(controlName, controlLevel);
		//console.log(masterVolume);
	});

	$muteControls.click( function() {
		var $this = $(this),
			controlName = $this.attr('name'),
			mute = false;

		if ($this.is(':checked')) {
			mute = true;
		} else {
			mute = false;
		}

		muteControl(controlName, mute);
	});

});





