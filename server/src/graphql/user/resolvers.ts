import { userQueries } from './queries';
import { userMutations } from './mutations';

export const resolvers = {

  Query: userQueries,
  Mutation: userMutations,
  
};
