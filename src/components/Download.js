import React from 'react';
import * as bs from 'bootstrap/dist/css/bootstrap.css';

import './css/Download.css';

import { Button, Form, Jumbotron, Container, Figure} from 'react-bootstrap';









class Download extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: '',
        message: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      

    }

    interval = null;

    componentDidMount () {
        



        
    }

  
    handleChange(event) {
      this.setState({ id: event.target.value });
    }

    handleMessage(message) {



        this.setState({message: message});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      console.log("state",this.state.id);
      if (this.state.id === "") {
        this.setState({message: "Id can't be empty"});
        return;
      }
      
      const ws = new WebSocket("ws://localhost:3001");

      ws.onopen = () => ws.send(this.state.id);

      ws.onmessage = (e) => this.setState({message: e.data});






    }

   

    render() {
        return (
          <Container fluid="xl" className="mt-5 px-5">

            <Jumbotron >
                  <h1>
                    Enter the id of the video you want to download
                  </h1>

                  <p>You can find your id at the end of the url on Collegerama:</p>
                  <Figure.Image className="mx-5 mb-5"

                    alt="id"
                    src="/img/url.png"
                  />
                <Form>   
                    <Form.Group controlId="id" >                  
                      <Form.Control 
                        type="textarea" 
                        placeholder="Collegerama video id" 
                        onChange={this.handleChange}
                        defaultValue=""/>
                    </Form.Group>
                    <Button variant="success" type="submit" onClick={this.handleSubmit}>Submit</Button>
                </Form>   
                <h2 className="mt-5 pt-20">{this.state.message}</h2>
  

                      
            </Jumbotron>
          </Container>


        );
      }
}

export default Download;