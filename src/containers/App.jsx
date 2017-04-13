import React from 'react';
import css from '../styles/land.styl'
import Header from '../components/header.jsx'
export default class App extends React.Component{

  render(){
    return(
      <div>
      <header className = 'head'>
        <Header/>
      </header>
      <main className = 'content'>
        <section className = 'container'>
          {this.props.children}
        </section>
      </main>
    </div>
    );
  }
}
