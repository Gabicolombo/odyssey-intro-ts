import { Resolvers } from './types';

export const resolvers: Resolvers = {
  Query: {
    featuredListings: (_:unknown, __:unknown, { dataSources }) => {
      return dataSources.listingAPI.getFeaturedListings();
    },
  }
}