import { DateTimeResolver } from 'graphql-scalars';
import { userQueries } from './queries';
import { userMutations } from './mutations';

export const resolvers = {
  DateTime: DateTimeResolver,
  Query: userQueries,
  Mutation: userMutations,
  
};
