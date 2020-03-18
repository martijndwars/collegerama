import React from 'react';
import LectureCard from './LectureCard';
import UpperBar from './UpperBar';



import './css/Play.css';
import 'video.js/dist/video-js.css';


class Play extends React.Component {
    
    state = {
        display: []
    }

    componentWillMount () {
        document.body.style.overflow = "scroll";

    }

    componentDidMount () {
        this.getJson();
    }

    componentWillUnmount () {
        document.body.style.overflow = "hidden";

    }

    getJson = () => {

        fetch('../lectures/list.json')
            .then((r) => r.json())
            .then((data) => this.getTitle(data));
    }

    getTitle = async (data) => {
                
        await data.lectures.forEach(async (val) => {
            const response = await fetch('../lectures/' + val.id + '/data/data.json');
            const json = await response.json();



            const newDisp = this.getDisp(val,json);

            
            var display = this.state.display;
            display.push(newDisp);

            this.setState({display: display});

        });


    }

    getDisp = (val,json) => {
        const imgUrl = this.getImg(val.id,json,1);
        const title = json.d.Presentation.Title;
        const to = '/lecture/' + val.id;
        

        return (<LectureCard to={to} Title={title} imgUrl={imgUrl}></LectureCard>);
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

        return '/lectures/' + id + '/slides/' + url; 


    }

    

    
    
    render() {
               



        return (
            <div>
                <UpperBar></UpperBar>
                <div className="Play">
                    {this.state.display}
                </div>
            </div>
            
        );
    }
}

export default Play;