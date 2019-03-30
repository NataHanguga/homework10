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

export default class TodoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiBaseUrl: 'http://lectorium.herokuapp.com/api/',
            todoList: [],
            token: localStorage.getItem('token'),
            todoListLength: Number,
            modal: false,
            newTitle: '',
            newDescription: ''
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    getTodo() {
        // http://lectorium.herokuapp.com/api/todolist
        let self = this;
        const config = {'x-apikey': this.state.token}
        axios.get(this.state.apiBaseUrl + 'todolist', {headers: config}) 
            .then(
                res => {
                    self.setState({todoList: res.data});
                    
                    // .todoList = res.data;
                    // self.setState({todoListLength: res.data.length});
                }
            )
            .catch(
                error => {
                    console.log(error);
                });

    }

    todoItem = () => {
        let list = []
        list.push();
        for(let i = 0; i < this.state.todoList.length; i++) {
            list.push(
                <MDBListGroupItem className="listItem" hover key={this.state.todoList[i]._id}>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{this.state.todoList[i].title}</h5>
                            <div>
                                <MDBBtn 
                                    className="btn edit" 
                                    color="secondary"
                                    >
                                    Edit
                                </MDBBtn>
                                <MDBBtn 
                                    className="btn delete" 
                                    color="secondary"
                                    onClick={this.deleteTodoItem(i)}
                                    >
                                    Delete
                                </MDBBtn>
                            </div>
                    </div>
                    <p className="mb-1 description">{this.state.todoList[i].description}</p>
                </MDBListGroupItem>);
        }
        return list
    }

    modalBody() {
        return (
            <MuiThemeProvider>
            <div className="inner-container">
                <div className="box">
                <h3 className="header">Add New Todo Item</h3>
                <TextField
                    type="text"
                    hintText="Enter todo title"
                    floatingLabelText="Title"
                    onChange = {(event,newValue) => this.setState({newTitle:newValue})}
                />
                <br/>
                <TextField
                    type="text"
                    hintText="Enter todo description"
                    floatingLabelText="Description"
                    onChange = {(event,newValue) => this.setState({newDescription:newValue})}
                />
                <br/>
                </div>
            </div>
        </MuiThemeProvider>
        )
    }

    addTodoItem(){
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
                if (res.status === '200') {
                    this.getTodo();
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
        // console.log(id);
        for (let i = 0; i < this.state.todoList.length; i++) {
            if (this.state.todoList[i]._id === id) {
                // console.log(id);
            }
        }
    }
    render() {
        return (
            <div>
                {this.getTodo()}
                <div className="d-flex justify-content-between">
                    <h1>Todo list</h1>
                    <UserProfile />
                </div>
                <MDBBtn rounded color="warning" size="lg" onClick={this.toggle}>Add</MDBBtn>
                <MDBContainer>
                    <MDBListGroup>
                        {this.todoItem()}                        
                    </MDBListGroup>
                </MDBContainer>

                <div className="mmodal-container">
                <MDBContainer>
                    <MDBModal className="modal-body" isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
                            <MDBModalBody>
                                {this.modalBody()}
                            </MDBModalBody>
                            <MDBModalFooter className="modalFooter">
                                {/* <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn> */}
                                <MDBBtn color="primary" onClick={this.addTodoItem.bind(this)}>Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}