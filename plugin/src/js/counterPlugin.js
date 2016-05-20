

//set value of time to a mm:ss format 
function setTime(lastActionTime, firstActionTime) {

	var timePassed = lastActionTime - firstActionTime,
		minutes = firstActionTime != 0 ? Math.floor(timePassed / 60) : 0, //if first action = 0 then minutes = 00
    	seconds = Math.floor(timePassed - Math.floor(timePassed / 60) * 60),
    	x = minutes < 10 ? "0" + minutes : minutes,
    	y = seconds < 10 ? "0" + seconds : seconds;

    return x + ':' + y + 's';
}

function displayInformation(lastActionTime, firstActionTime, resumeCount, pauseCount) {
	
	var timePassed = setTime(lastActionTime, firstActionTime); //time elapsed between pause/resume
	
	//set play count in DOM
	document.getElementById('countPlayed').getElementsByTagName('span')[0].innerHTML = resumeCount;
	
	//set pause count in DOM
	document.getElementById('countPaused').getElementsByTagName('span')[0].innerHTML = pauseCount;
	
	//set time elapsed count in DOM
	document.getElementById('countElapsed').getElementsByTagName('span')[0].innerHTML = timePassed;

	//put information in container
	console.log('Video resumed ' + resumeCount + ' times');
	console.log('Video paused ' + pauseCount + ' times');
	console.log('time elapsed between pause/resume is: ' + timePassed);
}

function counterPlugin() {
	
	//wait for videojs to be ready
	videojs('my-video').ready(function(){

		var thisVideo = this,
			firstPlay = false,
			videoResumed = {
				count: 0,
				time: 0
			},
			videoPaused = {
				count: 0,
				time: 0
			};

		//create container for information
		document.querySelectorAll('.vjs-control-bar')[0].insertAdjacentHTML('beforebegin',
			'<div id="info"><p id="countPlayed" class="entypo-play">Played: <span>0</span></p><p id="countPaused" class="entypo-pause">Paused: <span>0</span></p><p id="countElapsed" class="entypo-back-in-time">Time elapsed pause/resume: <span>00:00</span></p></div>'
		);

		//action when video resumes
		thisVideo.on('play', function(e) {
			
			//if user is not seeking video
			if(!thisVideo.seeking()) {
				
				//increment number of plays
				videoResumed.count +=1;
				
				//save time of resuming
				videoResumed.time = new Date().getTime() / 1000;

				//display information
				displayInformation(videoResumed.time, videoPaused.time, videoResumed.count, videoPaused.count);

				//send information through false http request
				
			}
		});

		//action when video pauses
		thisVideo.on('pause', function(e) {
			
			if(!thisVideo.seeking()) {

				//increment number of pauses
				videoPaused.count +=1;
				
				//save time of pausing
				videoPaused.time = new Date().getTime() / 1000;

				//display information
				displayInformation(videoPaused.time, videoResumed.time, videoResumed.count, videoPaused.count);
			}

		});

		//action when video finishes
		thisVideo.on('ended', function(e) {
			//display information
			displayInformation(videoPaused.time, videoResumed.time, videoResumed.count, videoPaused.count);

			//send information through false http request

		});

	});
};