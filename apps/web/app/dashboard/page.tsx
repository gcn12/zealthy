"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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
            return (
              <Link href={`/ticket/${item.id}`} key={item.id}>
                <div className="flex px-16px py-12px">
                  <p className="w-[50px]">{item.id}</p>
                  <p className="w-[200px]">{item.subject}</p>
                  <p className="w-[200px]">{item.email}</p>
                  <p className="w-[200px]">{item.name}</p>
                  <p className="w-[100px]">{item.status}</p>
                  <p className="w-[250px]">{item.createdAt}</p>
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
