import React from 'react';

const Header = () => <section className = 'container'>
                          <article className = 'title'>
                            <h1>KnowledgeBase</h1>
                          </article>
                          <article className = 'menu'>
                            <ul>
                              <li><i className="fa fa-user-circle" aria-hidden="true"></i></li>
                              <li><i className="fa fa-search" aria-hidden="true"></i></li>
                              <li className = 'write'><i className="fa fa-pencil-square-o" aria-hidden="true"></i><span>Write a story</span></li>

                            </ul>
                          </article>
                    </section>

export default Header
