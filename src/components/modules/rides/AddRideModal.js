import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
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
export function AddRideModal({ context, className, size }) {
    const navigate = useNavigate();
    const { data: userData, isLoading } = useUserInfoQuery(undefined);
    const [open, isOpen] = useState(false);
    const [rides] = useRidesMutation();
    const form = useForm({
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
    const onSubmit = async (data) => {
        if (isLoading) {
            _jsx(Skeleton, { className: "h-[20px] w-[100px] rounded-full" });
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
        }
        catch (error) {
            if (error) {
                const err = globalErrorResponse(error);
                toast.error(err?.data.message);
            }
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: isOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { className: className, size: size, children: context }) }), _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Request a Ride" }), _jsx(DialogDescription, { className: "sr-only", children: "Make changes to your profile here. Click save when you're done." })] }), _jsx("div", { className: "grid gap-4", children: _jsx(Form, { ...form, children: _jsxs("form", { id: "request", onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsx(FormField, { control: form.control, name: "pickupLocation.address", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Pickup Location" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "from location", ...field, value: field.value || "" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "destinationLocation.address", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Destination Location" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "to location", ...field, value: field.value || "" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "paymentMethod", render: ({ field }) => (_jsxs(FormItem, { className: "flex-1 ", children: [_jsx(FormLabel, { children: "Payment Method" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select a Role" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: payment.CASH, children: payment.CASH }), _jsx(SelectItem, { value: payment.BKASH, children: payment.BKASH }), _jsx(SelectItem, { value: payment.NAGAD, children: payment.NAGAD })] })] }), _jsx(FormMessage, {})] })) })] }) }) }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", className: "cursor-pointer", children: "Cancel" }) }), _jsx(Button, { type: "submit", className: "cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-bold", form: "request", children: "Request Now" })] })] })] }));
}
