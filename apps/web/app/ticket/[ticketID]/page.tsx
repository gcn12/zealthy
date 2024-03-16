"use client";

import Spacer from "@/components/Spacer";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function TicketPage() {
  const searchParams = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["ticket"],
    queryFn: () => getTicket(Number(searchParams.ticketID)),
  });

  return (
    <div className="grid h-full place-content-center">
      <div className="bg-white max-w-[580px] [border:1px_solid_#C5CFD3] rounded-12px px-48px py-48px">
        {isLoading ? <div>loading</div> : null}
        {!isLoading && data ? (
          <div>
            <div className="flex items-center gap-8px">
              <ArrowLeftIcon height={24} width={24} />
              <p>Back</p>
            </div>
            <Spacer size={48} axis="y" />
            <p className="font-600 text-20px">{data.subject}</p>
            <div className="flex gap-8px">
              <p className="font-500 text-14px">#{data.id}</p>
              <p className="text-14px">{data.createdAt}</p>
            </div>
            <Spacer size={30} axis="y" />
            <p>{data.description}</p>
            <Spacer size={30} axis="y" />
            <div className="flex gap-8px">
              <p className="font-600 text-14px">{data.name}</p>
              <p className="text-14px">{data.email}</p>
            </div>
            <Spacer size={48} axis="y" />
            <form className="flex flex-col gap-18px">
              <textarea className="[border:1px_solid_#C6E7E7] bg-[#FBFDFD] rounded-4px px-8px py-4px min-h-[100px]" />
              <button className="bg-black text-white py-8px px-16px rounded-4px font-600 text-14px w-fit">
                Send email response
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const getTicket = async (ticketID: number): Promise<Ticket> => {
  const res = await fetch(`http://localhost:3001/ticket/${ticketID}`);
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
  description: string;
};
