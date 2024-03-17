import { forwardRef } from "react";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => (
  <textarea
    {...props}
    ref={ref}
    className="[border:1px_solid_#C6E7E7] bg-[#FBFDFD] rounded-4px px-8px py-4px min-h-[120px] text-14px"
  />
));

export default Textarea;
