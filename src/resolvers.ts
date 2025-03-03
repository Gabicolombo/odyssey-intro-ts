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
  }
}