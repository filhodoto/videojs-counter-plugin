
//set value of time to a hh:mm format 
function setTime(timePassed) {

	var minutes = Math.floor(timePassed / 60),   
    	seconds = Math.floor(timePassed - minutes * 60),
    	x = minutes < 10 ? "0" + minutes : minutes,
    	y = seconds < 10 ? "0" + seconds : seconds;

    return x + ':' + y + 's';
}

function displayInformation(a, b) {
	
	var timePassed = setTime(a - b);//time elapsed between pause/resume
	
	if (!document.getElementById('info')) {
		
		//create container
		//console.log('no container for information');
	}

	//put information in container
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

		// //action when video plays for the first time
		// thisVideo.one('play', function () {
		//   console.log('video starts for the first time');
		//   //send information through false http request

		//   videoResumed.firstPlay = true;
		// });

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
					videoResumed.time = thisVideo.currentTime();

					// console.log('Video resumed count: ' + videoResumed.count);
					console.log('Video resumed at: ' + videoResumed.time );
					displayInformation(videoResumed.time, videoPaused.time);

				}
			}
		});

		//action when video pauses
		thisVideo.on('pause', function(e) {
			
			if(!thisVideo.seeking()) {

				console.log('video paused');

				//increment number of pauses
				videoPaused.count +=1;
				
				//save time of pausing
				videoPaused.time = thisVideo.currentTime();

				//show information
				// console.log('Video resume count: ' + videoResumed.count);
				// console.log('Video paused count: ' + videoPaused.count);
				console.log('Video paused at: ' + videoPaused.time );

				displayInformation(videoPaused.time, videoResumed.time);
			}

		});

		//action when video finishes
		thisVideo.on('ended', function(e) {
			console.log('video finish');
			//send information through false http request
			//show information
		});

	});

};