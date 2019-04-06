class SortAndFilter {

  onSorting = (e, cd, todoList) => {
    const option = e.target.value;
    let arr = todoList
      .sort((a, b) => {
        return (option === 'Title' ? (
          (a.title > b.title) ? 1 : -1
        ) : (
          (a.description > b.description) ? 1 : -1
        ))
      });
    console.log(arr)
    cd(e, arr, todoList)
  }

  updateSearch(e, cd) {
    cd(e, e.target.value.substr(0, 20), 'search')
    // this.setState({
    //   search: e.target.value.substr(0, 20)
    // })
  }

  // filteredArray = (todoList, search) => 
  //   todoList.filter(
  //     (item) => {
  //       return (item.title.indexOf(search) !== -1 ||
  //         item.description.indexOf(search) !== -1);
  //     }
  //   )

}
export default new SortAndFilter()