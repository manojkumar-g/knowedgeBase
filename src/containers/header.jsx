import React from 'react';
import {Link,browserHistory} from 'react-router'
import { connect } from 'react-redux'
import * as Actions from '../actions/auth'
import Modal from '../components/loginModal.jsx'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  checkAuth = () => {
    if(this.props.isLoggedIn)
      browserHistory.push('/new')
    else {
      this.props.toggleModal()
    }
  }
  publish =() =>{
    console.log('publish');
  }
  render(){
    let path = browserHistory.getCurrentLocation().pathname
    return(
      <section className = 'container'>
                                <Modal
                                  toggle = {this.props.toggleModal}
                                  show = {this.props.showModal}
                                  login = {this.props.requestForLogin}
                                  signUp = {this.props.requestForRegistration}
                                />
                                <article className = 'title'>
                                  <Link to = '/'><h1>KnowledgeBase</h1></Link>
                                </article>
                                <article className = 'menu'>
                                  <ul>
                                    {this.props.isLoggedIn ?
                                      <li onClick = {this.props.reqLogOut}>Logout</li>
                                      :
                                      <li onClick ={this.props.toggleModal}>Login</li>}

                                    <li><i className="fa fa-search" aria-hidden="true"></i></li>
                                    {
                                      (path ==='/new'&& this.props.isLoggedIn)?
                                      <li onClick = {this.publish} className = 'publish'>
                                        <i className="fa fa-pencil-square-o " aria-hidden="true"></i><span>Publish</span>
                                      </li> :
                                      <li onClick = {this.checkAuth} className = 'writeStorybtn'>
                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i><span>Write a story</span>
                                      </li>
                                    }


                                  </ul>
                                </article>
      </section>
    )
  }
}

export default connect(
  ({userData}) => ({...userData}),
  {...Actions}
)(Header)
