export default `
type Query {
  getTaskBoard(userId:String!): [TaskBoard]
}
`;