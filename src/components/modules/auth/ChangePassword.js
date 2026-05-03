"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import Password from "@/components/ui/Password";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { passwordSchema } from "@/validation/auth.validation";
import { toast } from "sonner";
const ChangePasswordModal = ({ open, onOpenChange, }) => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const form = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onTouched",
    });
    const onSubmit = async (values) => {
        const userPassInfo = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        };
        try {
            const res = await changePassword(userPassInfo).unwrap();
            if (res.success) {
                toast.success(res.message);
                form.reset();
                onOpenChange(false);
            }
        }
        catch (error) {
            if (error) {
                const err = globalErrorResponse(error);
                toast.error(err?.data?.message || "Something went wrong");
            }
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "sr-only", children: "Change Password" }) }), _jsx(Form, { ...form, children: _jsxs("form", { id: "change-password-form", onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "oldPassword", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Current Password" }), _jsx(FormControl, { children: _jsx(Password, { ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "newPassword", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "New Password" }), _jsx(FormControl, { children: _jsx(Password, { ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "confirmPassword", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Confirm New Password" }), _jsx(FormControl, { children: _jsx(Password, { ...field }) }), _jsx(FormMessage, {})] })) })] }) }), _jsxs(DialogFooter, { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), className: "cursor-pointer", children: "Cancel" }), _jsx(Button, { type: "submit", form: "change-password-form", disabled: isLoading, className: "cursor-pointer", children: isLoading ? "Updating..." : "Change Password" })] })] }) }));
};
export default ChangePasswordModal;
