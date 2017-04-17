import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {toggleModal} from '../actions/auth.js'

class Story extends React.Component{
  constructor(props) {
    super(props)
    this.state = {post:{data:[]},write:false}
  }
  componentDidMount(){
    if(this.props.params.id.length){
      let url = '/api/getstory/'+this.props.params.id
      axios.get(url)
          .then(
            (res) =>
               this.setState({post:res.data[0]})
          )
    }

  }
  checkAuth = () =>{
    if(!this.props.isLoggedIn)
        this.props.toggleModal()
    else{
      this.setState({write:true})
      console.log(this.comment);
      this.comment.focus()
    }

  }
  render(){
    return(
      <section className="readPost">
        <article className = 'writer'>
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          <span> {this.state.post.name}</span>
        </article>
        <article className="readstory">
          {
            this.state.post.data.map(
              colm =>
                <div key = {colm.id} className = {colm.type+' readPara'}>
                  {colm.data}
                </div>

            )
          }
        </article>
        <article className="commentSec">
          <h3>Comments</h3>
          <div className = 'writeComment'>
            <header>
              <div className ='comAvatar'>
                {
                  this.props.isLoggedIn ?
                  <i className="fa fa-user-circle" aria-hidden="true"></i>:
                  <i className="fa fa-comment-o" aria-hidden="true"></i>
                }
              </div>
              <div className ='comtxt'>
                <span onClick = {this.checkAuth}>Write your Comment ...</span>
              </div>
            </header>
            <div className ='txtara'>

                <textarea className = '.txtara'
                  style = {{
                    height:this.state.write?'150px':'0px',
                    opacity:this.state.write?1:0,
                  }}
                  placeholder ='Write your comment...'
                  autofocus
                  ref ={(inp) => {this.comment = this}}
                />

            </div>
          </div>

        </article>
      </section>
    )
  }
}

export default connect(
  ({userData}) => ({
    isLoggedIn:userData.isLoggedIn,
    name:userData.name,
    email:userData.email
  }),
  {toggleModal}
)(Story)
