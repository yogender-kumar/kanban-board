export default `
input addListItems {
  listId: String
  taskName:String!
}

type Mutation {
  
  AddupdateTaskBoard(
    taskHead: String!
    listItems: [addListItems]
    isAddMutation: String
  ):TaskBoard
  
  AddNewList(
   userId: String!
   taskHead: String!
  ):TaskBoard

}
`;