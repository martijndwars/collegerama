import React from 'react';
import './css/Lecture.css';
import videojs from 'video.js'
import Slide from './Slide';


class Lecture extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
        id: null,
        time: null
      }
    }

    componentDidMount () {
      const { id } = this.props.match.params
      this.setState({id : id});

      const videoJsOptions = {
        autoplay: false,
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
    }

    render() {
        return (
            <div className="Lecture">
                <h1>Lecture</h1>
                <p>{this.state.id}</p>
                <div data-vjs-player>
                  <video ref={ node => this.videoNode = node } className="video-js"></video>
                </div>
                <Slide id={this.props.match.params.id} time={this.state.time}/>
            </div>
        );
    }
}
  
  
export default Lecture;