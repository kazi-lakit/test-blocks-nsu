/**
 * GraphQL Queries for Vehicle Management
 */

export const GET_VEHICLE_QUERY = `
  query Vehicles($input: DynamicQueryInput) {
    Vehicles(input: $input) {
      hasNextPage
      hasPreviousPage
      totalCount
      totalPages
      pageSize
      pageNo
      items {
        ItemId
        Name
        Brand
        Model
        Type
        Price
        Stock
        CreatedBy
        CreatedDate
        LastUpdatedBy
        LastUpdatedDate
        IsDeleted
        Language
        OrganizationIds
      }
    }
  }
`;