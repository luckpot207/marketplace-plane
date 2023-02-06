import React, { useCallback } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import useSWR, { mutate } from "swr";

// services
import issuesService from "services/issues.service";
import stateService from "services/state.service";
// components
import { AssigneeSelect, DueDateSelect, PrioritySelect, StateSelect } from "components/core/select";
// ui
import { CustomMenu } from "components/ui";
// types
import {
  CycleIssueResponse,
  IIssue,
  IProjectMember,
  IssueResponse,
  ModuleIssueResponse,
  Properties,
  UserAuth,
} from "types";
// fetch-keys
import { CYCLE_ISSUES, MODULE_ISSUES, PROJECT_ISSUES_LIST, STATE_LIST } from "constants/fetch-keys";

type Props = {
  type?: string;
  issue: IIssue;
  properties: Properties;
  members: IProjectMember[] | undefined;
  editIssue: () => void;
  removeIssue?: (() => void) | null;
  handleDeleteIssue: (issue: IIssue) => void;
  userAuth: UserAuth;
};

export const SingleListIssue: React.FC<Props> = ({
  type,
  issue,
  properties,
  members,
  editIssue,
  removeIssue,
  handleDeleteIssue,
  userAuth,
}) => {
  const router = useRouter();
  const { workspaceSlug, projectId, cycleId, moduleId } = router.query;

  const { data: states } = useSWR(
    workspaceSlug && projectId ? STATE_LIST(projectId as string) : null,
    workspaceSlug && projectId
      ? () => stateService.getStates(workspaceSlug as string, projectId as string)
      : null
  );

  const partialUpdateIssue = useCallback(
    (formData: Partial<IIssue>) => {
      if (!workspaceSlug || !projectId) return;

      if (cycleId)
        mutate<CycleIssueResponse[]>(
          CYCLE_ISSUES(cycleId as string),
          (prevData) => {
            const updatedIssues = (prevData ?? []).map((p) => {
              if (p.issue_detail.id === issue.id) {
                return {
                  ...p,
                  issue_detail: {
                    ...p.issue_detail,
                    ...formData,
                  },
                };
              }
              return p;
            });
            return [...updatedIssues];
          },
          false
        );

      if (moduleId)
        mutate<ModuleIssueResponse[]>(
          MODULE_ISSUES(moduleId as string),
          (prevData) => {
            const updatedIssues = (prevData ?? []).map((p) => {
              if (p.issue_detail.id === issue.id) {
                return {
                  ...p,
                  issue_detail: {
                    ...p.issue_detail,
                    ...formData,
                  },
                };
              }
              return p;
            });
            return [...updatedIssues];
          },
          false
        );

      mutate<IssueResponse>(
        PROJECT_ISSUES_LIST(workspaceSlug as string, projectId as string),
        (prevData) => ({
          ...(prevData as IssueResponse),
          results: (prevData?.results ?? []).map((p) => {
            if (p.id === issue.id) return { ...p, ...formData };
            return p;
          }),
        }),
        false
      );

      issuesService
        .patchIssue(workspaceSlug as string, projectId as string, issue.id, formData)
        .then((res) => {
          mutate(
            cycleId
              ? CYCLE_ISSUES(cycleId as string)
              : CYCLE_ISSUES(issue?.issue_cycle?.cycle ?? "")
          );
          mutate(
            moduleId
              ? MODULE_ISSUES(moduleId as string)
              : MODULE_ISSUES(issue?.issue_module?.module ?? "")
          );

          mutate(PROJECT_ISSUES_LIST(workspaceSlug as string, projectId as string));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [workspaceSlug, projectId, cycleId, moduleId, issue]
  );

  const isNotAllowed = userAuth.isGuest || userAuth.isViewer;

  return (
    <div className="flex items-center justify-between gap-2 px-4 py-3 text-sm">
      <div className="flex items-center gap-2">
        <span
          className="block h-1.5 w-1.5 flex-shrink-0 rounded-full"
          style={{
            backgroundColor: issue.state_detail.color,
          }}
        />
        <Link href={`/${workspaceSlug}/projects/${issue?.project_detail?.id}/issues/${issue.id}`}>
          <a className="group relative flex items-center gap-2">
            {properties.key && (
              <span className="flex-shrink-0 text-xs text-gray-500">
                {issue.project_detail?.identifier}-{issue.sequence_id}
              </span>
            )}
            <span>{issue.name}</span>
          </a>
        </Link>
      </div>
      <div className="flex flex-shrink-0 flex-wrap items-center gap-x-1 gap-y-2 text-xs">
        {properties.priority && (
          <PrioritySelect
            issue={issue}
            partialUpdateIssue={partialUpdateIssue}
            isNotAllowed={isNotAllowed}
          />
        )}
        {properties.state && (
          <StateSelect
            issue={issue}
            states={states}
            partialUpdateIssue={partialUpdateIssue}
            isNotAllowed={isNotAllowed}
          />
        )}
        {properties.due_date && (
          <DueDateSelect
            issue={issue}
            partialUpdateIssue={partialUpdateIssue}
            isNotAllowed={isNotAllowed}
          />
        )}
        {properties.sub_issue_count && (
          <div className="flex flex-shrink-0 items-center gap-1 rounded border px-2 py-1 text-xs shadow-sm">
            {issue.sub_issues_count} {issue.sub_issues_count === 1 ? "sub-issue" : "sub-issues"}
          </div>
        )}
        {properties.assignee && (
          <AssigneeSelect
            issue={issue}
            members={members}
            partialUpdateIssue={partialUpdateIssue}
            isNotAllowed={isNotAllowed}
          />
        )}
        {type && !isNotAllowed && (
          <CustomMenu width="auto" ellipsis>
            <CustomMenu.MenuItem onClick={editIssue}>Edit</CustomMenu.MenuItem>
            {type !== "issue" && removeIssue && (
              <CustomMenu.MenuItem onClick={removeIssue}>
                <>Remove from {type}</>
              </CustomMenu.MenuItem>
            )}
            <CustomMenu.MenuItem onClick={() => handleDeleteIssue(issue)}>
              Delete permanently
            </CustomMenu.MenuItem>
          </CustomMenu>
        )}
      </div>
    </div>
  );
};
