/**
 * GraphQL Types for Vehicle Management
 */

export interface VehicleItem {
  ItemId: string;
  Name: string;
  Brand: string;
  Model: string;
  Type: string;
  Price: number;
  Stock: number;
  CreatedBy: string;
  CreatedDate: string;
  LastUpdatedBy: string;
  LastUpdatedDate: string;
  IsDeleted: boolean;
  Language: string;
  OrganizationIds: string[];
}

export interface GetVehicleResponse {
  Vehicles: {
    items: VehicleItem[];
    totalCount: number;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface AddVehicleInput {
  Name: string;
  Brand: string;
  Model: string;
  Type: string;
  Price: number;
  Stock: number;
}

export interface AddVehicleParams {
  input: AddVehicleInput;
}

export interface AddVehicleResponse {
  insertVehicle: {
    itemId: string;
    totalImpactedData: number;
    acknowledged: boolean;
  };
}

// Zod schema for form validation
import * as z from 'zod';

export const VehicleSchema = z.object({
  Name: z.string().min(1, 'This field is required'),
  Brand: z.string().min(1, 'This field is required'),
  Model: z.string().min(1, 'This field is required'),
  Type: z.enum(['Sedan', 'SUV', 'MiniBus', 'Bus', 'Bike'], {
    required_error: 'Please select a vehicle type',
  }),
  Price: z.number().min(0, 'Price must be greater than 0'),
  Stock: z.number().min(0, 'Stock must be greater than 0'),
});

export type VehicleFormData = z.infer<typeof VehicleSchema>;

export const VEHICLE_TYPES = ['Sedan', 'SUV', 'MiniBus', 'Bus', 'Bike'] as const;