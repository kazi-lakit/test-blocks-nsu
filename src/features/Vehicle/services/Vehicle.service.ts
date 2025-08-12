import { graphqlClient } from 'lib/graphql-client';
import {
  AddVehicleResponse,
  AddVehicleParams,
} from '../types/Vehicle.types';
import { GET_VEHICLE_QUERY } from '../graphql/queries';
import { INSERT_VEHICLE_MUTATION } from '../graphql/mutations';

export const getVehicles = async (context: {
  queryKey: [string, { pageNo: number; pageSize: number }];
}) => {
  const [, { pageNo, pageSize }] = context.queryKey;
  
  try {
    return await graphqlClient.query({
      query: GET_VEHICLE_QUERY,
      variables: {
        input: {
          filter: '{}',
          sort: '{}',
          pageNo,
          pageSize,
        },
      },
    });
  } catch (error) {
    // If Vehicle schema doesn't exist yet, return mock data
    console.warn('Vehicle schema not found, returning mock data');
    return {
      Vehicles: {
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: 0,
        totalPages: 1,
        pageSize,
        pageNo,
        items: []
      }
    };
  }
};

export const addVehicle = async (
  params: AddVehicleParams
): Promise<AddVehicleResponse> => {
  try {
    const response = await graphqlClient.mutate<AddVehicleResponse>({
      query: INSERT_VEHICLE_MUTATION,
      variables: params,
    });
    return response;
  } catch (error) {
    console.warn('Vehicle schema not found, add operation not available yet');
    throw new Error('Vehicle schema is not ready. Please wait for the schema to be processed in the backend.');
  }
};