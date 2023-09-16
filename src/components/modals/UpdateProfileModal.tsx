/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";

export default function UpdateProfileModal({
  field: fieldToUpdate,
  open,
  options,
  close,
}: any) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (Object.keys(fieldToUpdate).length) {
      setfield(fieldToUpdate);
    }
  }, [fieldToUpdate]);

  const [field, setfield] = useState(fieldToUpdate);

  const [fieldValue, setfieldValue] = useState("");

  useEffect(() => {
    if (field.value) {
      setfieldValue(field.value);
    }
  }, [field.value]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => close()}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-0 text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-base text-blue-800 leading-6 font-semibold text-gray-8"
                  >
                    {field.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm leading-7 text-gray-500">
                      {field.desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                {field.options ? (
                  <Select
                    onChange={(e: any) => setfieldValue(e.target.value)}
                    value={fieldValue}
                    label={field?.name?.replaceAll("_", " ")}
                    placeholder={field.title}
                    options={field.options}
                  />
                ) : (
                  <Input
                    onChange={(e: any) => setfieldValue(e.target.value)}
                    value={fieldValue}
                    label={field?.name?.replaceAll("_", " ")}
                    placeholder={field.title}
                    type={field.type || "text"}
                  />
                )}
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <Button
                  onClick={() => close()}
                  className="!text-blue-800 !bg-gray-200"
                >
                  Cancel
                </Button>

                <Button
                  className="!text-white !bg-[#EEBF36]"
                  onClick={() => close()}
                >
                  Update {field?.name?.replaceAll("_", " ")}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
