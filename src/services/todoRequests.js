import axios from 'axios';

const apiBaseUrl = 'http://lectorium.herokuapp.com/api/';
const config = {
  'x-apikey': localStorage.getItem('token'),
  'Content-Type': 'application/json'
}

const config1 = {'x-apikey': localStorage.getItem('token')}


class TodoService {

  addTodoItem(e, newTitle, newDescription, cd1, cd2) {
    const newData = {
      userId: localStorage.getItem('token'),
      title: newTitle,
      description: newDescription,
      status: 'undone',
      selected: false
    }

    axios.post(apiBaseUrl + 'todolist', newData, {headers: config})
      .then(
        res => {
          console.log(res);
          cd1();
          if (res.status === '200') {
          }
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
    cd2(e, 'model');
  }

  deleteTodoItem(id, todoList, cd) {
    todoList.forEach(item => {
      if (item._id === id) {
        axios.delete(
          apiBaseUrl + 'todolist/' + id,
          {headers: config1})
          .then(
            res => {
              if (res.status === 200) {
                cd()
              }
            }
          )
      }
    })
  }

  editTodoItem(e, id, todoList, cd) {
    // console.log(id);
    console.log(todoList, id, cd);
    todoList.forEach(item => {
      if (item._id === id) {
        console.log('lfhvbsdlfbvlfvb', item)
        let Item = {
              title: item.title,
              description: item.description,
              id: id
            }
        cd(e, 
          {
            title: item.title,
            description: item.description,
            id: id
          },
          'item');
      }
    })
  }

  saveEditTodoItem(e, item, cd, cd1) {
    axios.put( apiBaseUrl + 'todoList/' + item.id, item, {headers: config})
      .then(
        res => {
          cd();
          console.log(res)
        }
      )
      cd1(e, 'editModal');
  }

  checkStatus(item, cd) {
    let el = document.getElementById(item._id+'done');
    console.log(el)
    if (el.innerHTML === 'undone') {
        el.innerHTML = 'done';
    } else if (el.innerHTML === 'done' || el.innerHTML === 'new') {
        el.innerHTML = 'undone'
    }
    axios.put(
        apiBaseUrl + 'todoList/' + item._id, 
        {
            userId: localStorage.getItem('token'),
            title: item.title,
            description: item.description,
            status: el.innerHTML,
            selected: false
        },
        {headers: config})
        .then(
            res => {
                cd();
                console.log(res)
            }
        )

  }


}
export default new TodoService()