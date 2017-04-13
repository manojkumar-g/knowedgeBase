import React from 'react';
import css from '../styles/land.styl'
export default class App extends React.Component{

  render(){
    return(
      <header className = 'head'>
        <section className = 'container'>
          <article className = 'title'>
            <h1>KB</h1>
          </article>
          <article className = 'menu'>
            <ul>
              <li><i className="fa fa-user-circle" aria-hidden="true"></i></li>
              <li><i className="fa fa-search" aria-hidden="true"></i></li>
              <li className = 'write'><span>Write a story</span></li>

            </ul>
          </article>
        </section>

      </header>
    );
  }
}
