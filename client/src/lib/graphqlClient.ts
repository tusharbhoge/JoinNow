
import Constants from 'expo-constants';
import { GraphQLClient } from 'graphql-request';
import { useAuth } from '../state/authStore';

export const getClient = () => {
  const token = useAuth.getState().userId;
  const baseUrl = Constants.expoConfig?.extra?.API_BASE_URL ;

  if (!baseUrl) {
    console.warn('API_BASE_URL not found in Constants');
  };
 
  return new GraphQLClient(`${baseUrl}/graphql`, {
    headers: {
      authorization: token,
    },
  });
};
