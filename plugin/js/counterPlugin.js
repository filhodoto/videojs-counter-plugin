function counterPlugin() {
  
	//wait for videojs to be ready
	videojs("my-video").ready(function(){

		var thisVideo = this,
			videoResumed = {},
			videoPaused = {};

		//action when video plays for the first time
		thisVideo.one('play', function () {
		  console.log('video starts for the first time');
		  //send information through false http request
		});

		//action when video resumes
		thisVideo.on('play', function(e) {
			
			//if user is not seeking video
			if(!thisVideo.seeking()) {
				//send information through false http request
				console.log('video resume');		
				
				console.log('is it seeking? ' + thisVideo.seeking());
				//increment number of plays
				//videoResumed.push(+=1, ) ;
			}
		});

		//action when video pauses
		thisVideo.on('pause', function(e) {
			
			if(!thisVideo.seeking()) {

				console.log('video paused');
				console.log(thisVideo.currentTime());

				console.log('is it seeking? ' + thisVideo.seeking());
				//increment number of pauses
				videoPaused +=1;

				//show information
				console.log('Video resumed: ' + videoResumed);
				console.log('Video paused: ' + videoPaused);
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