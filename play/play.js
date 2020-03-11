$(function () {
    var player = videojs('player', { }, function() {
        this.on('ended', function() {
            console.log('Awww...over so soon?');
        });
    });


    $( document ).ready(function() {
        var url_string = window.location.href;
        console.log("Getting url: " + lectureId);

        var url = new URL(url_string);
        var lectureId = url.searchParams.get("id");
        console.log("Id: " + lectureId);

        var basePath = '../lectures/'+ lectureId;
        console.log("Looking at path: " + basePath);

        $.getJSON(basePath + '/data/data.json', function (data) {
            var stream = data.d.Presentation.Streams[0];
            var slides = stream.Slides;

            // Set video file
            $('video').attr('src', basePath + '/video.mp4');

            // Sync current slide with video time
            $('video').bind('timeupdate', function () {
                var currentSlide = findSlide(this.currentTime*1000);

                if (currentSlide) {
                    var slideFile = 'slide_' + pad(currentSlide.Number.toString(), 4) + '.jpg';

                    // Update slide
                    $('.slide').css('background-image', "url('" + basePath + '/slides/' + slideFile + "')" );
                }
            });

            /**
             * Find slide corresponding to given time
             */
            var findSlide = function (time) {
                return _.findLast(slides, function (slide) {
                    return slide.Time < time;
                });
            };
        });
    });
});

// TODO: Currently duplicated/also used for backend code
var pad = function (string, length) {
    if (string.length < length) {
        return 0 + pad(string, length-1);
    } else {
        return string;
    }
}