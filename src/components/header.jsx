import React from 'react';
import {Link} from 'react-router'

const Header = () => <section className = 'container'>
                          <article className = 'title'>
                            <h1>KnowledgeBase</h1>
                          </article>
                          <article className = 'menu'>
                            <ul>
                              <li><i className="fa fa-user-circle" aria-hidden="true"></i></li>
                              <li><i className="fa fa-search" aria-hidden="true"></i></li>
                              <li ><Link to = '/new' className = 'write'><i className="fa fa-pencil-square-o" aria-hidden="true"></i><span>Write a story</span></Link></li>

                            </ul>
                          </article>
                    </section>

export default Header
