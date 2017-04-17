import React from 'react'
import axios from 'axios'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import indexOf from 'lodash/indexOf'
import pull from 'lodash/pull'

class Gallary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {posts:[]}
  }
  componentDidMount(){
    axios.get('/api/allPosts')
        .then(
          (res) =>
             this.setState({posts:res.data})
        )
  }
  read(id){
    browserHistory.push('/read/'+id)
  }
  toggleLike = (id) => {
    if(!this.props.isLoggedIn)
      return
    let {posts} = this.state
    if(posts.length <= 0)
      return
    this.setState({
      posts: posts.map(
        post => {
          return (post._id != id) ? post: this.filter(post)


        }
      )
    })

  }
  filter(post){
    let {likedBy} = post
    let newLike = []
    if(indexOf(likedBy,this.props.email) < 0)
      newLike = [...likedBy,this.props.email]
    else {
      newLike = pull(likedBy,this.props.email)
    }
    return {
      ...post,
      likedBy:newLike
    }
  }
  render(){
    return(
      <main className="gallary">
        <section className="tiles">
          {
            this.state.posts.map(
              post => <article className = 'tile' key = {post._id}>
                        <div className="tag">
                          <i className="fa fa-tag" aria-hidden="true"></i>
                          {" "+post.genre}
                        </div>
                        <div className="author">
                          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                          <div className="desc">
                            <span>{post.name}</span><br/>
                            <span className ='time'>{post.time}</span>
                          </div>
                        </div>
                        <div className="showoff" onClick = {() => {this.read(post._id)}}>
                          <span className ='titl'>{post.title}</span>
                          <span className="info">{post.data[1].data.substr(0,50)+' ...'}</span>
                        </div>
                        <div className="footer">
                          <div className="like">
                            {
                              indexOf(post.likedBy,this.props.email) >= 0 ?
                              <i
                                onClick = { () => this.toggleLike(post._id)}
                                className="fa fa-heart" aria-hidden="true">
                              </i>:
                              <i
                                onClick = {() => this.toggleLike(post._id)}
                                className="fa fa-heart-o" aria-hidden="true"></i>
                            }
                            {" "+post.likedBy.length}
                          </div>
                          <div className="comment">
                            {post.comments.length + " comments"}
                          </div>
                        </div>

                    </article>
            )
          }
        </section>
        <aside className="side">
          Hello
        </aside>
      </main>
    )
  }
}
export default connect(
  ({userData}) => ({
    isLoggedIn:userData.isLoggedIn,
    email:userData.email
  }),{}
)(Gallary)
