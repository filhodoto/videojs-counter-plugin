## Counter Plugin for video.js

This is a video.js plugin that counts how many times the video is paused during playback, how many times the video is resumed (play) and the time elapsed between the pause and resume event.

## Code Example

```html
<script src="videojs-counterPlugin"></script>
<script>
 	//add plugin to Video.js prototype
    videojs.plugin('counterPlugin', counterPlugin);

    //call plugin in video element (with id "my-video")
    videojs('my-video').counterPlugin({ exampleOption: true });
</script>
```

## Installation

To install the plugin simply...

## License

A short snippet describing the license (MIT, Apache, etc.)
