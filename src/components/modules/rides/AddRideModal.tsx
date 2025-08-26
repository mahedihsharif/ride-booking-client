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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { payment } from "@/constants/payment.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useRidesMutation } from "@/redux/features/rides/ride.api";
import { rideSchema } from "@/validation/rides.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";
interface IProps {
  context: string;
}

export function AddRideModal({ context }: IProps) {
  const navigate = useNavigate();
  const { data: userData, isLoading } = useUserInfoQuery(undefined);
  const [open, isOpen] = useState(false);
  const [rides] = useRidesMutation();
  const form = useForm<z.infer<typeof rideSchema>>({
    resolver: zodResolver(rideSchema),
    defaultValues: {
      pickupLocation: {
        address: "",
      },
      destinationLocation: {
        address: "",
      },
      paymentMethod: "CASH",
    },
  });
  const onSubmit = async (data: z.infer<typeof rideSchema>) => {
    if (isLoading) {
      <Skeleton className="h-[20px] w-[100px] rounded-full" />;
    }
    if (!isLoading && !userData?.data?.email) {
      navigate("/login");
      return;
    }
    try {
      const res = await rides(data).unwrap();

      if (res.success) {
        isOpen(!open);
        navigate(`/ride-status/${res?.data?._id}`);
      }
    } catch (error) {
      if (error) {
        const err = globalErrorResponse(error);
        toast.error(err?.data.message);
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogTrigger asChild>
        <span>{context}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request a Ride</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Form {...form}>
            <form
              id="request"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="pickupLocation.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="from location"
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
                name="destinationLocation.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="to location"
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
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="flex-1 ">
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={payment.CASH}>
                          {payment.CASH}
                        </SelectItem>
                        <SelectItem value={payment.BKASH}>
                          {payment.BKASH}
                        </SelectItem>
                        <SelectItem value={payment.NAGAD}>
                          {payment.NAGAD}
                        </SelectItem>
                      </SelectContent>
                    </Select>

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
          <Button type="submit" className="cursor-pointer" form="request">
            Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
