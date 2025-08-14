import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { useAddVehicle } from '../../hooks/use-Vehicle';
import { AddVehicleInput, VehicleSchema, VehicleFormData, VEHICLE_TYPES } from '../../types/Vehicle.types';

interface VehicleFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

/**
 * Renders a form for creating a new vehicle and handles validation and submission.
 *
 * The form uses react-hook-form with a Zod schema (VehicleSchema) to validate fields:
 * Name, Brand, Model (text), Type (select), Price (number), and Stock (number).
 * On submit the form builds an AddVehicleInput and calls the useAddVehicle mutation.
 * While the mutation is in progress the submit button is disabled and shows "Adding...".
 * On successful creation the form is reset and the optional `onSuccess` callback is invoked.
 *
 * @param onSuccess - Optional callback invoked after a vehicle is successfully added.
 * @param onCancel - Optional callback invoked when the user cancels the form (renders a Cancel button when provided).
 * @returns A JSX element containing the vehicle creation form.
 */
export function VehicleForm({ onSuccess, onCancel }: VehicleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: addVehicle, isPending } = useAddVehicle();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      Name: '',
      Brand: '',
      Model: '',
      Type: undefined,
      Price: 0,
      Stock: 0
    },
  });

  const selectedType = watch('Type');

  const onSubmit = (data: VehicleFormData) => {
    setIsSubmitting(true);
    
    const input: AddVehicleInput = {
      Name: data.Name,
      Brand: data.Brand,
      Model: data.Model,
      Type: data.Type,
      Price: data.Price,
      Stock: data.Stock
    };

    addVehicle(
      { input },
      {
        onSuccess: () => {
          reset();
          setIsSubmitting(false);
          onSuccess?.();
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Vehicle</CardTitle>
        <CardDescription>Enter the details for the new vehicle item</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="Name">Name</Label>
            <Input
              id="Name"
              type="text"
              {...register('Name')}
              placeholder="Enter name"
            />
            {errors.Name && (
              <p className="text-sm text-red-500">{errors.Name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Brand">Brand</Label>
            <Input
              id="Brand"
              type="text"
              {...register('Brand')}
              placeholder="Enter brand"
            />
            {errors.Brand && (
              <p className="text-sm text-red-500">{errors.Brand.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Model">Model</Label>
            <Input
              id="Model"
              type="text"
              {...register('Model')}
              placeholder="Enter model"
            />
            {errors.Model && (
              <p className="text-sm text-red-500">{errors.Model.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Type">Type</Label>
            <Select value={selectedType} onValueChange={(value) => setValue('Type', value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.Type && (
              <p className="text-sm text-red-500">{errors.Type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Price">Price</Label>
            <Input
              id="Price"
              type="number" 
              step="0.01"
              {...register('Price', { valueAsNumber: true })}
              placeholder="Enter price"
            />
            {errors.Price && (
              <p className="text-sm text-red-500">{errors.Price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Stock">Stock</Label>
            <Input
              id="Stock"
              type="number" 
              step="1"
              {...register('Stock', { valueAsNumber: true })}
              placeholder="Enter stock"
            />
            {errors.Stock && (
              <p className="text-sm text-red-500">{errors.Stock.message}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={isPending || isSubmitting}
              className="flex-1"
            >
              {isPending || isSubmitting ? 'Adding...' : 'Add Vehicle'}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending || isSubmitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}