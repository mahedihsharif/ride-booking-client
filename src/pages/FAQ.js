"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
export default function FAQ() {
    const [search, setSearch] = useState("");
    const faqs = [
        {
            question: "How do I book a ride?",
            answer: "Simply choose your pickup and drop-off locations, select your preferred vehicle, and confirm your booking.",
        },
        {
            question: "Can I cancel my booking?",
            answer: "Yes, you can cancel your booking anytime before the ride starts through your dashboard.",
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept credit/debit cards, mobile banking, and digital wallets.",
        },
        {
            question: "Is my personal data secure?",
            answer: "Yes, we prioritize your privacy and use industry-standard encryption to keep your data safe.",
        },
        {
            question: "Do you offer corporate packages?",
            answer: "Yes, we offer tailored corporate packages. Please contact our support team for more details.",
        },
    ];
    const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(search.toLowerCase()));
    return (_jsxs("div", { className: "max-w-3xl mx-auto p-6", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-6", children: "Frequently Asked Questions" }), _jsx("div", { className: "mb-6", children: _jsx(Input, { placeholder: "Search for a question...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full" }) }), _jsx(Card, { className: "shadow-md", children: _jsx(CardContent, { className: "p-4", children: _jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: filteredFaqs.length > 0 ? (filteredFaqs.map((faq, index) => (_jsxs(AccordionItem, { value: `item-${index}`, children: [_jsx(AccordionTrigger, { children: faq.question }), _jsx(AccordionContent, { children: faq.answer })] }, index)))) : (_jsx("p", { className: "text-muted-foreground text-center py-4", children: "No results found." })) }) }) })] }));
}
