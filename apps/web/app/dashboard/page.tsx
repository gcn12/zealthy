"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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
  const { data, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  return (
    <div className="grid h-full place-content-center">
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
                  <p className="w-[50px]">{id}</p>
                  <p className="w-[200px]">{subject}</p>
                  <p className="w-[200px]">{email}</p>
                  <p className="w-[200px]">{name}</p>
                  <p className="w-[100px]">{status}</p>
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
  );
}

const getTickets = async (): Promise<Ticket[]> => {
  const res = await fetch("http://localhost:3001");
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
