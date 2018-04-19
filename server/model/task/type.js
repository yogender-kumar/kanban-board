export default `
type listItems {
  listId: String
  taskName:String!
}
type TaskBoard {
  taskId: String
  taskHead: String!
  listItems:[listItems]
}
`