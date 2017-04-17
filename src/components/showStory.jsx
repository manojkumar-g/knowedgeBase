import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {toggleModal} from '../actions/auth.js'

class Story extends React.Component{
  constructor(props) {
    super(props)
    this.state = {post:{data:[]},write:false,comment:''}
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
      this.comment.focus()
    }

  }
  onChange = ({target:{value}}) => {
    this.setState({comment:value})
  }
  sendComment = () =>{
    console.log({
      author:this.props.email,
      data:this.state.comment,
      id:this.state.post._id
    });
    this.setState({
      comment:'',
      write:false
    })
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
                <span onClick = {this.checkAuth}>
                  {
                    !this.state.write ?
                    'Write your Comment ...':
                    this.props.isLoggedIn ?
                    <span style={{color:'green'}}>{this.props.name+''}</span>:
                    'Write your Comment ...'
                  }

                </span>
              </div>
            </header>
            <div className ='txtara'>
              {
                this.props.isLoggedIn ?
                <div className = 'txtaracont'>
                  <textarea className = '.txtara'
                    style = {{
                      height:this.state.write?'150px':'0px',
                      opacity:this.state.write?1:0,
                    }}
                    placeholder ='Write your comment...'
                    ref ={(inp) => {this.comment = inp}}
                    value ={this.state.comment}
                    onChange = {this.onChange}
                  />
                  <button
                    onClick = {this.sendComment}
                    style = {{
                      opacity:this.state.write?1:0,
                    }}
                    >Comment</button>
              </div>
                :''
              }
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
    name:userData.firstName,
    email:userData.email
  }),
  {toggleModal}
)(Story)
