import React from 'react';
import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtn,
  MDBListGroupItem
} from 'mdbreact';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AuthService from '../services/auth'
import TodoService from '../services/todoRequests'
import SortAndFilter from '../services/sortAndFilter'


class ModalWindows { 

  editUserModalForm(toggle, modal, editName, editPassword, name, password, cd) {
    return (<MDBContainer>
      <MDBModal isOpen={modal} toggle={e => toggle(e)}>
        <MDBModalBody>
          <MuiThemeProvider>
            <div>
              <div className="box">
                <h3 className="header">Edit User Data</h3>
                <TextField
                  hintText="Enter your Username"
                  floatingLabelText="Username"
                  defaultValue={name}
                  onChange={(event, newValue) => cd(event, newValue, 'editName')}
                />
                <br/>
                <TextField
                  type="text"
                  hintText="Enter your Password"
                  floatingLabelText="Password"
                  defaultValue={password}
                  onChange={(event, newValue) => cd(event, newValue, 'editPassword')}
                />
                <br/>
                <RaisedButton
                  className="login-btn"
                  label="Edit user data"
                  color="secondary"
                  onClick={(event) => {
                    AuthService.editUser(editName, editPassword);
                  }}/>
              </div>
            </div>
          </MuiThemeProvider>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>)
  }

  addTodoItemModalForm(newTitle, newDescription, getTodo, toggle, modal, cd) {
    return (
      <MDBContainer>
        <MDBModal className="modal-body" isOpen={modal} toggle={toggle}>
          <MDBModalHeader className="header" toggle={toggle}>Add New Todo Item</MDBModalHeader>
          <MDBModalBody>
            <MuiThemeProvider>
              <div className="box">
                <TextField
                  type="text"
                  hintText="Enter todo title"
                  floatingLabelText="Title"
                  onChange={(event, newValue) => cd(event, newValue, 'newTitle')}
                />
                <br/>
                <TextField
                  type="text"
                  hintText="Enter todo description"
                  floatingLabelText="Description"
                  onChange={(event, newValue) => cd(event, newValue, 'newDescription')}
                />
                <br/>
              </div>
            </MuiThemeProvider>
          </MDBModalBody>
          <MDBModalFooter className="modalFooter">
            <MDBBtn color="secondary" 
            onClick={(event) => TodoService.addTodoItem(event, newTitle, newDescription, getTodo, toggle)}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    )
  }

  showTodoItemModalForm(showModal, toggle, title, description) {
    return (
      <MDBContainer>
        <MDBModal className="modal-body" isOpen={showModal} toggle={e => toggle(e, 'showModal')}>
          <MDBModalBody>
            <MuiThemeProvider>
              <div className="box">
                <h3 className="title">{title}</h3>
                <br/>
                <div>{description}</div>
                <br/>
              </div>
            </MuiThemeProvider>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    )

  }

  editTodoItemModalForm(editModal, toggle, title, description, cd, getTodo, item, id) {
    return (
      <MDBContainer>
        <MDBModal className="modal-body" isOpen={editModal} toggle={toggle}>
          <MDBModalHeader className="header" toggle={toggle}>Edit Todo Item</MDBModalHeader>
          <MDBModalBody>
            <MuiThemeProvider>
              <div className="box">
                <TextField
                  type="text"
                  hintText="Enter todo title"
                  floatingLabelText="Title"
                  defaultValue={title}
                  onChange={(event, newValue) => cd(event, {
                          userId: localStorage.getItem('token'),
                          status: 'new',
                          selected: false,
                          title: newValue,
                          description: description,
                          id: id
                        }, 'item')
                  }
                />
                <br/>
                <TextField
                  type="text"
                  hintText="Enter todo description"
                  floatingLabelText="Description"
                  defaultValue={description}
                  onChange={(event, newValue) => cd(event, {
                          userId: localStorage.getItem('token'),
                          status: 'new',
                          selected: false,
                          description: newValue,
                          title: title,
                          id: id
                        }, 'item')
                }
                />
                <br/>
              </div>
            </MuiThemeProvider>
          </MDBModalBody>
          <MDBModalFooter className="modalFooter">
            <MDBBtn color="secondary" 
              onClick={(event) => TodoService.saveEditTodoItem(event, item, getTodo, toggle)}
            >
            Save edited Todo Item
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }

todoArray = (filteredArray, todoList, getTodo, toggle, saveIfChange) => {
  return (
    filteredArray.length ? (
      filteredArray.map((item, index) => {
        return (
          <MDBListGroupItem className="listItem" hover key={item._id}
          style={{textDecoration: item.status === 'done' ? 'line-through' : '', opacity:  item.status === 'done' ? .5 : 1}}>
            <div className="d-flex w-100 justify-content-between">
            <button color="secondary" 
                        className="btn edit"
                        id={item._id+'done'} 
                        onClick={(e) => {TodoService.checkStatus(item, getTodo) }}>{item.status}</button>
              <h5 className="mb-1">{item.title}</h5>
              <div>
                <MDBBtn
                  className="btn edit"
                  color="secondary"
                  onClick={(event) => {
                    toggle(event, 'editModal');
                    TodoService.editTodoItem(event, item._id, todoList, saveIfChange)
                  }}
                >
                  Edit
                </MDBBtn>
                <MDBBtn
                  className="btn delete"
                  color="secondary"
                  onClick={() => {
                    TodoService.deleteTodoItem(item._id, todoList, getTodo)
                  }}
                >
                  Delete
                </MDBBtn>
              </div>
            </div>
            <div>
              <p onClick={(e) => {
                toggle(e, 'showModal')
                saveIfChange(e, item, 'id')
                // this.setState({id: item});
              }
              } id={index} className="mb-1 description">{item.description}</p>
            </div>
          </MDBListGroupItem>);
      })
    ) : (
      <div>No posts yet... U r freeeeeeeeee......</div>
    )
  )
}


searchBlock = (toggle, saveIfChange, todoList,search, updateSearch) => {
  return (
    <div className="d-flex justify-content-between">
          <MDBBtn rounded color="warning" size="lg" onClick={(e) => toggle(e, 'model')}>Add</MDBBtn>
          <form>
            <select
              onChange={(e) => SortAndFilter.onSorting(e, saveIfChange, todoList)}
              className="searchBar w-100 custom-select">
              <option value="Title">Sort Title</option>
              <option value="Description">Sort Description</option>
            </select>
          </form>
          <input
            type="text"
            value={search}
            onChange={e => updateSearch(e)}
            placeholder="Search something"
          ></input>
        </div>
  )
}
}
export default new ModalWindows()