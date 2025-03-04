import { Resolvers } from './types';
import { validateFullAmenities } from "./helpers";

export const resolvers: Resolvers = {
  Query: {
    featuredListings: (_:unknown, __:unknown, { dataSources }) => {
      return dataSources.listingAPI.getFeaturedListings();
    },
    listing: (_:unknown, { id }, { dataSources }) => {
      return dataSources.listingAPI.getListing(id);
    }
  },
  Listing: {
    amenities: ({id, amenities}, _, { dataSources }) => {
      return validateFullAmenities(amenities)
        ? amenities
        : dataSources.listingAPI.getAmenities(id);
    }
  },
  Mutation: {
    createListing: async (_, { input }, { dataSources }) => {
      try{
        const response = await dataSources.listingAPI.createListing(input);
        return {
          code: 200,
          success: true,
          message: "Listing successfully created!",
          listing: response
        };
      }catch(err){
        return {
          code: 500,
          success: false,
          message: `Something went wrong: ${err.extensions.response.body}`,
          listing: null
        };
      }
    }
  }
}