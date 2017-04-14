import React from 'react'
import endsWith from 'lodash/endsWith'
import { Motion, spring, presets } from 'react-motion'

export default class TextArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {height:'1.5em',count:1,show:false}
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
      this.area.focus()
    }

  }
  onFoc = () => {
    this.props.addFocus(this.props.id)
  }
  toogleMenu = () =>{
    this.setState({show:!this.state.show})
  }
  changeType = (newType) =>{
    this.props.changeType(this.props.id,newType)
    this.setState({show:false})
  }
  render(){
    return(
      <section className = 'storyPart'>
        <section
          className="storymenu"
          style ={{opacity:this.props.id ==this.props.focus ? 1:0}}>
          <Motion
             style = {{
               w: spring(this.state.show ? 350 : 0,presets.gentle),
               op : spring(this.state.show ? 0.9:0,presets.gentle)
             }}
             >
             {
               ({w,op}) =>
                  <ul className = 'tooltip'
                     style = {{
                            width: w+'px',
                            opacity : op,
                            display: this.state.show ? 'block' : 'none'
                          }}
                    >
                    <li
                      onClick = {() => {this.changeType('quote')}}
                      className = 'activeStyle'
                      >
                      <i className="fa fa-quote-right"
                        aria-hidden="true">
                        </i>
                    </li>
                    <li
                      onClick = {() => {this.changeType('titleText')}}
                      >
                      <i className="fa fa-header"
                        aria-hidden="true">
                        </i>
                    </li>
                    <li
                      onClick = {() => {this.changeType('subTitle')}}
                      >

                      <i className="fa fa-text-height"
                        aria-hidden="true">
                      </i>
                    </li>
                    <li>
                      <i
                        onClick = {() => {this.changeType('paragraph')}}
                        style ={{textDecoration:'italic'}}>
                        <span>
                          P
                        </span>
                      </i>
                    </li>
                    <li>
                      <i
                        onClick = {() => {this.changeType('code')}}
                        style ={{textDecoration:'italic'}}>
                        <span>
                          {'<>'}
                        </span>
                      </i>
                    </li>

                  </ul>
                }
          </Motion>
            <i
              className= {this.state.show?"fa fa-cog act":"fa fa-cog"}
              aria-hidden="true"
              onClick = {this.toogleMenu}
              >

            </i>
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
            placeholder = {this.props.type == 'titleText' ? 'Title' : 'Write your '+this.props.type+'...'}
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
