// "use client";

// import Link from "next/link";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import Select from "@/components/Select";
// import Spacer from "@/components/Spacer";
// import { statuses } from "../common";

// const formatDate = (date: string | Date) => {
//   return new Date(date).toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//   });
// };

// const NUM_TICKETS_TO_FETCH = 10;

// export default function Dashboard() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const page = Number(searchParams.get("page")) ?? 0;
//   const status = searchParams.get("status") ?? "all";

//   const { data, isLoading } = useQuery({
//     queryKey: ["tickets", status, page],
//     queryFn: () => getTickets(status, page),
//     placeholderData: keepPreviousData,
//   });

//   const updateSearchParams = (keyValuePairs: Record<string, string>) => {
//     const params = new URLSearchParams(searchParams.toString());
//     for (const k in keyValuePairs) {
//       params.set(k, keyValuePairs[k]);
//     }
//     router.push(pathname + "?" + params);
//   };

//   const updateFilterByStatus = (status: string) => {
//     updateSearchParams({ page: "0", status: status });
//   };

//   const incrementPage = () => {
//     updateSearchParams({
//       page: String(
//         (page + 1) * NUM_TICKETS_TO_FETCH >= (data?.numTickets ?? 0)
//           ? page
//           : page + 1
//       ),
//     });
//   };

//   const decrementPage = () => {
//     updateSearchParams({ page: String(Math.max(0, page - 1)) });
//   };

//   return (
//     <div className="grid h-full place-content-center">
//       <div className="w-[1200px] text-14px overflow-scroll">
//         <div className="ml-auto max-w-[130px]">
//           <Select
//             rounded={false}
//             data={statusData}
//             value={status}
//             onChange={updateFilterByStatus}
//           />
//         </div>
//         <Spacer size={16} axis="y" />
//         <div className="bg-white [border:1px_solid_#C5CFD3] rounded-6px min-h-[512px] flex flex-col justify-between">
//           <div>
//             <div className="grid grid-flow-col bg-[#E9EFF0] py-14px px-32px">
//               <p className="w-[75px] font-600 text-14px">ID</p>
//               <p className="w-[300px] font-600 text-14px">Subject</p>
//               <p className="w-[200px] font-600 text-14px justify-self-end">
//                 Email
//               </p>
//               <p className="w-[160px] font-600 text-14px justify-self-end">
//                 Name
//               </p>
//               <p className="w-[100px] font-600 text-14px justify-self-end">
//                 Status
//               </p>
//               <p className="w-[50px] font-600 text-14px justify-self-end">
//                 Date
//               </p>
//             </div>
//             <div id="test">
//               {!isLoading &&
//                 data?.tickets.map((item, index) => {
//                   const { id, subject, email, name, status, createdAt } = item;
//                   return (
//                     <Link
//                       href={`/ticket/${id}?${searchParams.toString()}`}
//                       key={id}
//                     >
//                       <div className="grid grid-flow-col px-32px py-12px">
//                         <p className="w-[75px] text-14px">
//                           {String(id).padStart(2, "0")}
//                         </p>
//                         <p className="w-[300px] text-14px font-600 text-nowrap text-ellipsis overflow-hidden">
//                           {subject}
//                         </p>
//                         <p className="w-[200px] text-14px justify-self-end">
//                           {email}
//                         </p>
//                         <p className="w-[160px] text-14px justify-self-end">
//                           {name}
//                         </p>
//                         <p className="w-[100px] text-14px justify-self-end">
//                           {statuses[status].display}
//                         </p>
//                         <p className="w-[50px] text-14px justify-self-end">
//                           {formatDate(createdAt)}
//                         </p>
//                       </div>
//                       {index < data.tickets.length - 1 ? (
//                         <div className="[border-bottom:1px_solid_#EAEAEA] w-[calc(100%-64px)] mx-auto" />
//                       ) : null}
//                     </Link>
//                   );
//                 })}
//             </div>
//           </div>
//           {data && data.tickets.length === 0 ? (
//             <p className="m-auto">No tickets to display</p>
//           ) : null}
//           {isLoading ? <p className="m-auto">Loading...</p> : null}
//         </div>
//         <div className="flex items-center justify-between px-16px py-16px">
//           {data?.numTickets ? (
//             <p>
//               {page * NUM_TICKETS_TO_FETCH + 1} to{" "}
//               {Math.min(data.numTickets, (page + 1) * NUM_TICKETS_TO_FETCH)} of{" "}
//               {data.numTickets}
//             </p>
//           ) : null}
//           <div className="flex gap-8px">
//             {data?.numTickets ? (
//               <p>
//                 page {page + 1} of{" "}
//                 {Math.ceil(data.numTickets / NUM_TICKETS_TO_FETCH)}
//               </p>
//             ) : null}
//             {data && data?.numTickets > 0 ? (
//               <div>
//                 <button
//                   onClick={decrementPage}
//                   className="[border:1px_solid_#8C8C8C] border-r-0 rounded-tl-4px rounded-bl-4px"
//                 >
//                   <ChevronLeftIcon height={24} width={24} />
//                 </button>
//                 <button
//                   onClick={incrementPage}
//                   className="border-[#8C8C8C] border-[1px] border-solid border-l-0 rounded-tr-4px rounded-br-4px"
//                 >
//                   <ChevronRightIcon height={24} width={24} />
//                 </button>
//               </div>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const statusData = {
//   all: {
//     display: (
//       <span className="flex gap-8px items-center text-14px">All statuses</span>
//     ),
//     value: "all",
//   },
//   ...statuses,
// };

// const getTickets = async (
//   status: string,
//   page: number
// ): Promise<{ tickets: Ticket[]; numTickets: number }> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/tickets?status=${status}&page=${page}`
//   );
//   const data = await res.json();

//   return data;
// };

// type Ticket = {
//   id: number;
//   subject: string;
//   name: string;
//   email: string;
//   status: string;
//   createdAt: string;
// };

export default function Dashboard() {
  return <div>working?</div>;
}
