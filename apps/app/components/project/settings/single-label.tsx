import React, { useState } from "react";

// react-hook-form
import { Controller, useForm } from "react-hook-form";
// react-color
import { TwitterPicker } from "react-color";
// headless ui
import { Popover, Transition } from "@headlessui/react";
// ui
import { CustomMenu, Input, PrimaryButton, SecondaryButton } from "components/ui";
// icons
import { PencilIcon, RectangleGroupIcon } from "@heroicons/react/24/outline";
// types
import { IIssueLabels } from "types";

type Props = {
  label: IIssueLabels;
  issueLabels: IIssueLabels[];
  editLabel: (label: IIssueLabels) => void;
  handleLabelDelete: (labelId: string) => void;
};

const defaultValues: Partial<IIssueLabels> = {
  name: "",
  color: "#ff0000",
};

const SingleLabel: React.FC<Props> = ({ label, issueLabels, editLabel, handleLabelDelete }) => {
  const [newLabelForm, setNewLabelForm] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm<IIssueLabels>({ defaultValues });

  const children = issueLabels?.filter((l) => l.parent === label.id);

  return (
    <>
      {children && children.length === 0 ? (
        <div className="gap-2 space-y-3 divide-y rounded-md border p-3 md:w-2/3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 flex-shrink-0 rounded-full"
                style={{
                  backgroundColor: label.color,
                }}
              />
              <h6 className="text-sm">{label.name}</h6>
            </div>
            <CustomMenu ellipsis>
              {/* <CustomMenu.MenuItem>Convert to group</CustomMenu.MenuItem> */}
              <CustomMenu.MenuItem onClick={() => editLabel(label)}>Edit</CustomMenu.MenuItem>
              <CustomMenu.MenuItem onClick={() => handleLabelDelete(label.id)}>
                Delete
              </CustomMenu.MenuItem>
            </CustomMenu>
          </div>
          <div className={`flex items-center gap-2 ${newLabelForm ? "" : "hidden"}`}>
            <div className="h-8 w-8 flex-shrink-0">
              <Popover className="relative flex h-full w-full items-center justify-center rounded-xl bg-gray-200">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`group inline-flex items-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        open ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {watch("color") && watch("color") !== "" && (
                        <span
                          className="h-4 w-4 rounded"
                          style={{
                            backgroundColor: watch("color") ?? "black",
                          }}
                        />
                      )}
                    </Popover.Button>

                    <Transition
                      as={React.Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute top-full left-0 z-20 mt-3 w-screen max-w-xs px-2 sm:px-0">
                        <Controller
                          name="color"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TwitterPicker
                              color={value}
                              onChange={(value) => onChange(value.hex)}
                            />
                          )}
                        />
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
            <div className="flex w-full flex-col justify-center">
              <Input
                type="text"
                id="labelName"
                name="name"
                register={register}
                placeholder="Label title"
                validations={{
                  required: "Label title is required",
                }}
                error={errors.name}
              />
            </div>
            <SecondaryButton onClick={() => setNewLabelForm(false)}>Cancel</SecondaryButton>
            <PrimaryButton loading={isSubmitting}>{isSubmitting ? "Adding" : "Add"}</PrimaryButton>
          </div>
        </div>
      ) : (
        <div className="rounded-md bg-white p-4 text-gray-900">
          <h3 className="flex items-center gap-2 font-medium leading-5">
            <RectangleGroupIcon className="h-5 w-5" />
            This is the label group title
          </h3>
          <div className="mt-4 pl-5">
            <div className="group flex items-center justify-between rounded p-2 text-sm hover:bg-gray-100">
              <h5 className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-600" />
                This is the label title
              </h5>
              <button type="button" className="hidden group-hover:block">
                <PencilIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleLabel;
