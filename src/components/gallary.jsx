import React from 'react'
import axios from 'axios'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import indexOf from 'lodash/indexOf'
import pull from 'lodash/pull'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import findIndex from 'lodash/findIndex'
import tags from '../utils/genres'

class Gallary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading:false,
      posts:[],
      tags: tags.map(
        (tag,i) => ({key:tag,isSelected:false})
      )
    }
  }
  componentDidMount(){
    this.setState({loading:true})
    axios.get('/api/allPosts')
        .then(
          (res) =>
             this.setState({posts:res.data,loading:false})
        ).catch(
          err => console.log(err)
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
    let ind = findIndex(posts,(o) => o._id === id )
    if(ind>=0){
      let {likedBy} = posts[ind]
      indexOf(likedBy,this.props.email) >=0 ?
        axios.put('/api/disliked',{email:this.props.email,id}) :
        axios.put('/api/liked',{email:this.props.email,id})
    }
    this.setState({
      posts: posts.map(
        post => {
          return (post._id != id) ? post: this.filter(post)
        }
      )
    })
  }
  toggleValue = (k) => {
    this.setState({
      tags:this.state.tags.map(
        ({key,isSelected}) => key === k ? ({key,isSelected:!isSelected}) : ({key,isSelected})
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
    const style = {
        container: {
          position: 'relative',
        },
        refresh: {
          display: 'inline-block',
          position: 'relative',
        },
      };
    let tags = this.state.tags.filter(
      ({isSelected}) => isSelected
          ).map(
            ({key}) =>key
          )
    return(
      <main className="gallary">
        {this.state.loading &&  <RefreshIndicator
                size={50}
                left={70}
                top={0}
                loadingColor="#FF9800"
                status="loading"
                style={style.refresh}
              />}
        <section className="tiles">
          {
            this.state.posts.map(
              post =><span key = {post._id}>{
                tags.length == 0 ?
                  <article className = 'tile'>
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
                              <div className ='descposter'>
                                <img src={post.poster} alt=""/>
                              </div>

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

                        </article> :
                        indexOf(tags,post.genre) >= 0 ?
                        <article className = 'tile'>
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
                                    <div className ='descposter'>
                                      <img src={post.poster} alt=""/>
                                    </div>
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

                              </article>:''
                        }</span>
            )
          }
        </section>
        <aside className="side">
          <header className="sidehead">
            <i className="fa fa-tag" aria-hidden="true"></i>
            {' '}Tags
          </header>
          <ul className ='sidetags'>
            {
              this.state.tags.map(
                ({key,isSelected}) =>
                <li
                  key = {key}
                  onClick = {() => {this.toggleValue(key)}}
                  className = {isSelected ? 'isSelected':''}
                >
                  {key}
                </li>
              )
            }
          </ul>
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
