import React from 'react'
import axios from 'axios'

export default class Story extends React.Component{
  constructor(props) {
    super(props)
    this.state = {post:{data:[]}}
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
        <article className="comment">
          
        </article>
      </section>
    )
  }
}
