import React, {Component} from 'react';
import axios from 'axios';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import TextField from 'material-ui/TextField';
import UserProfile from './userProfile';

import {
  MDBListGroup,
  // MDBListGroupItem,
  MDBContainer,
  MDBBtn,
  // MDBModal,
  // MDBModalBody,
  // MDBModalHeader,
  // MDBModalFooter

} from "mdbreact";
import {Redirect} from 'react-router-dom'
import TodoService from '../services/todoRequests'
import ModalWindows from '../services/modalWindows';
import SortAndFilter from '../services/sortAndFilter'

export default class TodoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      modal: false,
      editModal: false,
      showModal: false,
      newTitle: '',
      newDescription: '',
      // showDescription: false,
      id: '',
      search: '',
      item: {
        userId: localStorage.getItem('token'),
        title: '',
        description: '',
        status: 'new',
        selected: false
      }
    }
    this.getTodo = this.getTodo.bind(this);
    this.updateSearch = this.updateSearch.bind(this)
  }

  getTodo() {
    const config = {'x-apikey': localStorage.getItem('token')}
    axios.get('http://lectorium.herokuapp.com/api/todolist', {headers: config})
      .then(
        res => {
          if (res.data) {
            this.setState({
              todoList: res.data
            });
            console.log(res, this.state.todoList)
          }
        }
      )
      .catch(
        error => {
          console.log(error);
        });
  }


  toggle = (e, modal) => {
    this.setState({
      [modal]: !this.state[modal]
    });
  }

  componentDidMount() {
    this.getTodo()
  }

  saveIfChange = (e, newValue, name) => {
    this.setState({[name]: newValue})
  }

  updateSearch(e) {
    this.setState({
      search: e.target.value.substr(0, 20)
    })
  }

  render() {

    if (JSON.parse(localStorage.getItem('isLogined')) === false) {
      return <Redirect to='/' />
    }

    const filteredArray = this.state.todoList
      .filter((item) => {
          return (item.title.indexOf(this.state.search) !== -1 ||
            item.description.indexOf(this.state.search) !== -1);
        }
      );
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h1>Todo list</h1>
          <UserProfile/>
        </div>
        {ModalWindows.searchBlock(this.toggle, 
                                  this.saveIfChange, 
                                  this.state.todoList, 
                                  this.state.search, 
                                  this.updateSearch)}
        <MDBContainer>
          <MDBListGroup>
            {ModalWindows.todoArray(filteredArray, 
                                    this.state.todoList, 
                                    this.getTodo, 
                                    this.toggle, 
                                    this.saveIfChange)}
          </MDBListGroup>
        </MDBContainer>

        <div className="mmodal-container">
          {ModalWindows.addTodoItemModalForm(this.state.newTitle, 
                                              this.state.newDescription,
                                              this.getTodo, this.toggle, 
                                              this.state.modal,
                                              this.saveIfChange
                                              )}
          {ModalWindows.editTodoItemModalForm(this.state.editModal,
                                              this.toggle,
                                              this.state.item.title,
                                              this.state.item.description,
                                              this.saveIfChange,
                                              this.getTodo,
                                              this.state.item,
                                              this.state.item.id
                                              )}
          {ModalWindows.showTodoItemModalForm(this.state.showModal, 
                                              this.toggle, 
                                              this.state.id.title, 
                                              this.state.id.description)}
        </div>
      </div>
    );
  }
}