"use client";

import { useState } from "react";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { statuses } from "../ticket/[ticketID]/page";
import Select from "@/components/Select";
import Spacer from "@/components/Spacer";

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
    minute: "numeric",
    hour: "numeric",
  });
};

export default function Dashboard() {
  const [status, setStatus] = useState("all");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) ?? 0;

  const { data, isLoading } = useQuery({
    queryKey: ["tickets", status, page],
    queryFn: () => getTickets(status, page),
    placeholderData: keepPreviousData,
  });

  const updateSearchParams = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, value);
    router.push(pathname + "?" + params);
  };

  const updateFilterByStatus = (status: string) => {
    updateSearchParams("page", "0");
    setStatus(status);
  };

  const incrementPage = () => {
    updateSearchParams(
      "page",
      String((page + 1) * 5 >= (data?.numTickets ?? 0) ? page : page + 1)
    );
  };

  const decrementPage = () => {
    updateSearchParams("page", String(Math.max(0, page - 1)));
  };

  return (
    <div className="grid h-full place-content-center">
      <div className="w-full">
        <div className="ml-auto">
          <Select
            rounded={false}
            data={statusData}
            value={status}
            onChange={updateFilterByStatus}
          />
        </div>
        <Spacer size={16} axis="y" />
        <div className="bg-white [border:1px_solid_#C5CFD3] rounded-6px min-h-[500px]">
          <div className="flex bg-[#E9EFF0] py-14px px-16px">
            <p className="w-[50px]">ID</p>
            <p className="w-[200px]">Subject</p>
            <p className="w-[200px]">Email</p>
            <p className="w-[200px]">Name</p>
            <p className="w-[100px]">Status</p>
            <p className="w-[250px]">Date</p>
          </div>
          {!isLoading &&
            data?.tickets.map((item, index) => {
              const { id, subject, email, name, status, createdAt } = item;
              return (
                <Link href={`/ticket/${id}`} key={id}>
                  <div className="flex px-16px py-12px">
                    <p className="w-[50px]">{String(id).padStart(2, "0")}</p>
                    <p className="w-[200px] font-600">{subject}</p>
                    <p className="w-[200px]">{email}</p>
                    <p className="w-[200px]">{name}</p>
                    <p className="w-[100px]">{statuses[status].display}</p>
                    <p className="w-[250px]">{formatDate(createdAt)}</p>
                  </div>
                  {index < data.tickets.length - 1 ? (
                    <div className="[border-bottom:1px_solid_#EAEAEA]" />
                  ) : null}
                </Link>
              );
            })}
        </div>
        <div className="flex items-center justify-between">
          {data?.numTickets ? (
            <p>
              {page * 5 + 1} to {Math.min(data.numTickets, (page + 1) * 5)} of{" "}
              {data.numTickets}
            </p>
          ) : null}
          <div className="flex">
            {data?.numTickets ? (
              <p>
                page {page + 1} of {Math.ceil(data.numTickets / 5)}
              </p>
            ) : null}
            {data && data?.numTickets > 0 ? (
              <div>
                <button
                  onClick={decrementPage}
                  className="[border:1px_solid_#8C8C8C]"
                >
                  <ChevronLeftIcon height={24} width={24} />
                </button>
                <button
                  onClick={incrementPage}
                  className="[border:1px_solid_#8C8C8C]"
                >
                  <ChevronRightIcon height={24} width={24} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const statusData = {
  all: {
    display: "All statuses",
    value: "all",
  },
  new: {
    display: "New",
    value: "new",
  },
  open: {
    display: "Open",
    value: "open",
  },
  closed: {
    display: "Closed",
    value: "closed",
  },
};

const getTickets = async (
  status: string,
  page: number
): Promise<{ tickets: Ticket[]; numTickets: number }> => {
  const res = await fetch(
    `http://localhost:3001/tickets?status=${status}&page=${page}`
  );
  const data = await res.json();

  return data;
};

type Ticket = {
  id: number;
  subject: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
};
