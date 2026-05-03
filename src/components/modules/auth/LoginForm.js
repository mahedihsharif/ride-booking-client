import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { activeUser } from "@/constants/admin.constant";
import { globalErrorResponse } from "@/helpers/globalErrorHandler";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/reducer/authSlice";
import { loginSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
export function LoginForm({ className, ...props }) {
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data) => {
        try {
            const res = await login(data).unwrap();
            if (res.success) {
                if (res.data.user.isActive === activeUser.BLOCKED) {
                    navigate("/user/blocked");
                    return;
                }
                else {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    dispatch(setUser({
                        id: res.data.user._id,
                        name: res.data.user.name,
                        email: res.data.user.email,
                        isActive: res.data.user.isActive,
                        token: res.data.accessToken,
                    }));
                    navigate("/");
                }
            }
        }
        catch (error) {
            if (error) {
                const err = globalErrorResponse(error);
                toast.error(err?.data.message);
            }
        }
    };
    return (_jsxs("div", { className: cn("flex flex-col gap-6", className), ...props, children: [_jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Login to your account" }), _jsx("p", { className: "text-balance text-sm text-muted-foreground", children: "Enter your email below to login to your account" })] }), _jsx("div", { className: "grid gap-6", children: _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "john@example.com", ...field, value: field.value || "" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Password, { ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", className: "w-full cursor-pointer", children: "Login" })] }) }) }), _jsxs("div", { className: "text-center text-sm", children: ["Don't have an account?", " ", _jsx(Link, { to: "/register", replace: true, className: "underline underline-offset-4", children: "Register" })] })] }));
}
