import React from 'react';
import {Link,browserHistory,withRouter} from 'react-router'
import { connect } from 'react-redux'
import * as Actions from '../actions/auth'
import Modal from '../components/loginModal.jsx'
import {publishArticle} from '../actions/editor'

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
    if(this.props.isLoggedIn){
        this.props.publishArticle()
    }

  }
  render(){
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
                                      (this.props.router.getCurrentLocation().pathname =='/new')?
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

export default withRouter(connect(
  ({userData}) => ({...userData}),
  {...Actions,publishArticle}
)(Header))
