"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { addUser } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import React from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  role: z.string({
    required_error: "Please select a role.",
  }),
  phone: z.string({
    required_error: "Please enter a phone number.",
  }),
  mentor: z.boolean().optional(),
  organisation: z.string({
    required_error: "Please enter an organisation.",
  }),
  industry: z.string({
    required_error: "Please select an industry.",
  }),
  proficiency: z.string({
    required_error: "Please select a proficiency level.",
  }),
});

export default function Page() {
  const { data: session, status } = useSession();
  // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mentor: false,
    },
  });

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    if (session) {
      if (values.mentor) {
        const data = {
          name: session?.user?.name as string,
          email: session?.user?.email as string,
          image: session?.user?.image as string,
          phone: values.phone,
          role: values.role,
          isMentor: values.mentor,
          isAssigned: false,
          mentees: [],
          organisation: values.organisation,
          industry: values.industry,
          proficiency: values.proficiency,
        };
        const res = await addUser(data).then((res) => {
          setLoading(false);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        });
      } else {
        const data = {
          name: session?.user?.name as string,
          email: session?.user?.email as string,
          image: session?.user?.image as string,
          phone: values.phone,
          role: values.role,
          isMentor: values.mentor,
          mentor: "",
          organisation: values.organisation,
          industry: values.industry,
          proficiency: values.proficiency,
        };
        const res = await addUser(data).then((res) => {
          setLoading(false);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        });
      }
    }
  }

  return (
    <Form {...form}>
      <div className="h-screen flex flex-col p-8 justify-center items-center space-y-3 max-w-xl mx-auto ">
        <h1 className="text-center text-2xl font-bold md:text-4xl">SIGN UP</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="organisation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your organisation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Food Industry">Food Industry</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Financial services">
                      Financial services
                    </SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="Computers and information technology">
                      Computers and information technology
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SDE">SDE</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proficiency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proficiency Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mentor"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Are you interested in being a mentor for other students?
                  </FormLabel>
                  <FormDescription>
                    If you are interested in being a mentor, check this box and
                    we'll reach out to you with more information.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : null}
            Submit
          </Button>
        </form>
      </div>
      <Toaster />
    </Form>
  );
}
