"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function FAQ() {
  const [search, setSearch] = useState("");

  const faqs = [
    {
      question: "How do I book a ride?",
      answer:
        "Simply choose your pickup and drop-off locations, select your preferred vehicle, and confirm your booking.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking anytime before the ride starts through your dashboard.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, mobile banking, and digital wallets.",
    },
    {
      question: "Is my personal data secure?",
      answer:
        "Yes, we prioritize your privacy and use industry-standard encryption to keep your data safe.",
    },
    {
      question: "Do you offer corporate packages?",
      answer:
        "Yes, we offer tailored corporate packages. Please contact our support team for more details.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h1>

      <div className="mb-6">
        <Input
          placeholder="Search for a question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      <Card className="shadow-md">
        <CardContent className="p-4">
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No results found.
              </p>
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
