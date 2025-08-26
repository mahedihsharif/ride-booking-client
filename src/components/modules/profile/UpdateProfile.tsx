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
import { role } from "@/constants/role.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import {
  useUpdateProfileMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { profileSchema } from "@/validation/auth.validation";

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UpdateProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateProfileModal = ({
  open,
  onOpenChange,
}: UpdateProfileModalProps) => {
  const { data: me } = useUserInfoQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: me?.data?.name || "",
      phone: me?.data?.phone || "",
      role: me?.data?.role || "rider",
    },
    mode: "onTouched",
  });

  React.useEffect(() => {
    if (me?.data) {
      form.reset({
        name: me.data.name || "",
        phone: me.data.phone || "",
        role: me.data.role || "rider",
      });
    }
  }, [me?.data]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!me?.data?._id) return;
    try {
      const res = await updateProfile({
        id: me.data._id,
        userInfo: values,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update My Profile</DialogTitle>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone"
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
                name="role"
                render={({ field }) => (
                  <FormItem className="flex-1 ">
                    <FormLabel>Role</FormLabel>
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
                        <SelectItem value={role.RIDER}>{role.RIDER}</SelectItem>
                        <SelectItem value={role.DRIVER}>
                          {role.DRIVER}
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
export default UpdateProfileModal;
