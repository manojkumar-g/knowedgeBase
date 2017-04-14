import React from 'react'
import endsWith from 'lodash/endsWith'

export default class TextArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {height:'1.5em',count:1}
  }
  componentDidMount(){
    this.setState({count:2})

  }
  onChange = (e) =>{
    let {value} = e.target
    if(!endsWith(value,'\n')){
      let count =0
      if(value.length == 0)
        count =1
      this.setState({count})
      this.props.onChange(this.props.id,value)
    }

  }
  onKeyUp = (e) => {
    if(e.keyCode === 13){
      this.props.addNew(this.props.id)
    }
    else if(e.keyCode === 8){
      if(this.state.count ==1){
        this.setState({count:2})
      }
      if(this.state.count ==2)
        this.props.remove(this.props.id)
    }

    else
      this.setState({height:this.textInput.clientHeight})


  }
  componentWillReceiveProps({id,focus}){
    if(id==focus){
      console.log('focusing on',id);
      this.area.focus()
    }

  }
  onFoc = () => {
    this.props.addFocus(this.props.id)
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
          {this.props.data}
        </pre>
          <textarea name=""
            ref ={(input) => {this.area = input}}
            onFocus = {this.onFoc}
            placeholder = {this.props.type == 'titleText' ? 'Title' : 'Write your Story...'}
            onKeyUp = {this.onKeyUp}
            style = {{height:this.state.height}}
            className ={"text "+this.props.type}
            autoFocus
            value ={this.props.data}
            onChange = {this.onChange}
            >

          </textarea>

        </section>


      </section>

    )
  }
}
