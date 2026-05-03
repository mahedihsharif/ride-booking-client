"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import config from "@/config";
import { contactFormSchema } from "@/validation/contactForm.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "emailjs-com";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export default function Contact() {
    const form = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });
    const onSubmit = async (values) => {
        try {
            // EmailJS config
            await emailjs.send(config.emailJs.SERVICE_ID, // service id
            config.emailJs.TEMPLATE_ID, // template id
            {
                from_name: values.name,
                from_email: values.email,
                subject: values.subject,
                message: values.message,
            }, config.emailJs.PUBLIC_KEY // public key
            );
            toast.success("Message sent!");
            form.reset();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (error) {
            toast.error("Failed to send");
        }
    };
    return (_jsx("section", { className: "py-20 bg-gray-50 dark:bg-[#09090b]", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4", children: [_jsx("h2", { className: "text-3xl md:text-5xl font-bold mb-6 text-orange-500 dark:text-white text-center", children: "Contact Us" }), _jsx("p", { className: "text-lg mb-10 text-gray-700 dark:text-gray-300 text-center", children: "Have questions? Fill out the form and we\u2019ll get back to you." }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "dark:text-white", children: "Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Your name", ...field, className: "dark:bg-gray-700 dark:text-white" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "dark:text-white", children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "you@example.com", ...field, className: "dark:bg-gray-700 dark:text-white" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "subject", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "dark:text-white", children: "Subject" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Subject", ...field, className: "dark:bg-gray-700 dark:text-white" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "message", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "dark:text-white", children: "Message" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Your message...", className: "min-h-[120px] dark:bg-gray-700 dark:text-white", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", size: "lg", className: "w-full rounded-2xl", children: "Send Message" })] }) })] }) }));
}
