import React from 'react'
import TextArea from './textArea.jsx'
import { connect } from 'react-redux'

class Story extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    console.log(this.props);
    return(
      <section className = 'writeStory'>
        <article className = 'writer'>
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          <span> User Name</span>
        </article>
        <article className="story">
          {
            this.props.data.map(
              (props) => <TextArea {...props} key = {'area'+props.id}/>
            )
          }

        </article>

      </section>
    )
  }
}

export default connect(
  ({editorData}) =>({...editorData}),
  {}
)(Story)
