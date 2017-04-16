import React from 'react'
import { connect } from 'react-redux'
import TextArea from './textArea.jsx'
import * as actions from '../actions/editor'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import genres from '../utils/genres'

class Story extends React.Component {
  constructor(props) {
    super(props)
  }
  setGenre = (_,__,value) => {
    this.props.setGenre(value)
  }
  render(){
    return(
      <section className = 'writeStory'>
        <article className = 'writer'>
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          <span> {this.props.name}</span>
        </article>
        <article className="genre">
                  <SelectField
                  floatingLabelText="genre"
                  value={this.props.genre}
                  onChange = {this.setGenre}
                >
                  {
                    genres.map(
                      genre => <MenuItem value={genre} primaryText={genre} key ={genre} />
                    )
                  }
                </SelectField>
        </article>
        <article className="story">
          {
            this.props.data.map(
              (props) =>
              <TextArea
                {...props}
                onChange = {this.props.changeContent}
                key = {'area'+props.id}
                addNew = {this.props.addNewPart}
                remove = {this.props.removePart}
                focus = {this.props.focused}
                addFocus = {this.props.focus}
                changeType = {this.props.changePartType}
              />
            )
          }

        </article>

      </section>
    )
  }
}

export default connect(
  ({editorData,userData}) =>({...editorData,name:userData.firstName}),
  {...actions}
)(Story)
