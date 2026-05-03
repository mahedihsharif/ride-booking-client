import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { role } from "@/constants/role.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { registerSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
export function RegisterForm({ className, ...props }) {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            role: "",
        },
    });
    const onSubmit = async (data) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            role: data.role,
        };
        try {
            const res = await register(userInfo).unwrap();
            if (res.success) {
                toast.success(res.message);
                navigate("/login");
            }
        }
        catch (error) {
            if (error) {
                const err = globalErrorResponse(error);
                toast.error(err && err.data.message);
            }
        }
    };
    return (_jsxs("div", { className: cn("flex flex-col gap-6", className), ...props, children: [_jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Register your account" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Enter your details to create an account" })] }), _jsx("div", { className: "grid gap-6", children: _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "John Doe", ...field }) }), _jsx(FormDescription, { className: "sr-only", children: "This is your public display name." }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "john.doe@company.com", type: "email", ...field }) }), _jsx(FormDescription, { className: "sr-only", children: "This is your public display name." }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "phone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone Number" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "+88 or 01XXXXXXXXX", type: "number", ...field }) }), _jsx(FormDescription, { className: "sr-only", children: "This is your public display name." }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "role", render: ({ field }) => (_jsxs(FormItem, { className: "flex-1 ", children: [_jsx(FormLabel, { children: "Role" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select a Role" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: role.RIDER, children: role.RIDER }), _jsx(SelectItem, { value: role.DRIVER, children: role.DRIVER })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Password, { ...field }) }), _jsx(FormDescription, { className: "sr-only", children: "This is your public display name." }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "confirmPassword", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Confirm Password" }), _jsx(FormControl, { children: _jsx(Password, { ...field }) }), _jsx(FormDescription, { className: "sr-only", children: "This is your public display name." }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", className: "w-full cursor-pointer", children: "Submit" })] }) }) }), _jsxs("div", { className: "text-center text-sm", children: ["Already have an account?", " ", _jsx(Link, { to: "/login", className: "underline underline-offset-4", children: "Login" })] })] }));
}
