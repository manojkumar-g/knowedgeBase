import React from 'react'

export default class Story extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value : '',height:'1.5em'}
  }
  onChange = (e) =>{
    this.setState({value:e.target.value})
  }
  onKeyUp = () => {
    this.setState({height:this.textInput.clientHeight})
  }
  render(){
    return(
      <div>
        <pre className = 'hiddenDiv'
          ref={(input) => { this.textInput = input }}
          >
            Hello
        {this.state.value}
      </pre>
        <textarea name=""
          placeholder = 'Write here'
          onKeyUp = {this.onKeyUp}
          style = {{height:this.state.height}}
          className ="text"
          autoFocus
          value ={this.state.value}
          onChange = {this.onChange}
          >

        </textarea>

      </div>

    )
  }
}
