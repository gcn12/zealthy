"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";

import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import Spinner from "@/components/Spinner";
import Textarea from "@/components/Textarea";
import { serverURL } from "./common";

const delay = async (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

const promiseDelay = async (
  asyncFunction: (...params: any) => Promise<any>
) => {
  const [result] = await Promise.all([asyncFunction(), delay(1000)]);
  return result;
};

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
    reset,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (formData, e) => {
    e?.preventDefault();
    await promiseDelay(() => sendRequest(formData));
    reset();
  };
  const sendRequest = async (formData: Record<string, any>) => {
    const res = await fetch(`${serverURL}/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    await res.json();
  };

  return (
    <div className="grid h-full place-items-center">
      <div className="bg-white [border:1px_solid_#C6E7E7] min-w-[550px] rounded-14px py-56px px-48px">
        <h1 className="font-600 text-24px">Contact support</h1>
        <Spacer size={4} axis="y" />
        <p>We'll get back to you within 24 hours.</p>
        <Spacer size={36} axis="y" />
        <fieldset disabled={isSubmitting}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between">
              <div className="flex flex-col gap-4px w-full">
                <label className="font-600 text-14px" htmlFor="name">
                  Name
                </label>
                <Input
                  required
                  maxLength={300}
                  {...register("name")}
                  id="name"
                />
              </div>
              <Spacer size={24} axis="x" />
              <div className="flex flex-col gap-4px w-full">
                <label className="font-600 text-14px" htmlFor="email">
                  Email
                </label>
                <Input
                  type="email"
                  required
                  maxLength={300}
                  {...register("email")}
                  id="email"
                />
              </div>
            </div>
            <Spacer size={24} axis="y" />
            <div className="flex flex-col gap-4px">
              <label className="font-600 text-14px" htmlFor="subject">
                Subject
              </label>
              <Input
                required
                maxLength={300}
                {...register("subject")}
                id="subject"
              />
            </div>
            <Spacer size={24} axis="y" />
            <div className="flex flex-col gap-4px">
              <label className="font-600 text-14px" htmlFor="description">
                Description of issue
              </label>
              <Textarea
                required
                maxLength={1000}
                {...register("description")}
                id="description"
              />
            </div>
            <Spacer size={32} axis="y" />
            <div className="flex items-center gap-16px">
              <button className="bg-black text-white py-8px px-16px rounded-4px font-600">
                {isSubmitting ? (
                  <div className="text-inherit flex items-center gap-8px text-14px">
                    Sending... <Spinner />
                  </div>
                ) : (
                  <p className="text-inherit text-14px">Send help request</p>
                )}
              </button>
              {isSubmitSuccessful ? (
                <div className="flex items-center gap-4px">
                  <CheckIcon height={20} width={20} />
                  <p>Sent successfully</p>
                </div>
              ) : null}
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
}
