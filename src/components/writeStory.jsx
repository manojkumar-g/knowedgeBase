import React from 'react'

export default class Story extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <section className = 'writeStory'>
        <article className = 'writer'>
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          <span> User Name</span>
        </article>
      </section>
    )
  }
}
