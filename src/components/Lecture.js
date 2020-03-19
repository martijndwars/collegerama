import React from 'react';
import './css/Lecture.css';
import videojs from 'video.js'
import Slide from './Slide';
import Fullscreen from "react-full-screen";



class Lecture extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
        id: null,
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



      const videoJsOptions = {
        autoplay: true,
        controls: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2, 2.25],
        sources: [{
          src: '/lectures/' + id + '/video.mp4',
          type: 'video/mp4'
        }]
      
      }

      this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {
        console.log('onPlayerReady', this)
      });




      this.player.on('timeupdate', () => {
        var time = this.player.currentTime();

        this.onUpdate(time);
      });

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

    

    render() {
        var videoStyle = {
          height: 0.27*this.state.screenHeight, 
          width:  0.48*this.state.screenHeight,
        }

        return (
            <div className="Lecture">
              <Fullscreen
                enabled={this.state.fullscreen}
                onChange={fullscreen => this.setState({fullscreen})}
              >
                <button className="fullscreenButton" onClick={this.toggleFull}></button>
                <div className="SlideBox">
                  <Slide id={this.props.match.params.id} time={this.state.time} screenHeight={this.state.screenHeight} screenWidth={this.state.screenWidth}></Slide>
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