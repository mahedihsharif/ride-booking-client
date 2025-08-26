/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { vehicle } from "@/constants/vehicle.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import {
  useDriverInfoQuery,
  useVehicleUpdateMutation,
} from "@/redux/features/auth/driver.api";
import { vehicleSchema } from "@/validation/vehicle.validation";

type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface UpdateVehicleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateVehicleModal = ({
  open,
  onOpenChange,
}: UpdateVehicleModalProps) => {
  const { data: driverData } = useDriverInfoQuery(undefined);
  const [updateVehicle, isLoading] = useVehicleUpdateMutation();

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      type: driverData?.data?.vehicle?.type || "",
      model: driverData?.data?.vehicle?.model || "",
      licensePlate: driverData?.data?.vehicle?.licensePlate || "",
    },
    mode: "onTouched",
  });

  React.useEffect(() => {
    if (driverData?.data?.vehicle) {
      form.reset({
        type: driverData?.data?.vehicle?.type || "",
        model: driverData?.data?.vehicle?.model || "",
        licensePlate: driverData?.data?.vehicle?.licensePlate || "",
      });
    }
  }, [driverData?.data?.vehicle]);

  const onSubmit = async (values: VehicleFormValues) => {
    try {
      const res = await updateVehicle({
        vehicleInfo: values,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        onOpenChange(false);
      }
    } catch (error) {
      if (error) {
        const err = globalErrorResponse(error);
        toast.error(err?.data?.message);
      }
    }
  };
  if (isLoading) {
    <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Vehicle Information</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Form {...form}>
            <form
              id="update-profile"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex-1 ">
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Vehicle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={vehicle.BIKE}>
                          {vehicle.BIKE}
                        </SelectItem>
                        <SelectItem value={vehicle.CAR}>
                          {vehicle.CAR}
                        </SelectItem>
                        <SelectItem value={vehicle.CNG}>
                          {vehicle.CNG}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Model"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Plate</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="license-plate"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="cursor-pointer"
            form="update-profile"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateVehicleModal;
