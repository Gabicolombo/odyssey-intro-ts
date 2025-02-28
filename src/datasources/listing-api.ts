import { RESTDataSource } from "@apollo/datasource-rest";

export class ListingAPI extends RESTDataSource {
  baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

  getFeaturedListings() {
    this.get<any[]>("featured-listings");
  }
}

