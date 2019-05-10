import React,{Component,lazy,Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TwitterLogin from 'react-twitter-auth';
import {Card, CardBody, CardHeader, CardFooter,ListGroup,ListGroupItem} from 'reactstrap';
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
 let token= JSON.parse(localStorage.getItem('Token'));
  if(token)
      config.headers['x-Auth-Token'] = token;
    
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
class App extends Component {
  constructor() {
    super();
    
    this.state = { isAuthenticated: false, user: null, token: '',
    postList:[]
    };
}
onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
  response.json().then(user => {
    
    if (token) {
      localStorage.setItem('Token',JSON.stringify(token));
      this.setState({isAuthenticated: true, user: user, token: token});
    }
  });
};

componentDidUpdate(){
  let token= JSON.parse(localStorage.getItem('Token'));
 
  if(token && this.state.postList.length===0 ){
  axios.get('http://localhost:4000/api/v1/auth/me').then((res) => {
    // addLogs(userId,res.data);
    res.data.map((e,i)=>
    console.log(Object.assign([],(Object.assign({},e.extended_entities).media)))
    )
    console.log(res.data);
    this.setState({
        postList:res.data
    })
  }).catch((err) => {console.log(err);})
}
}
onFailed = (error) => {
  alert(error);
};
logout = () => {
  localStorage.removeItem('Token');
  this.setState({isAuthenticated: false, token: '', user: null})
};
render(){
  let pic=''
  let content = !!this.state.isAuthenticated ?
    (
      <div>
      <Card style={{border:'2px',borderColor:'solid black'}}>  
       <CardBody> <div style={{float : 'left'}}>
      Welcome {this.state.user.email}
        </div>
        <div style={{float : 'right'}}>
          <button  onClick={this.logout} className="button" >
            Log out
          </button>
     </div> 
     </CardBody>
     </Card >
     <div style={{display:'block'}}>

    <ListGroup>
       {this.state.postList.map((e,i)=>
        
       <ListGroupItem> <blockquote className=''> 
       {  
      //  /console.log(Object.assign([],(Object.assign({},e.extended_entities).media)))
        }
       {     }
        <p className='' >{e.full_text} </p>
        </blockquote>
        </ListGroupItem>
       )}
     </ListGroup>
     </div>
     </div>
    ) :
    (
      <div style={{position:"fixed",top:"40%",left:"40%"}}>
      <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                    onFailure={this.onFailed} onSuccess={this.onSuccess}
                    requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"/>
                    </div>
  );

  return (
    <div className="App">
      
     {content}
     
    </div>
  );
}
}
export default App;
