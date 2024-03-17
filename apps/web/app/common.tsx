import { ReactNode } from "react";

import { ClosedStatus, NewStatus, OpenStatus } from "@/components/StatusIcons";

export const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

export const delay = async (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

export const artificialDelay = async (
  asyncFunction: (...params: any) => Promise<any>
) => {
  const [result] = await Promise.all([asyncFunction(), delay(1000)]);
  return result;
};

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

export type Ticket = {
  id: number;
  subject: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  description: string;
};
