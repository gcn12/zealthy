"use client";

import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Select from "@/components/Select";
import Spacer from "@/components/Spacer";
import { Ticket, serverURL, statuses } from "@/app/common";
import Input from "@/components/Input";

export default function Dashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 0);
  const status = searchParams.get("status") ?? "all";
  const searchQuery = searchParams.get("searchQuery") ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["tickets", status, page, searchQuery],
    queryFn: () => getTickets(status, page, searchQuery),
    placeholderData: keepPreviousData,
  });

  const updateSearchParams = (keyValuePairs: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const k in keyValuePairs) {
      params.set(k, keyValuePairs[k]);
    }
    router.push(pathname + "?" + params);
  };

  const updateFilterByStatus = (status: string) => {
    updateSearchParams({ page: "0", status: status });
  };

  const incrementPage = () => {
    if (data?.numTickets === undefined) {
      return;
    }
    updateSearchParams({
      page: String(
        (page + 1) * NUM_TICKETS_TO_FETCH >= data.numTickets ? page : page + 1
      ),
    });
  };

  const decrementPage = () => {
    updateSearchParams({ page: String(Math.max(0, page - 1)) });
  };

  const ticketRangeStart = page * NUM_TICKETS_TO_FETCH + 1;
  let ticketRangeEnd = null;
  let numPages = null;

  if (data?.numTickets) {
    const { numTickets } = data;
    numPages = Math.ceil(numTickets / NUM_TICKETS_TO_FETCH);
    ticketRangeEnd = Math.min(numTickets, (page + 1) * NUM_TICKETS_TO_FETCH);
  }

  return (
    <div className="h-full min-h-[700px] grid place-content-center">
      <div>
        <div className="flex items-center">
          <Input
            className="[border:1px_solid_#D6D6D6] bg-white w-[250px] placeholder:text-black"
            placeholder="Search..."
            onChange={(e) =>
              updateSearchParams({ searchQuery: e.target.value })
            }
            value={searchQuery}
          />
          <div className="ml-auto w-[130px]">
            <Select
              rounded={false}
              data={statusData}
              value={status}
              onChange={updateFilterByStatus}
            />
          </div>
        </div>
        <Spacer size={16} axis="y" />
        <div
          className="w-[1200px] max-w-[95vw] overflow-scroll bg-white [border:1px_solid_#C5CFD3] 
          rounded-6px min-h-[512px] flex flex-col justify-between"
        >
          <div className="w-full">
            <div className="flex bg-[#E9EFF0] w-[1200px] py-14px px-32px">
              <p className="min-w-[75px] font-600 text-14px">ID</p>
              <p className="min-w-[350px] font-600 text-14px">Subject</p>
              <p className="min-w-[275px] font-600 text-14px">Email</p>
              <p className="min-w-[250px] font-600 text-14px">Name</p>
              <p className="min-w-[100px] font-600 text-14px">Status</p>
              <p className="min-w-[50px] font-600 text-14px ml-auto">Date</p>
            </div>
            <div className="w-[1200px]">
              {data?.tickets.map((ticket, index) => {
                const { id, subject, email, name, status, createdAt } = ticket;
                return (
                  <Link
                    href={`/ticket/${id}?${searchParams.toString()}`}
                    key={id}
                    className=""
                  >
                    <div className="flex flex-shrink-0 px-32px py-12px hover:bg-[#FAFAFA] transition-all duration-75">
                      <p className="min-w-[75px] text-14px">
                        {String(id).padStart(2, "0")}
                      </p>
                      <p className="min-w-[350px] whitespace-nowrap text-14px font-600 text-nowrap text-ellipsis overflow-hidden">
                        {subject}
                      </p>
                      <p className="min-w-[275px] whitespace-nowrap text-14px text-nowrap text-ellipsis overflow-hidden">
                        {email}
                      </p>
                      <p className="min-w-[250px] whitespace-nowrap text-14px text-nowrap text-ellipsis overflow-hidden">
                        {name}
                      </p>
                      <p className="min-w-[100px] whitespace-nowrap text-14px">
                        {statuses[status].display}
                      </p>
                      <p className="w-[50px] whitespace-nowrap text-14px ml-auto">
                        {formatDate(createdAt)}
                      </p>
                    </div>
                    {index < data.tickets.length - 1 ? (
                      <div className="[border-bottom:1px_solid_#EAEAEA] w-[calc(100%-64px)] mx-auto" />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
          {data && data.tickets.length === 0 ? (
            <p className="m-auto">No tickets to display</p>
          ) : null}
          {isLoading ? <p className="m-auto">Loading...</p> : null}
        </div>
        {data?.numTickets ? (
          <div className="flex items-center justify-between p-16px">
            <p>
              {ticketRangeStart} to {ticketRangeEnd} of {data.numTickets}
            </p>
            <div className="flex gap-8px items-center">
              <p>
                page {page + 1} of {numPages}
              </p>
              <div>
                <button
                  onClick={decrementPage}
                  className="[border:1px_solid_#D6D6D6] bg-white border-r-0 rounded-tl-4px rounded-bl-4px p-4px"
                >
                  <ChevronLeftIcon height={22} width={22} />
                </button>
                <button
                  onClick={incrementPage}
                  className="[border:1px_solid_#D6D6D6] bg-white border-[1px] border-solid border-l-0 rounded-tr-4px rounded-br-4px p-4px"
                >
                  <ChevronRightIcon height={22} width={22} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const statusData = {
  all: {
    display: (
      <span className="flex gap-8px items-center text-14px">All statuses</span>
    ),
    value: "all",
  },
  ...statuses,
};

const getTickets = async (
  status: string,
  page: number,
  searchQuery: string
): Promise<{ tickets: Ticket[]; numTickets: number }> => {
  const res = await fetch(
    `${serverURL}/tickets?status=${status}&page=${page}&searchQuery=${searchQuery}`
  );
  if (!res.ok) {
    throw new Error("Failed to load data");
  }

  return await res.json();
};

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
};

const NUM_TICKETS_TO_FETCH = 10;
