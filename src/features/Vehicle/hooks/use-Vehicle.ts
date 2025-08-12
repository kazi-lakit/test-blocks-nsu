import { useGlobalQuery, useGlobalMutation } from 'state/query-client/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from 'hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { AddVehicleParams } from '../types/Vehicle.types';
import {
  getVehicles,
  addVehicle,
} from '../services/Vehicle.service';

interface VehicleQueryParams {
  pageNo: number;
  pageSize: number;
}

export const useGetVehicles = (params: VehicleQueryParams) => {
  return useGlobalQuery({
    queryKey: ['Vehicle', params],
    queryFn: getVehicles,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    onError: (error) => {
      throw error;
    },
  });
};

export const useAddVehicle = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  return useGlobalMutation({
    mutationFn: (params: AddVehicleParams) => addVehicle(params),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'Vehicle',
      });

      if (data.insertVehicle?.acknowledged) {
        toast({
          variant: 'success',
          title: t('VEHICLE_ITEM_ADDED'),
          description: t('VEHICLE_ITEM_SUCCESSFULLY_CREATED'),
        });
      }
    },
    onError: (error) => {
      throw error;
    },
  });
};