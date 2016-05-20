
function counterPlugin(options) {
	
	function sendInformation(data, destinationURL) {

		var request = new XMLHttpRequest();
		request.open('POST', destinationURL, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		
		//check for error/success status - in this case we know it will fail 
		request.onreadystatechange = function (oEvent) {  
			if (request.readyState === 4 && request.status === 200) {  
				//log success
				console.log(request.responseText)  
			} else {  
				//log error
				console.log('Failed - Error ' + request.statusText);  
			}  
		}; 	

		request.send(data);
	}

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
	}

	//wait for videojs to be ready
	videojs('my-video').ready(function(){

		var thisVideo = this,
			destinationURL = options.destination,
			firstPlay = false,
			videoResumed = {
				count: 0,
				time: 0
			},
			videoPaused = {
				count: 0,
				time: 0
			};

		//create container for information in DOM
		document.querySelectorAll('.vjs-control-bar')[0].insertAdjacentHTML('beforebegin',
			'<div id="info"><p id="countPlayed" class="entypo-play">Played: <span>0</span></p><p id="countPaused" class="entypo-pause">Paused: <span>0</span></p><p id="countElapsed" class="entypo-back-in-time">Time elapsed pause/resume: <span>00:00s</span></p></div>'
		);

		//action when video resumes
		thisVideo.on('play', function(e) {
			
			//if user is not seeking video
			if(!thisVideo.seeking()) {
				
				//if it's the first time user press play
				if(!firstPlay) {
					
					//track it using a variable
					firstPlay = true;

				//if it's not the first time
				} else {
					
					//increment number of plays
					videoResumed.count +=1;

					//save time of resuming
					videoResumed.time = new Date().getTime() / 1000;					
				}
				
				//display information
				displayInformation(videoResumed.time, videoPaused.time, videoResumed.count, videoPaused.count);

				//send information through http request
				sendInformation(JSON.stringify('Video Played ' + videoResumed.count + ' time' + ' and Paused ' + videoPaused.count + ' time'), destinationURL);			
			}
		});

		//action when video pauses
		thisVideo.on('pause', function(e) {
			
			//check if video is not seeking and hasn't ended
			if(!thisVideo.seeking()) {

				//if the pausing is not done beacause of the video ending
				if(!thisVideo.ended()) {
					
					//increment number of pauses
					videoPaused.count +=1;
				}
				
				//save time of pausing
				videoPaused.time = new Date().getTime() / 1000;

				//display information
				displayInformation(videoPaused.time, videoResumed.time, videoResumed.count, videoPaused.count);
			}

		});

		//action only when video finishes
		thisVideo.on('ended', function(e) {
			
			//send information through http request
			sendInformation(JSON.stringify('Video Played ' + videoResumed.count + ' time' + ' and Paused ' + videoPaused.count + ' time'), destinationURL);
		});

	});
};