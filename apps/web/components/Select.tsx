import React, { Fragment } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Props {
  onChange: (status: string) => void;
  value: string;
  data: Record<string, { value: string; display: string | React.ReactNode }>;
}

const Select = ({ onChange, value, data }: Props) => (
  <div>
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative  flex items-center justify-center gap-20px cursor-default rounded-lg bg-white [border:1px_solid_#D6D6D6] rounded-50px px-12px py-8px  focus:outline-none focus-visible:black focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
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
          <Listbox.Options className="absolute w-full overflow-auto rounded-12px bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {Object.values(data).map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={item.value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.display}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
);

export default Select;
