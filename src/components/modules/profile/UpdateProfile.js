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
import { role } from "@/constants/role.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { useUpdateProfileMutation, useUserInfoQuery, } from "@/redux/features/auth/auth.api";
import { profileSchema } from "@/validation/auth.validation";
const UpdateProfileModal = ({ open, onOpenChange, }) => {
    const { data: me } = useUserInfoQuery(undefined);
    const [updateProfile] = useUpdateProfileMutation();
    const form = useForm({
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
    const onSubmit = async (values) => {
        if (!me?.data?._id)
            return;
        try {
            const res = await updateProfile({
                id: me.data._id,
                userInfo: values,
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
    return (_jsxs(Dialog, { open: open, onOpenChange: onOpenChange, children: [_jsx(DialogTrigger, { asChild: true }), _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Update My Profile" }), _jsx(DialogDescription, { className: "sr-only", children: "Make changes to your profile here. Click save when you're done." })] }), _jsx("div", { className: "grid gap-4", children: _jsx(Form, { ...form, children: _jsxs("form", { id: "update-profile", onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Name", ...field, value: field.value || "" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "phone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone Number" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Phone", ...field, value: field.value || "" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "role", render: ({ field }) => (_jsxs(FormItem, { className: "flex-1 ", children: [_jsx(FormLabel, { children: "Role" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select a Role" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: role.RIDER, children: role.RIDER }), _jsx(SelectItem, { value: role.DRIVER, children: role.DRIVER })] })] }), _jsx(FormMessage, {})] })) })] }) }) }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", className: "cursor-pointer", children: "Cancel" }) }), _jsx(Button, { type: "submit", className: "cursor-pointer", form: "update-profile", children: "Confirm" })] })] })] }));
};
export default UpdateProfileModal;
