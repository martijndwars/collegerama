import React from 'react';
import './css/Lecture.css';
import videojs from 'video.js';
import Slide from './Slide';
import Fullscreen from "react-full-screen";

const server = "http://localhost:3001";


class Lecture extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
        id: null,
        slidePic: false,
        time: null,
        fullscreen: false,
        screenHeight: null,
        screenWidth: null
      }
    }

    componentDidMount () {
      const { id } = this.props.match.params
      this.setState({id : id});

      this.updateDimensions();
      window.addEventListener('resize', this.updateDimensions);

      document.addEventListener('keydown', this.handleKeyDown);





      const videoJsOptions = {
        autoplay: true,
        controls: true,
        playbackRates: [0.8, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2],
        sources: [{
          src: server + '/lectures/' + id + '/video.mp4',
          type: 'video/mp4'
        }]
      
      }

      this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {
        console.log('onPlayerReady', this)
        
      });

      const slideVideoOptions = {
        autoplay: true,
        controls: false,
        muted: true,
        fluid : true,
        sources: [{
          src: server + '/lectures/' + id + '/slide.mp4',
          type: 'video/mp4'
        }]
      
      }

      this.slidePlayer = videojs(this.slideVideoNode, slideVideoOptions, function onPlayerReady() {
        console.log('SlideReady', this)        
      });


      this.setState({finalPause : false});

      this.player.on('timeupdate', () => {
        var time = this.player.currentTime();

        if (0 < this.player.remainingTimeDisplay()) {
          this.slidePlayer.currentTime(time);
        }

        console.log(this.player.remainingTime());

        if (1 > this.player.remainingTime()) {
          if (!this.state.finalPause) {
            this.player.pause();
            window.history.back();
            this.setState({finalPause : true});
          }
        }

        this.onUpdate(time);


      });

      this.player.on('error', (error) => {
        console.log("error",error);
      })

      this.player.on('pause', () => {
        this.slidePlayer.pause();
      })

      this.slidePlayer.on('error', () => {
        this.setState({slidePic: true});
      })

  

      this.setState({player : this.player});

    }

    

    onUpdate = (time) => {
      this.setState({
        time: time
      })
    };


    componentWillUnmount() {
      if (this.player) {
        this.player.dispose()
      }
      window.removeEventListener('resize', this.updateDimensions);
    }

    toggleFull = () => {
      this.setState({ fullscreen: !this.state.fullscreen });
    }

    updateDimensions = () => {
      this.setState({ screenHeight: window.innerHeight, screenWidth: window.innerWidth });
    };

    handleKeyDown = (event) => {
      var code = event.which;

      if (this.player === null) return;

      if (code === 39) {
        this.setTimePlayer(5);
      }

      if (code === 37) {
        this.setTimePlayer(-5);
      }

      if (code === 32) {

        try {
          if (this.player.paused() === false) {
            this.player.pause();
            return;
          }
          this.player.play();
        } catch (error) {
          if (!error.message.includes("Cannot read property 'paused' of null")) {
            console.log("Player wasn't initialized " + error.message);
          }
        }


        


      }

    }

    setTimePlayer = (deltaTime) => {
      try {

        if (1 < this.player.remainingTime() - deltaTime) {
          this.player.currentTime(this.player.currentTime() + deltaTime);
        }


      } catch (error) {
        if (!error.message.includes("Cannot read property 'currentTime' of null")) {
          console.log("Player wasn't initialized " + error.message);
        }
      }
      
    }

    

    render() {
        var videoStyle = {
          height: 0.27*this.state.screenHeight, 
          width:  0.48*this.state.screenHeight,
        }

        var slideStyle = {
          height: 0.61*this.state.screenHeight, 
          width: 0.6*this.state.screenWidth,
          
        }

        return (
            <div className="Lecture">
              <Fullscreen
                enabled={this.state.fullscreen}
                onChange={fullscreen => this.setState({fullscreen})}
              >
                <button className="fullscreenButton" onClick={this.toggleFull}></button>
                <div className="SlideBox">
                  {this.state.slidePic ? <Slide id={this.props.match.params.id} ref={this.slidePic} time={this.state.time} screenHeight={this.state.screenHeight} screenWidth={this.state.screenWidth}></Slide> : null}
                  {this.state.slidePic ? null : 
                    <div className="videoBox" style={slideStyle} >
                      <div data-vjs-player >
                        <video ref={ node => this.slideVideoNode = node } className="video-js"></video>
                      </div>
                    </div>
                  }

                  
                </div>
                
                <div className="videoBox">
                  <div data-vjs-player style={videoStyle} >
                    <video ref={ node => this.videoNode = node } className="video-js"></video>
                  </div>
                </div>
              </Fullscreen>
            </div>
        );
    }
}
  
  
export default Lecture;