"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import config from "@/config";

import { contactFormSchema } from "@/validation/contactForm.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "emailjs-com";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

export default function Contact() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      // EmailJS config
      await emailjs.send(
        config.emailJs.SERVICE_ID!, // service id
        config.emailJs.TEMPLATE_ID!, // template id
        {
          from_name: values.name,
          from_email: values.email,
          subject: values.subject,
          message: values.message,
        },
        config.emailJs.PUBLIC_KEY! // public key
      );
      toast.success("Message sent!");

      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to send");
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#09090b]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-orange-500 dark:text-white text-center">
          Contact Us
        </h2>
        <p className="text-lg mb-10 text-gray-700 dark:text-gray-300 text-center">
          Have questions? Fill out the form and we’ll get back to you.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      className="dark:bg-gray-700 dark:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      className="dark:bg-gray-700 dark:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white">Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Subject"
                      {...field}
                      className="dark:bg-gray-700 dark:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your message..."
                      className="min-h-[120px] dark:bg-gray-700 dark:text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="w-full rounded-2xl">
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
