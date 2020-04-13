import React from 'react';
import './css/Slide.css';
import Play from './Play';


const server = "http://localhost:3001";

class Slide extends React.Component {

    timeCorrection = 15;

    state = {
      id: null,
      data: null,
      imgUrl: null
    }

    componentWillMount () {
      const { id } = this.props;
      this.setState({id : id});



    }

    

    componentWillReceiveProps () {
      this.updateImg(this.props.time);
    }

    getJson = () => {

      fetch(server + '/lectures/' + this.state.id + '/data/data.json')
          .then((r) => r.json())
          .then((data) => {
              if (this.state.data != data) {
               this.setState({data:data});
              }
          }).catch(function (error) {
              console.log(error);
      });
    }

    setImg = (time) => {
      if (this.state.data != null) {

        var slides = this.state.data.d.Presentation.Streams[0].Slides;
      
        var slidePath = this.findSlide(slides,time,this.state.data);

        this.setState({imgUrl:slidePath});


      }
    
    }

    findSlide = (slides,time,data) => {
      var biggestSlide = slides[0];

      for (var slide in slides) {

        if (biggestSlide.Time < slides[slide].Time && slides[slide].Time < (time + this.timeCorrection)*1000) {
              biggestSlide = slides[slide];
        }
      }

      var number = biggestSlide.Number;

      return this.getImg(this.state.id,data,number);
    }

    getImg = (id,json,n) => {
      const baseTemplate = json.d.Presentation.Streams[0].SlideImageFileNameTemplate;


      if (n < 1000) {
        n = "0" + n;
      }
      
      if (n < 100) {
        n = "0" + n;
      }

      if (n < 10) {
        n = "0" + n;
      }

      const url  = baseTemplate.replace(new RegExp('{.*}', 'gi'), n);

      return server + '/lectures/' + id + '/slides/' + url; 


  }



    updateImg = (time) => {
      this.getJson();
      this.setImg(time);
    }

    slideStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      padding: '10px',
      borderRadius: '10px'
    }


  
    render() {
        return (
            <div className="Slide" style={this.slideStyle}>
              <img src={this.state.imgUrl} style={{height: 0.63*this.props.screenHeight, width: 1.12*this.props.screenHeight}} className="img"></img>
            </div>
        );
    }
}
  
  
export default Slide;