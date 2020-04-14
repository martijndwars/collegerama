import React from 'react';
import LectureCard from './LectureCard';
import UpperBar from './UpperBar';

import './css/Play.css';
import 'video.js/dist/video-js.css';

const server = "http://localhost:3001";


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
        console.log(server + '/list.json');

        fetch(server + '/list.json')
            .then((r) => r.json())
            .then((data) => {
                console.log(data);
                return this.getTitle(data);
            });
    }

    getTitle = async (data) => {
                
        await data.forEach(async (val) => {
            const response = await fetch(server + '/lectures/' + val + '/data/data.json');
            const json = await response.json();
            console.log(json);



            const newDisp = this.getDisp(val,json);

            
            var display = this.state.display;
            display.push(newDisp);

            this.setState({display: display});

        });


    }

    getDisp = (val,json) => {
        const imgUrl = this.getImg(val,json,1);
        const title = json.d.Presentation.Title;
        const to = '/lecture/' + val;
        

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

        return server + '/lectures/' + id + '/slides/' + url; 


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