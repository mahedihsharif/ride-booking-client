import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
export default function Password({ ...field }) {
    const id = useId();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);
    return (_jsx("div", { className: "*:not-first:mt-2", children: _jsxs("div", { className: "relative", children: [_jsx(Input, { id: id, className: "pe-9", placeholder: "******", type: isVisible ? "text" : "password", ...field }), _jsx("button", { className: "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", type: "button", onClick: toggleVisibility, "aria-label": isVisible ? "Hide password" : "Show password", "aria-pressed": isVisible, "aria-controls": "password", children: isVisible ? (_jsx(EyeOffIcon, { size: 16, "aria-hidden": "true" })) : (_jsx(EyeIcon, { size: 16, "aria-hidden": "true" })) })] }) }));
}
