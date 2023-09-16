/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import { Plus } from "react-feather";

export default function ExpenseModal({ open, setOpen }: any) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
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
                    Add new Expense
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm leading-7 text-gray-500">
                      Add a new expense to the report so that you can track your
                      spending and see how it compares to your income.
                    </p>
                  </div>
                </div>
              </div>

              <form action="">
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Input label={"Name  of income"} placeholder={"enter name"} />
                  <Input
                    label={"Amount per month"}
                    placeholder={"enter amount"}
                  />
                </div>
                <div className="my-4">
                  <Select
                    options={["weekly", "monthly"]}
                    name="frequency"
                    placeholder={"Payment cycle"}
                  />
                </div>
                <div className="flex items-center font-medium rounded-md mb-4 cursor-pointer hover:bg-gray-300 gap-3 py-3 text-sm text-gray-500 bg-gray-200 justify-center">
                  <Plus size={16} />
                  <span>Add Other Expenses</span>
                </div>
              </form>
              <div className="flex items-center justify-between gap-2">
                <Button
                  onClick={() => setOpen(false)}
                  className="!text-blue-800 !w-auto !bg-gray-200"
                >
                  Cancel
                </Button>

                <Button onClick={() => setOpen(false)}>Save</Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
