import React from 'react';
import { connect } from 'react-redux';
import {toggleModal} from '../actions/auth'

export default function(ComposedComponent) {
  class Authenticate extends React.Component{
    constructor(props){
      super(props)
    }
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/');
        this.props.toggleModal()
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }
    render(){
      return(
        <ComposedComponent {...this.props} />
      )

    }
  }
  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  return connect(({userData}) => ({isAuthenticated:userData.isLoggedIn}), {toggleModal})(Authenticate);
}
