/**
 * GraphQL Mutations for Vehicle Management
 */

export const INSERT_VEHICLE_MUTATION = `
  mutation InsertVehicle($input: VehicleInsertInput!) {
    insertVehicle(input: $input) {
      itemId
      totalImpactedData
      acknowledged
    }
  }
`;

export const UPDATE_VEHICLE_MUTATION = `
  mutation UpdateVehicle($filter: String!, $input: VehicleUpdateInput!) {
    updateVehicle(filter: $filter, input: $input) {
      itemId
      totalImpactedData
      acknowledged
    }
  }
`;

export const DELETE_VEHICLE_MUTATION = `
  mutation DeleteVehicle($filter: String!, $input: VehicleDeleteInput!) {
    deleteVehicle(filter: $filter, input: $input) {
      itemId
      totalImpactedData
      acknowledged
    }
  }
`;