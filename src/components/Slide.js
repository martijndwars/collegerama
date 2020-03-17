import React from 'react';
import './css/Slide.css';


class Slide extends React.Component {

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

      fetch('../lectures/' + this.state.id + '/data/data.json')
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
      
        var currentSlide = this.findSlide(slides,time);
        var slidePath = '/lectures/' + this.state.id + '/slides/slide_' + currentSlide + '.jpg';

        this.setState({imgUrl:slidePath});


      }
    
    }

    findSlide = (slides,time) => {
      var biggestSlide = slides[0];

      for (var slide in slides) {

        if (biggestSlide.Time < slides[slide].Time && slides[slide].Time < time*1000) {
              biggestSlide = slides[slide];
        }
      }

      var number = biggestSlide.Number;

      if (number < 1000) {
        number = "0" + number;
      }
      
      if (number < 100) {
        number = "0" + number;
      }

      if (number < 10) {
        number = "0" + number;
      }

      return number;


    }



    updateImg = (time) => {
      console.log(time);
      this.getJson();
      this.setImg(time);
    }


  
    render() {
        return (
            <div className="Slide">
                <h1>Slide</h1>
                <p>{this.state.id}</p>
                <img className="slide" src={this.state.imgUrl}/>
            </div>
        );
    }
}
  
  
export default Slide;