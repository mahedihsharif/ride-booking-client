/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { vehicle } from "@/constants/vehicle.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { useDriverInfoQuery, useVehicleUpdateMutation, } from "@/redux/features/auth/driver.api";
import { vehicleSchema } from "@/validation/vehicle.validation";
const UpdateVehicleModal = ({ open, onOpenChange, }) => {
    const { data: driverData } = useDriverInfoQuery(undefined);
    const [updateVehicle, isLoading] = useVehicleUpdateMutation();
    const form = useForm({
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
    const onSubmit = async (values) => {
        try {
            const res = await updateVehicle({
                vehicleInfo: values,
            }).unwrap();
            if (res.success) {
                toast.success(res.message);
                onOpenChange(false);
            }
        }
        catch (error) {
            if (error) {
                const err = globalErrorResponse(error);
                toast.error(err?.data?.message);
            }
        }
    };
    if (isLoading) {
        _jsx(Skeleton, { className: "h-[20px] w-[100px] rounded-full" });
    }
    return (_jsxs(Dialog, { open: open, onOpenChange: onOpenChange, children: [_jsx(DialogTrigger, { asChild: true }), _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Update Vehicle Information" }), _jsx(DialogDescription, { className: "sr-only", children: "Make changes to your profile here. Click save when you're done." })] }), _jsx("div", { className: "grid gap-4", children: _jsx(Form, { ...form, children: _jsxs("form", { id: "update-profile", onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsx(FormField, { control: form.control, name: "type", render: ({ field }) => (_jsxs(FormItem, { className: "flex-1 ", children: [_jsx(FormLabel, { children: "Vehicle Type" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select a Vehicle" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: vehicle.BIKE, children: vehicle.BIKE }), _jsx(SelectItem, { value: vehicle.CAR, children: vehicle.CAR }), _jsx(SelectItem, { value: vehicle.CNG, children: vehicle.CNG })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "model", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Vehicle Model" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Model", ...field, value: field.value || "" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "licensePlate", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "License Plate" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "license-plate", ...field, value: field.value || "" }) }), _jsx(FormMessage, {})] })) })] }) }) }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", className: "cursor-pointer", children: "Cancel" }) }), _jsx(Button, { type: "submit", className: "cursor-pointer", form: "update-profile", children: "Confirm" })] })] })] }));
};
export default UpdateVehicleModal;
