import React, { Component } from 'react';
import './App.css';
import Apps from './container/Apps';
import { Route, Switch, Link, BrowserRouter as Router} from 'react-router-dom'
import TodoPage from './container/todoPage';

export default class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    todoPagePath: '/todoPage/'+localStorage.getItem('token'),
    mainPath: '/'
  };
}

about = () => <div>about</div>
home = () => <div>home</div>
routes = [
    {
        path: '/about',
        component: this.about
    },
    {
        path: '/home',
        component: this.home
    },
    {
      path: '/auth', 
      component: Apps
    },
    {
      path: '/todoPage/'+localStorage.getItem('token'),
      component: TodoPage
    }
]

  render() {
    return (
      <div className="root-container">
        <nav>
          <ul>
            {/* <li><Link to="/">auth</Link></li> */}
            <li><Link to={this.state.todoPagePath}>todo</Link></li>
          </ul>
          </nav>

        <Switch>
          <Route exact path={this.state.todoPagePath} component={TodoPage} />
          <Route exact path='/' component={Apps} />
        </Switch>
      </div>
    );
  }
}

