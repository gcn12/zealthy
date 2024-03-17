import { ClosedStatus, NewStatus, OpenStatus } from "@/components/StatusIcons";
import { ReactNode } from "react";

export const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

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
