"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { ArrowLeftIcon, CheckIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Spacer from "@/components/Spacer";
import Select from "@/components/Select";
import { ClosedStatus, NewStatus, OpenStatus } from "@/components/StatusIcons";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import Textarea from "@/components/Textarea";

type FormInputs = {
  response: string;
};

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
    minute: "numeric",
    hour: "numeric",
  });
};

export default function TicketPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const ticketID = Number(params.ticketID);

  const { data, isLoading } = useQuery({
    queryKey: ["ticket", ticketID],
    queryFn: () => getTicket(ticketID),
  });

  const queryClient = useQueryClient();

  const updateStatus = async ({
    status,
    id,
  }: {
    status: string;
    id: number;
  }) => {
    const res = await fetch("http://localhost:3001/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, id }),
    });
    const data = await res.json();
    return data.status;
  };

  const mutation = useMutation({
    mutationFn: updateStatus,
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ["ticket"] });
      const previousTicket = queryClient.getQueryData(["ticket"]);
      queryClient.setQueryData(["ticket"], (prev: any) => {
        return { ...prev, status: newStatus.status };
      });
      return { previousTicket };
    },
    onError: (_err, _newStatus, context) => {
      queryClient.setQueryData(["ticket"], context?.previousTicket);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket"] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormInputs>();

  const setStatus = (status: string) => {
    mutation.mutate({ status, id: ticketID });
  };

  const onSubmit: SubmitHandler<FormInputs> = async (formData, e) => {
    e?.preventDefault();
    if (!data) {
      return;
    }

    await delay(1000);

    console.log(
      `Would normally send email here with body: ${formData.response}`
    );
    reset();
  };

  return (
    <div className="grid h-full place-content-center">
      <div className="bg-white w-[650px] [border:1px_solid_#C5CFD3] rounded-12px px-48px py-48px">
        {isLoading ? <div>loading</div> : null}
        {!isLoading && data ? (
          <div>
            <div className="flex justify-between">
              <Link
                href={`/dashboard?${searchParams.toString()}`}
                className="flex items-center gap-8px"
              >
                <ArrowLeftIcon height={20} width={20} />
                <p className="text-14px">Back</p>
              </Link>
              <div className="w-[120px]">
                <Select
                  onChange={setStatus}
                  value={data.status}
                  data={statuses}
                />
              </div>
            </div>
            <Spacer size={48} axis="y" />
            <p className="font-600 text-20px">{data.subject}</p>
            <div className="flex gap-8px">
              <p className="font-500 text-14px">
                #{String(data.id).padStart(2, "0")}
              </p>
              <p className="text-14px">{formatDate(data.createdAt)}</p>
            </div>
            <Spacer size={30} axis="y" />
            <p className="whitespace-pre-wrap text-16px">{data.description}</p>
            <Spacer size={30} axis="y" />
            <div className="flex gap-8px">
              <p className="font-600 text-14px">{data.name}</p>
              <p className="text-14px">{data.email}</p>
            </div>
            <Spacer size={48} axis="y" />
            <fieldset disabled={isSubmitting}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-18px"
              >
                <label className="sr-only" htmlFor="response">
                  Send response
                </label>
                <Textarea
                  {...register("response")}
                  required
                  maxLength={1500}
                  id="response"
                />
                <div className="flex items-center gap-16px">
                  <button className="bg-black text-white py-8px px-16px rounded-4px font-600 w-fit">
                    {isSubmitting ? (
                      <div className="text-inherit flex items-center gap-8px text-14px">
                        Sending... <Spinner />
                      </div>
                    ) : (
                      <p className="text-inherit text-14px">
                        Send email response
                      </p>
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
        ) : null}
      </div>
    </div>
  );
}

export const statuses: Record<
  string,
  { value: string; display: string | ReactNode }
> = {
  new: {
    value: "new",
    display: (
      <span className="flex gap-8px items-center text-14px">
        <NewStatus /> New
      </span>
    ),
  },
  open: {
    value: "open",
    display: (
      <span className="flex gap-8px items-center text-14px">
        <OpenStatus /> Open
      </span>
    ),
  },
  closed: {
    value: "closed",
    display: (
      <span className="flex gap-8px items-center text-14px">
        <ClosedStatus /> Closed
      </span>
    ),
  },
};

const getTicket = async (ticketID: number): Promise<Ticket> => {
  const res = await fetch(`http://localhost:3001/ticket/${ticketID}`);
  const data = await res.json();

  return data;
};

const delay = async (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

type Ticket = {
  id: number;
  subject: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  description: string;
};
