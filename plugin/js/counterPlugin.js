

function displayInformation(a, b) {
	
	var timePassed = a - b;//time elapsed between pause/resume
	
	if (!document.getElementById('info')) {
		
		//create container
		console.log('no container for information');
	}

	//put information in container
	console.log('time elapsed between pause/resume is: ' + timePassed);

}

function counterPlugin() {
  
	//wait for videojs to be ready
	videojs("my-video").ready(function(){

		var thisVideo = this,
			videoResumed = {
				count: 0,
				time: 0
			},
			videoPaused = {
				count: 0,
				time: 0
			};

		//action when video plays for the first time
		thisVideo.one('play', function () {
		  console.log('video starts for the first time');
		  //send information through false http request
		});

		//action when video resumes
		thisVideo.on('play', function(e) {
			
			//if user is not seeking video
			if(!thisVideo.seeking() && videoResumed) {
				//send information through false http request
				
				//increment number of plays
				videoResumed.count +=1;
				
				//save time of resuming
				videoResumed.time = thisVideo.currentTime();

				// console.log('Video resumed count: ' + videoResumed.count);
				// console.log('Video resumed time: ' + videoResumed.time );

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
				console.log('Video resume count: ' + videoResumed.count);
				console.log('Video paused count: ' + videoPaused.count);
				console.log('Video paused time: ' + videoPaused.time );

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