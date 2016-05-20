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

    //call plugin in video element (with id "my-video") and set the url the information should be sent to
    videojs('my-video').counterPlugin({
		destination: 'http://www.example.com'
    });    
</script>
```
## Styling

Too change the styles of the plugin check the counterPlugin.scss file nad change it at you will and then compile it with sass  to create a new .css file that you can use. The colors can be set by changing the values of the variables defined on top of the file

```css

$backgroundColor: #FDFDFD;
$borderColor: #EEEEEE;
$fontColor: #959595;
$iconsColor: #c3c3c3;

```


## License

A short snippet describing the license (MIT, Apache, etc.)
