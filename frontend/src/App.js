import React, {Component} from 'react';

class App extends Component {

  state = {
    input: '',
    screen: '',
    key: '',
    token: '',
    isVerified: false,
  }

  onSignIn = () => {
    fetch('http://localhost:8080/sign', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({key: this.state.key})
    })
    .then(res => res.json())
    .then(json => {
      this.setState({token: json.token})
    })
  }

  onVerify = () => {
    fetch('http://localhost:8080/verify', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      }
    })
    .then(res => {
      if(res.status === 200){
        this.setState({isVerified: true})
      }
      else{
        this.setState({isVerified: false})
      }
    })
  }

  render(){
    if(this.state.screen === 'signin'){
      return(
        <div>
          <input placeholder="enter something" onChange={(e) => this.setState({key: e.target.value})}/>
          <button onClick={this.onSignIn}>submit</button>
          <p>copy this token: {this.state.token}</p>
          <button onClick={() => this.setState({screen: "verify"})}>go to verify</button>
        </div>
      );
    }
    else if(this.state.screen === 'verify'){
      return(
        <div>
          <div>
            <input placeholder="paste here" onChange={(e) => this.setState({token: e.target.value})}/>
            <button onClick={this.onVerify}>submit</button>
          </div>
          {
            this.state.isVerified ?
              <div>
                token accepted. you are verified.
              </div>
              :
              <div>
                you are not verified
              </div>
          }
          <button onClick={() => this.setState({screen: "", isVerified: false, token: ""})}>go to home page</button>
        </div>
      );
    }
    else{
      return (
        <div>
          <p>click here to get token</p>
          <button onClick={() => this.setState({screen: "signin"})}>sign in</button>
          <p>click here to check token</p>
          <button onClick={() => this.setState({screen: "verify"})}>verify</button>
        </div>
      );
    }
  }
}

export default App;
