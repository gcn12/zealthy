import React, { Fragment } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Props {
  onChange: (status: string) => void;
  value: string;
  data: Record<string, { value: string; display: string | React.ReactNode }>;
  rounded?: boolean;
}

const Select = ({ onChange, value, data, rounded = true }: Props) => {
  return (
    <div>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={`relative flex w-full items-center justify-center gap-8px bg-white 
            [border:1px_solid_#D6D6D6] ${rounded ? "rounded-50px" : "rounded-4px"} px-12px py-4px 
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 
            focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer`}
          >
            <span className="block truncate">{data[value].display}</span>
            <span className="pointer-events-none">
              <ChevronDownIcon aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute w-full overflow-auto rounded-6px bg-white p-8px 
              [border:1px_solid_#C6E7E7] focus:outline-none"
            >
              {Object.values(data)
                .filter((item) => item.value !== value)
                .map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-4px px-12px rounded-4px ${
                        active ? "bg-[#E6F4F4]" : "text-gray-900"
                      }`
                    }
                    value={item.value}
                  >
                    {item.display}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
