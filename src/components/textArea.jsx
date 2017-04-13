import React from 'react'

export default class TextArea extends React.Component {
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
  onFoc = () => {
    console.log(this.props.id);
  }
  render(){
    return(
      <section className = 'storyPart'>
        <section className="storymenu">
            {'<>'}
        </section>
        <section className="storyData">
          <pre className = {'hiddenDiv '+this.props.type}
            ref={(input) => { this.textInput = input }}
            >
              Hello
          {this.state.value}
        </pre>
          <textarea name=""
            // onFocus = {this.onFoc}
            placeholder = {this.props.type == 'titleText' ? 'Title' : 'Write your Story...'}
            onKeyUp = {this.onKeyUp}
            style = {{height:this.state.height}}
            className ={"text "+this.props.type}
            autoFocus
            value ={this.state.value}
            onChange = {this.onChange}
            >

          </textarea>

        </section>


      </section>

    )
  }
}
