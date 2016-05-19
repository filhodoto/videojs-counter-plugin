
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
	
	var infoContainer = document.getElementById('info');

	if (!infoContainer) {
		
		//create container
		//console.log('no container for information');
		document.getElementById('my-video').insertAdjacentHTML('beforeend',
			'<div id="info"><p id="played">Played: <span>0</span></p><p id="paused">Paused: <span>1</span></p><p id="elapsed">Time elapsed: <span>00:5s</span></p></div>'
		);		
	}

	//put information in container
	console.log('Video resumed ' + resumeCount + ' times');
	console.log('Video paused ' + pauseCount + ' times');
	console.log('time elapsed between pause/resume is: ' + timePassed);
}

function counterPlugin() {
	
	//wait for videojs to be ready
	videojs('my-video').ready(function(){

		var thisVideo = this,
			videoResumed = {
				count: 0,
				time: 0,
				firstPlay: false
			},
			videoPaused = {
				count: 0,
				time: 0
			};

		//action when video resumes
		thisVideo.on('play', function(e) {
			
			//if user is not seeking video
			if(!thisVideo.seeking()) {
				
				//if it's the first time video starts
				if (!videoResumed.firstPlay) {
					
					console.log('video starts for the first time');
					//send information through false http request

					videoResumed.firstPlay = true;					
				}
				else
				{
					//send information through false http request
					
					//increment number of plays
					videoResumed.count +=1;
					
					//save time of resuming
					videoResumed.time = new Date().getTime() / 1000;

					//display information
					displayInformation(videoResumed.time, videoPaused.time, videoResumed.count, videoPaused.count);
				}
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
			console.log('video finish');
			//send information through false http request
			//display information
		});

	});
};