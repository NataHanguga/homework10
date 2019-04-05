import React, {Component} from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import UserProfile from './userProfile';

import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter

} from "mdbreact";
import {string} from 'prop-types';

export default class TodoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiBaseUrl: 'http://lectorium.herokuapp.com/api/',
      todoList: [],
      token: localStorage.getItem('token'),
      modal: false,
      editModal: false,
      showModal: false,
      newTitle: '',
      newDescription: '',
      showDescription: false,
      id: string,
      search: '',
      item: {
        userId: localStorage.getItem('token'),
        title: '',
        description: '',
        status: 'new',
        selected: false
      }
    }
    this.getTodo = this.getTodo.bind(this)
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  getTodo() {
    const config = {'x-apikey': this.state.token}
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

  componentDidMount() {
    this.getTodo();
  }

  componentWillMount() {

  }

  modalBody() {
    return (
      <MDBContainer>
        <MDBModal className="modal-body" isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader className="header" toggle={this.toggle}>Add New Todo Item</MDBModalHeader>
          <MDBModalBody>
            <MuiThemeProvider>
              <div className="box">
                <TextField
                  type="text"
                  hintText="Enter todo title"
                  floatingLabelText="Title"
                  onChange={(event, newValue) => this.setState({newTitle: newValue})}
                />
                <br/>
                <TextField
                  type="text"
                  hintText="Enter todo description"
                  floatingLabelText="Description"
                  onChange={(event, newValue) => this.setState({newDescription: newValue})}
                />
                <br/>
              </div>
            </MuiThemeProvider>
          </MDBModalBody>
          <MDBModalFooter className="modalFooter">
            <MDBBtn color="secondary" onClick={this.addTodoItem.bind(this)}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    )
  }

  addTodoItem() {
    const newData = {
      userId: localStorage.getItem('token'),
      title: this.state.newTitle,
      description: this.state.newDescription,
      status: 'done',
      selected: false
    }
    const config = {
      'x-apikey': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
    console.log('here', newData);

    axios.post(this.state.apiBaseUrl + 'todolist', newData, {headers: config})
      .then(
        res => {
          console.log(res);
          this.getTodo();
          if (res.status === '200') {
          }
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
    this.toggle();
  }

  deleteTodoItem(id) {
    const config = {'x-apikey': this.state.token}
    this.state.todoList.forEach(item => {
      if (item._id === id) {
        axios.delete(
          'http://lectorium.herokuapp.com/api/todolist/' + id,
          {headers: config})
          .then(
            res => {
              if (res.status === 200) {
                this.getTodo()
              }
            }
          )
      }
    })
  }

  editModalBody() {
    return (
      <MDBContainer>
        <MDBModal className="modal-body" isOpen={this.state.editModal} toggle={this.toggle2}>
          <MDBModalHeader className="header" toggle={this.toggle2}>Edit Todo Item</MDBModalHeader>
          <MDBModalBody>
            <MuiThemeProvider>
              <div className="box">
                <TextField
                  type="text"
                  hintText="Enter todo title"
                  floatingLabelText="Title"
                  defaultValue={this.state.item.title}
                  onChange={(event, newValue) => {
                    this.setState({
                      item: {
                        userId: localStorage.getItem('token'),
                        status: 'new',
                        selected: false,
                        title: newValue,
                        description: this.state.item.description,
                        id: this.state.item.id
                      }
                    });
                    console.log(this.state.item)
                  }
                  }
                />
                <br/>
                <TextField
                  type="text"
                  hintText="Enter todo description"
                  floatingLabelText="Description"
                  defaultValue={this.state.item.description}
                  onChange={(event, newValue) => {
                    this.setState({
                      item: {
                        userId: localStorage.getItem('token'),
                        status: 'new',
                        selected: false,
                        description: newValue,
                        title: this.state.item.title,
                        id: this.state.item.id
                      }
                    });
                    console.log(this.state.item)
                  }}
                />
                <br/>
              </div>
            </MuiThemeProvider>
          </MDBModalBody>
          <MDBModalFooter className="modalFooter">
            <MDBBtn color="secondary" onClick={() => this.saveEditTodoItem()}>Save edited Todo Item</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }

  toggle2 = () => {
    this.setState({
      editModal: !this.state.editModal
    });
  }

  editTodoItem(id) {
    console.log(id);
    this.state.todoList.forEach(item => {
      if (item._id === id) {
        console.log('lfhvbsdlfbvlfvb', item)
        this.setState({
          item: {
            title: item.title,
            description: item.description,
            id: id
          }
        })
      }
    })
  }

  saveEditTodoItem() {
    console.log(this.state.item)
    const config = {
      'Content-Type': 'application/json',
      'x-apikey': this.state.token
    }
    axios.put(
      this.state.apiBaseUrl + 'todoList/' + this.state.item.id,
      this.state.item,
      {headers: config})
      .then(
        res => {
          this.getTodo();
          console.log(res)
        }
      )
  }

  toggle3 = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  showTodoItem() {
    return (
      <MDBContainer>
        <MDBModal className="modal-body" isOpen={this.state.showModal} toggle={this.toggle3}>
          <MDBModalHeader className="header" toggle={this.toggle3}>Edit Todo Item</MDBModalHeader>
          <MDBModalBody>
            <MuiThemeProvider>
              <div className="box">
                <h3 className="title">{this.state.id.title}</h3>
                <br/>
                <div>{this.state.id.description}</div>
                <br/>
              </div>
            </MuiThemeProvider>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    )

  }

  onSorting = (e) => {
    const option = e.target.value;
    let arr = this.state.todoList
      .sort((a, b) => {
        return (option === 'Title' ? (
          (a.title > b.title) ? 1 : -1
        ) : (
          (a.description > b.description) ? 1 : -1
        ))
      });
    console.log(arr)
    this.setState({
      todoList: arr
    })
  }

  updateSearch(e) {
    this.setState({
      search: e.target.value.substr(0, 20)
    })
  }

  render() {
    const filteredArray = this.state.todoList
      .filter(
        (item) => {
          return (item.title.indexOf(this.state.search) !== -1 ||
            item.description.indexOf(this.state.search) !== -1);
        }
      );

    const todoArray = filteredArray.length ? (
      filteredArray.map((item, index) => {
        return (
          <MDBListGroupItem className="listItem" hover key={item._id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{item.title}</h5>
              <div>
                <MDBBtn
                  className="btn edit"
                  color="secondary"
                  onClick={() => {
                    this.toggle2();
                    this.editTodoItem(item._id)
                  }}
                >
                  Edit
                </MDBBtn>
                <MDBBtn
                  className="btn delete"
                  color="secondary"
                  onClick={() => {
                    this.deleteTodoItem(item._id)
                  }}
                >
                  Delete
                </MDBBtn>
              </div>
            </div>
            <div>
              <p onClick={() => {
                this.setState({id: item});
                this.toggle3()
              }
              } id={index} className="mb-1 description">{item.description}</p>
            </div>
          </MDBListGroupItem>);
      })
    ) : (
      <div>No posts yet... U r freeeeeeeeee......</div>
    );


    return (
      <div>
        <div className="d-flex justify-content-between">
          <h1>Todo list</h1>
          <UserProfile/>
        </div>
        <div className="d-flex justify-content-between">
          <MDBBtn rounded color="warning" size="lg" onClick={this.toggle}>Add</MDBBtn>
          <form>
            <select
              onChange={this.onSorting}
              className="searchBar w-100 custom-select">
              <option value="Title">Sort Title</option>
              <option value="Description">Sort Description</option>
            </select>
          </form>
          <input
            type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            placeholder="Search something"
          ></input>
        </div>
        <MDBContainer>
          <MDBListGroup>
            {todoArray}
          </MDBListGroup>
        </MDBContainer>

        <div className="mmodal-container">
          {this.modalBody()}
          {this.editModalBody()}
          {this.showTodoItem()}
        </div>
      </div>
    );
  }
}