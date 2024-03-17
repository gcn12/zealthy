"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";

import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import Textarea from "@/components/Textarea";
import { artificialDelay, serverURL } from "@/app/common";
import Button from "@/components/Button";

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
    await artificialDelay(() => sendRequest(formData));
    reset();
  };

  const sendRequest = async (formData: Record<string, string>) => {
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
    <div className="grid h-full min-h-[700px] place-items-center">
      <div className="bg-white [border:1px_solid_#C6E7E7] max-w-[95vw] w-[550px] rounded-14px py-56px px-48px">
        <h1 className="font-600 text-24px">Contact support</h1>
        <Spacer size={4} axis="y" />
        <p>We'll get back to you within 24 hours.</p>
        <Spacer size={36} axis="y" />
        <fieldset disabled={isSubmitting}>
          <form
            className="flex gap-24px flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex justify-between flex-col sm:flex-row gap-24px">
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
            <div className="flex items-center gap-16px">
              <Button isSubmitting={isSubmitting} submittingText="Sending...">
                Send help request
              </Button>
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
