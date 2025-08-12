import { useCallback, useEffect, useState } from 'react';
import { Button } from 'components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import DataTable from 'components/blocks/data-table/data-table';
import { useGetVehicles } from 'features/Vehicle/hooks/use-Vehicle';
import { VehicleItem } from 'features/Vehicle/types/Vehicle.types';
import { VehicleForm } from 'features/Vehicle/component/Vehicle-form/Vehicle-form';
import { createVehicleColumns } from './Vehicle-columns';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export function Vehicle() {
  const columns = createVehicleColumns();
  const [VehicleTableData, setVehicleTableData] = useState<VehicleItem[]>([]);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    data: VehicleData,
    isLoading: isVehicleLoading,
    error: VehicleError,
  } = useGetVehicles({
    pageNo: paginationState.pageIndex + 1,
    pageSize: paginationState.pageSize,
  });

  const data = VehicleData as { Vehicles: any };

  useEffect(() => {
    if (data?.Vehicles?.items) {
      const VehicleDataMap = data.Vehicles.items.map((item: VehicleItem) => ({
        ItemId: item.ItemId,
        Name: item.Name,
        Brand: item.Brand,
        Model: item.Model,
        Type: item.Type,
        Price: item.Price,
        Stock: item.Stock,
        CreatedBy: item.CreatedBy,
        CreatedDate: item.CreatedDate,
        LastUpdatedBy: item.LastUpdatedBy,
        LastUpdatedDate: item.LastUpdatedDate,
        IsDeleted: item.IsDeleted,
        Language: item.Language,
        OrganizationIds: item.OrganizationIds,
      }));
      setVehicleTableData(VehicleDataMap);
      setPaginationState((prev) => ({
        ...prev,
        totalCount: data.Vehicles.totalCount ?? 0,
      }));
    }
  }, [data]);

  const handlePaginationChange = useCallback(
    (newPagination: { pageIndex: number; pageSize: number }) => {
      setPaginationState((prev) => ({
        ...prev,
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize,
      }));
    },
    []
  );

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vehicle</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Vehicle</DialogTitle>
            </DialogHeader>
            <VehicleForm
              onSuccess={handleAddSuccess}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={VehicleTableData}
        columns={columns}
        isLoading={isVehicleLoading}
        error={VehicleError instanceof Error ? VehicleError : null}
        pagination={{
          pageIndex: paginationState.pageIndex,
          pageSize: paginationState.pageSize,
          totalCount: paginationState.totalCount,
        }}
        manualPagination={true}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
}