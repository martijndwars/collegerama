import React from 'react';
import './css/Download.css';
import openSocket from 'socket.io-client';







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

    componentDidMount () {
        this.socket.on('output', (data) =>  {
            console.log(data);
            this.handleMessage(data);
        });
    }

    socket = openSocket('http://localhost:3001');
  
    handleChange(event) {
      this.setState({ id: event.target.value });
    }

    handleMessage(message) {
        this.setState({message: message});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.socket.emit("input", this.state.id);
      
    }

   

    render() {
        return (
          <div className="Download">
            <header className="Download-header">
              <p>
                Enter your id of the video you want to download
              </p>
              <form onSubmit={this.handleSubmit}>
                <input
                  id="id"
                  type="text"
                  value={this.state.id}
                  onChange={this.handleChange}
                />
                <button type="submit">Submit</button>
              </form>
              <p>{this.state.message}</p>
            </header>
          </div>
        );
      }
}

export default Download;