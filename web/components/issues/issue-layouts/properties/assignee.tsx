import { Fragment, useState } from "react";
import { observer } from "mobx-react-lite";
import { useMobxStore } from "lib/mobx/store-provider";

import { usePopper } from "react-popper";
// ui
import { AssigneesList, Avatar } from "components/ui";
import { Combobox } from "@headlessui/react";
import { Tooltip } from "@plane/ui";
import { Check, ChevronDown, Search, User2 } from "lucide-react";
// types
import { Placement } from "@popperjs/core";
import { RootStore } from "store/root";

export interface IIssuePropertyAssignee {
  view?: "profile" | "workspace" | "project";
  projectId: string | null;
  value: string[] | string;
  onChange: (data: string[]) => void;
  disabled?: boolean;
  hideDropdownArrow?: boolean;
  className?: string;
  buttonClassName?: string;
  optionsClassName?: string;
  placement?: Placement;
  multiple?: true;
}

export const IssuePropertyAssignee: React.FC<IIssuePropertyAssignee> = observer((props) => {
  const {
    view,
    projectId,
    value,
    onChange,
    disabled = false,
    hideDropdownArrow = false,
    className,
    buttonClassName,
    optionsClassName,
    placement,
    multiple = false,
  } = props;

  const { workspace: workspaceStore, project: projectStore }: RootStore = useMobxStore();
  const workspaceSlug = workspaceStore?.workspaceSlug;

  const [query, setQuery] = useState("");

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const projectMembers = projectId && projectStore?.members?.[projectId];

  const fetchProjectMembers = () =>
    workspaceSlug && projectId && projectStore.fetchProjectMembers(workspaceSlug, projectId);

  const options = (projectMembers ? projectMembers : [])?.map((member) => ({
    value: member.member.id,
    query: member.member.display_name,
    content: (
      <div className="flex items-center gap-2">
        <Avatar user={member.member} />
        {member.member.display_name}
      </div>
    ),
  }));

  const filteredOptions =
    query === "" ? options : options?.filter((option) => option.query.toLowerCase().includes(query.toLowerCase()));

  const label = (
    <Tooltip
      tooltipHeading="Assignee"
      tooltipContent={
        value && value.length > 0
          ? (projectMembers ? projectMembers : [])
              ?.filter((m) => value.includes(m.member.display_name))
              .map((m) => m.member.display_name)
              .join(", ")
          : "No Assignee"
      }
      position="top"
    >
      <div className="flex items-center cursor-pointer h-full w-full gap-2 text-custom-text-200">
        {value && value.length > 0 && Array.isArray(value) ? (
          <AssigneesList userIds={value} length={3} showLength={true} />
        ) : (
          <span
            className="flex items-center justify-between gap-1 h-full w-full text-xs px-2.5 py-1 rounded border-[0.5px] border-custom-border-300 duration-300 focus:outline-none
          "
          >
            <User2 className="h-3 w-3" />
          </span>
        )}
      </div>
    </Tooltip>
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement ?? "bottom-start",
    modifiers: [
      {
        name: "preventOverflow",
        options: {
          padding: 12,
        },
      },
    ],
  });

  const comboboxProps: any = { value, onChange, disabled };
  if (multiple) comboboxProps.multiple = true;

  return (
    <Combobox as="div" className={`flex-shrink-0 text-left ${className}`} {...comboboxProps}>
      <Combobox.Button as={Fragment}>
        <button
          ref={setReferenceElement}
          type="button"
          className={`flex items-center justify-between gap-1 w-full text-xs ${
            disabled ? "cursor-not-allowed text-custom-text-200" : "cursor-pointer hover:bg-custom-background-80"
          } ${buttonClassName}`}
          onClick={() => fetchProjectMembers()}
        >
          {label}
          {!hideDropdownArrow && !disabled && <ChevronDown className="h-3 w-3" aria-hidden="true" />}
        </button>
      </Combobox.Button>
      <Combobox.Options className="fixed z-10">
        <div
          className={`border border-custom-border-300 px-2 py-2.5 rounded bg-custom-background-100 text-xs shadow-custom-shadow-rg focus:outline-none w-48 whitespace-nowrap my-1 ${optionsClassName}`}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="flex w-full items-center justify-start rounded border border-custom-border-200 bg-custom-background-90 px-2">
            <Search className="h-3.5 w-3.5 text-custom-text-300" />
            <Combobox.Input
              className="w-full bg-transparent py-1 px-2 text-xs text-custom-text-200 placeholder:text-custom-text-400 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              displayValue={(assigned: any) => assigned?.name}
            />
          </div>
          <div className={`mt-2 space-y-1 max-h-48 overflow-y-scroll`}>
            {filteredOptions ? (
              filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active, selected }) =>
                      `flex items-center justify-between gap-2 cursor-pointer select-none truncate rounded px-1 py-1.5 ${
                        active && !selected ? "bg-custom-background-80" : ""
                      } ${selected ? "text-custom-text-100" : "text-custom-text-200"}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        {option.content}
                        {selected && <Check className={`h-3.5 w-3.5`} />}
                      </>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <span className="flex items-center gap-2 p-1">
                  <p className="text-left text-custom-text-200 ">No matching results</p>
                </span>
              )
            ) : (
              <p className="text-center text-custom-text-200">Loading...</p>
            )}
          </div>
        </div>
      </Combobox.Options>
    </Combobox>
  );
});
