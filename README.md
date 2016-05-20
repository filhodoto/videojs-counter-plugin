## Counter Plugin for video.js

This is a video.js plugin that counts how many times the video is paused during playback, how many times the video is resumed (play) and the time elapsed between the pause and resume event.


## Installation

For the plugin to work you link the js and css files and call the plugin in your video element. 

```html

<!-- CSS -->
<link href="http://weloveiconfonts.com/api/?family=entypo" rel="stylesheet" />
<link href="/path/to/file/counterPlugin.min.css" rel="stylesheet" />

<!-- JS -->
<script src="/path/to/file/counterPlugin.min.js"></script>

<script>
   //add plugin to Video.js prototype
    videojs.plugin('counterPlugin', counterPlugin);

    //call plugin in video element (with id "my-video")
    videojs('my-video').counterPlugin();    
</script>
```

## License

A short snippet describing the license (MIT, Apache, etc.)
