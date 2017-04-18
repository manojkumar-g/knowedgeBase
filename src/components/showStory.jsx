import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {toggleModal} from '../actions/auth.js'
import RefreshIndicator from 'material-ui/RefreshIndicator';

class Story extends React.Component{
  constructor(props) {
    super(props)
    this.state = {post:{data:[],comments:[]},write:false,comment:'',loading:true}
  }
  componentDidMount(){
    if(this.props.params.id.length){
      let url = '/api/getstory/'+this.props.params.id
      axios.get(url)
          .then(
            (res) =>
               this.setState({post:res.data[0],loading:false})
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
    if(this.state.comment.length == 0 )
      return
    let cmt = {
      author:this.props.email,
      data:this.state.comment
    }
    let url = '/api/updatecomments/'+ this.state.post._id
    let {post} = this.state
    this.setState({
      post:{
        ...post,
        comments:[
          cmt,
          ...post.comments
        ]
      },
      comment:'',
      write:false
    })
    axios.put(url,cmt)
          .then(
            res => {
              console.log(res);
            }
          ).
          catch(
            err => {
              this.setState({
                post
              })
            }
          )
  }
  render(){
    const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};
    return(
      <section className="readPost">
        {this.state.loading &&
                  <RefreshIndicator
                size={50}
                left={70}
                top={0}
                loadingColor="#FF9800"
                status="loading"
                style={style.refresh}
              />}
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
                this.props.isLoggedIn  ?
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
                  {
                    this.state.write ?
                    <button
                      onClick = {this.sendComment}
                      style = {{
                        opacity:this.state.write?1:0,
                      }}
                      >Comment</button>:''
                  }

              </div>
                :''
              }
            </div>

          </div>
          {
            this.state.post.comments.map(
              (comment,i) =>
              <div className = 'cmttile' key ={'comment'+i}>
                <div className ='comAvatar'>
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                </div>
                <div className ='comtxt'>
                      <span style={{color:'green'}}>{comment.author+''}</span>
                </div>
                {comment.data}
              </div>
            )
          }
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
