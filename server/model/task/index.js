import TaskBoard from './type';
import Query from './query';
import queryResolver from './query.resolver';
import Mutation from './mutation';
import mutationResolver from './mutation.resolver';

const TaskBoardQuery = `
  ${TaskBoard}
  ${Query}
  ${Mutation}
`;

export default {
  typeDefs: TaskBoardQuery,
  resolvers: {
    Query:queryResolver,
    Mutation:mutationResolver
  }
}