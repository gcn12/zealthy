import { forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="[border:1px_solid_#C6E7E7] bg-[#FBFDFD] rounded-4px px-8px py-4px text-14px"
  />
));

export default Input;
