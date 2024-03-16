"use client";

import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import Textarea from "@/components/Textarea";
import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  description: string;
};

export default function ContactSupport() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (formData, e) => {
    e?.preventDefault();
    const res = await fetch("http://localhost:3001/ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
  };

  return (
    <div className="grid h-full place-items-center">
      <div className="bg-white  [border:1px_solid_#C6E7E7] rounded-14px py-40px px-48px">
        <h1 className="font-600 text-24px">Contact support</h1>
        <Spacer size={4} axis="y" />
        <p>We'll get back to you within 24 hours.</p>
        <Spacer size={36} axis="y" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4px">
              <label className="font-600 text-14px" htmlFor="name">
                Name
              </label>
              <Input {...register("name")} id="name" />
            </div>
            <Spacer size={24} axis="x" />
            <div className="flex flex-col gap-4px">
              <label className="font-600 text-14px" htmlFor="email">
                Email
              </label>
              <Input {...register("email")} id="email" />
            </div>
          </div>
          <Spacer size={16} axis="y" />
          <div className="flex flex-col gap-4px">
            <label className="font-600 text-14px" htmlFor="subject">
              Subject
            </label>
            <Input {...register("subject")} id="subject" />
          </div>
          <Spacer size={16} axis="y" />
          <div className="flex flex-col gap-4px">
            <label className="font-600 text-14px" htmlFor="description">
              Description of issue
            </label>
            <Textarea {...register("description")} id="description" />
          </div>
          <Spacer size={32} axis="y" />
          <button className="bg-black text-white py-8px px-16px rounded-4px font-600 text-14px">
            Send help request
          </button>
        </form>
      </div>
    </div>
  );
}
