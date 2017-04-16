import React from 'react'
import axios from 'axios'
import {browserHistory} from 'react-router'

export default class Gallary extends React.Component {
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
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
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
