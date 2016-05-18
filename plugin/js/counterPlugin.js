function counterPlugin(options) {
  
	var thisVideo = this;

	//action when video plays for the first time
	thisVideo.one('play', function () {
	  console.log('video starts for the first time');
	  //send information through false http request (only on first play)
	});

	//action when video resumes
	thisVideo.on('play', function(e) {
		console.log('video resume');		
		//increment number of plays
	});

	//action when video pauses
	thisVideo.on('pause', function(e) {
		console.log('video paused');
		
		//increment number of pauses

		//show information

	});

	//action when video finishes
	thisVideo.on('ended', function(e) {
		console.log('video finish');
		//send information through false http request
	});

};