import React from 'react'
import Dialog from 'material-ui/Dialog'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 0,
      login:{
        email:'',
        password:''
      },
      signUp:{
        firstName:'',
        lastName:'',
        email:'',
        password:''
      }
    }
  }
  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    })
  }
  onChange = (field,e) => {
    let {slideIndex} = this.state
    if(slideIndex == 0){
      let{ login } = this.state
      this.setState({
        login:{
          ...login,
          [field]:e.target.value
        }
      })
    }
    else{
      let{ signUp } = this.state
      this.setState({
        signUp:{
          ...signUp,
          [field]:e.target.value
        }
      })
    }
  }
  login = () => {
    this.props.login(this.state.login)
  }
  signUp = () => {
    this.props.signUp(this.state.signUp)
  }
  render(){
    const customContentStyle = {
        width: '30%',
        maxWidth: 'none',
        marginBottom:0,
        marginTop:'-10vh',
        padding:'0px'
      }
  const style = {
  marginLeft:0,
  marginTop:20
    };
    return(
      <Dialog
          modal={false}
          contentStyle={customContentStyle}
          open={this.props.show}
          onRequestClose={this.props.toggle}
          autoScrollBodyContent={true}
        >
          <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Login" value={0} />
          <Tab label="Sign Up" value={1} />
        </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div style = {{margin:'50px'}}>
              <h3 style ={{color:'red'}}>{this.props.message}</h3>
              <TextField
                  hintText="Email"
                  floatingLabelText="Email"
                  value = {this.state.login.email}
                  onChange = {(e) => {this.onChange('email',e)}}
                /><br />
                <TextField
                  hintText="Password Field"
                  floatingLabelText="Password"
                  type="password"
                  value = {this.state.login.password}
                  onChange = {(e) => {this.onChange('password',e)}}
                /><br />
                <RaisedButton label="Login" primary={true} style={style}
                  onTouchTap = {this.login}
                />
            </div>
            <div style = {{margin:'50px'}}>
              <h3 style ={{color:'red'}}>{this.props.message}</h3>
              <TextField
                  floatingLabelText="First Name"
                  value = {this.state.signUp.firstName}
                  onChange = {(e) => {this.onChange('firstName',e)}}
                /><br />
              <TextField
                  floatingLabelText="Last Name"
                  value = {this.state.signUp.lastName}
                  onChange = {(e) => {this.onChange('lastName',e)}}
                /><br />
              <TextField
                  floatingLabelText="Email"
                  value = {this.state.signUp.email}
                  onChange = {(e) => {this.onChange('email',e)}}
                /><br />
              <TextField
                floatingLabelText="Password"
                value = {this.state.signUp.password}
                onChange = {(e) => {this.onChange('password',e)}}
                type="password"
              /><br />

              <RaisedButton label="Sign Up"
                secondary={true}
                style={style}
                onTouchTap = {this.signUp}
              />
            </div>

          </SwipeableViews>

      </Dialog>
    )
  }
}
