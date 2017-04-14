import React from 'react'
import { connect } from 'react-redux'
import TextArea from './textArea.jsx'
import * as actions from '../actions/editor'

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
              (props) =>
              <TextArea
                {...props}
                onChange = {this.props.changeContent}
                key = {'area'+props.id}
              />
            )
          }

        </article>

      </section>
    )
  }
}

export default connect(
  ({editorData}) =>({...editorData}),
  {...actions}
)(Story)
