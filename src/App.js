import React, { Component } from 'react';

import './App.css';
import 'antd/dist/antd.css'; 

import Contract from './ContractInstance';
import web3 from './web3';

import { Button , message ,Modal,List} from 'antd';


// https://remix.ethereum.org/#optimize=true&version=soljson-v0.4.20+commit.3155dd80.js

var users = [] ;
class App extends Component {


  state = {
    username : '',
    address : '',
    number_of_users : 0,
    index : 0,
    visible: false,
    users: [],
    listloading: true
  }

  async componentDidMount(){

    const number_of_users = await Contract.methods.getUserCount().call();
    this.setState({number_of_users});
    this.setState({index : number_of_users - 1})
    
    for(var i=0 ; i < this.state.number_of_users ; i++){
      users.push(<h2 style ={{color:'white',alignContent:'center',margin:'auto'}} >{await Contract.methods.getUsernameByIndex(i).call()}</h2>);
    }
    // const user = await Contract.methods.getUsernameByIndex(0).call();
    // console.log(user);
    this.setState({users});
    this.setState({listloading: false});
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

   onClick = async () =>{
    const accounts = await web3.eth.getAccounts();



    var myBuffer = [];
    var str = 'Asish';
    var buffer = new Buffer(str, 'utf16le');
    for (var i = 0; i < buffer.length; i++) {
        myBuffer.push(buffer[i]);
    }
    
   const _message =  message.loading('Creating default user  profile.This might take some time(10-15s)',0);
    await Contract.methods.createUser(myBuffer,this.state.index,"Default user").send({
      from: accounts[0],
 
    }).on('confirmation', function(confirmationNumber, receipt){
      message.info('Transaction confirmed!');
      setTimeout(_message,100);
    });

    const number_of_users =  await Contract.methods.getUserCount().call();
    this.setState({number_of_users});
    this.setState({index : number_of_users - 1})
    // const user = await Contract.methods.getUsernameByIndex(1).call();
    // console.log(user);
    users = [];
    // eslint-disable-next-line
    for(var i=0 ; i < this.state.number_of_users ; i++){

      users.push(<h2 style ={{color:'white',alignContent:'center',margin:'auto'}} >{await Contract.methods.getUsernameByIndex(i).call()}</h2>);
    }
    // const user = await Contract.methods.getUsernameByIndex(0).call();
    // console.log(user);
    this.setState({users});
    


  }
  handleChange = (event) => {
    this.setState({username: event.target.value});
  }

  handleSubmit = async () => {

    const accounts = await web3.eth.getAccounts();
// delete later
    var myBuffer = [];
    var str = 'Random buffer';
    var buffer = new Buffer(str, 'utf16le');
    for (var i = 0; i < buffer.length; i++) {
        myBuffer.push(buffer[i]);
    }
    
   const _message =  message.loading('Creating user profile.This might take some time(10-15s)',0);

    await Contract.methods.createUser(myBuffer,this.state.index,this.state.username).send({
      from: accounts[0],
 
    }).on('confirmation', function(confirmationNumber, receipt){
      console.log('Confirmed');
      setTimeout(_message,100);
      message.info('Transaction confirmed!!');
    
    });
   
    this.setState({
      visible: false,
    });
    const number_of_users =  await Contract.methods.getUserCount().call();
    this.setState({number_of_users});
    this.setState({index : number_of_users - 1});


    users = [];
    // eslint-disable-next-line
    for(var i=0 ; i < this.state.number_of_users ; i++){

      users.push(<h2 style ={{color:'white',alignContent:'center',margin:'auto'}} >{await Contract.methods.getUsernameByIndex(i).call()}</h2>);
    }
    // const user = await Contract.methods.getUsernameByIndex(0).call();
    // console.log(user);
    this.setState({users});
  }


  render() {
   

    return (
      <div className="App">
        <header className="App-header">
       
         <h1 style = {{color:'white',fontWeight:600,marginTop:'100px'}}>Decentralized User profile</h1>
         <h3  style = {{color:'white',fontWeight:500}}>Number of users : {this.state.number_of_users - 1}</h3>
         <Button type="primary" size = "large" onClick = {this.onClick}>Create default profile</Button>
         <br/>
         <Button type="primary" size = "large" onClick = {this.showModal} style={{marginTop:'10px'}} >Create Profile</Button>
         <div>
           <h3 style={{margin: '16px 0',color:'white' ,fontSize:'1.7em',fontWeight:600}}>Registered users</h3>
           <List
              size="large"
              bordered
              dataSource={this.state.users}
              loading = {this.state.listloading}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        </div>
         <Modal
          title="Sign up"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary"  onClick={this.handleSubmit}>
            Submit
          </Button>,
          ]}
        >
         <form>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
          <div style= {{padding:'10px'}}></div>
           
          </form>
        </Modal>
         
        </header>

          <footer className = "App_footer">Designed by Arya Thampi, Asish Shaji, Aswin C S, Aswin P P</footer>
      


      </div>
    );
  }
}

export default App;
