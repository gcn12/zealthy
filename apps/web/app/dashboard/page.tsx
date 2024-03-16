"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { statuses } from "../ticket/[ticketID]/page";
import Select from "@/components/Select";
import { useState } from "react";

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

  const { data, isLoading } = useQuery({
    queryKey: ["tickets", status],
    queryFn: () => getTickets(status),
  });

  const updateFilterByStatus = (status: string) => {
    setStatus(status);
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
        <div className="bg-white [border:1px_solid_#C5CFD3] rounded-6px">
          <div className="flex bg-[#E9EFF0] py-14px px-16px">
            <p className="w-[50px]">ID</p>
            <p className="w-[200px]">Subject</p>
            <p className="w-[200px]">Email</p>
            <p className="w-[200px]">Name</p>
            <p className="w-[100px]">Status</p>
            <p className="w-[250px]">Date</p>
          </div>
          {!isLoading &&
            data?.map((item, index) => {
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
                  {index < data.length - 1 ? (
                    <div className="[border-bottom:1px_solid_#EAEAEA]" />
                  ) : null}
                </Link>
              );
            })}
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

const getTickets = async (status: string): Promise<Ticket[]> => {
  const res = await fetch(`http://localhost:3001/tickets?status=${status}`);
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
