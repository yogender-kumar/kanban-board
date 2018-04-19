export const addNewTaskHelper = (list, newVal, idx) => {
  // const newId = Math.round(Math.random() * 2000); 
  return {
    idx:idx,
    // newAddedId: newId,
    newValues: {
      taskId:list.taskId,
      taskHead:list.taskHead,
      listItems:list.listItems ? [
        ...list.listItems,
        {
          // listId:newId,
          taskName:newVal
        }
      ]: []
    }
  }
}