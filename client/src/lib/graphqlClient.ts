
import { GraphQLClient } from 'graphql-request';
import { useAuth } from '../state/authStore';

export const getClient = () => {
  const token = useAuth.getState().userId;
  console.log(token)

  return new GraphQLClient('http://localhost:8000/graphql', {
    headers: {
      authorization: token,
    },
  });
};
