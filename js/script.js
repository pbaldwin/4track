/* Author:
	Patrick Baldwin
*/

jQuery(document).ready(function($) {
	// Stuff to do as soon as the DOM is ready. Use $() w/o colliding with other libs;
	var $tracks = $('.track'),
		$playbackControls = $('.control-button'),
		$volumeControls = $('#masterVolume'),
		currentTime;

	// Sync time across all tracks.
	function syncTime() {
		for (i = 0; i < $tracks.length; i++) {
			$tracks[i].currentTime = currentTime;
		}
		//$tracks.currentTime = currentTime;
	}

	function playbackTrigger(control) {

		if (control === "pause") {
			currentTime = $tracks[0].currentTime;
		}

		if (control === "stop") {
			currentTime = 0,
			control = "pause";
		}

		$tracks.trigger(control);

		syncTime();
	}

	$playbackControls.click( function() {
		var controlName = $(this).attr('rel');
		playbackTrigger(controlName);
	});

	$volumeControls.change( function(){
		var controlName = $(this).attr('name');
	});

});





