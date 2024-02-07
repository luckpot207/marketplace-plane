import { LayoutGrid, Zap } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
// images
import githubBlackImage from "/public/logos/github-black.png";
import githubWhiteImage from "/public/logos/github-white.png";
// components
import { BreadcrumbLink } from "components/common";
import { Breadcrumbs } from "@plane/ui";
import { SidebarHamburgerToggle } from "components/core/sidebar/sidebar-menu-hamburger-toggle";

export const WorkspaceDashboardHeader = () => {
  // hooks
  const { resolvedTheme } = useTheme();

  return (
    <>
      <div className="relative z-[15] flex h-[3.75rem] w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 border-b border-custom-border-200 bg-custom-sidebar-background-100 p-4">
        <div className="flex items-center gap-2 overflow-ellipsis whitespace-nowrap">
          <SidebarHamburgerToggle />
          <div>
            <Breadcrumbs>
              <Breadcrumbs.BreadcrumbItem
                type="text"
                link={
                  <BreadcrumbLink label="Dashboard" icon={<LayoutGrid className="h-4 w-4 text-custom-text-300" />} />
                }
              />
            </Breadcrumbs>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3">
          <a
            href="https://plane.so/changelog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-shrink-0 items-center gap-1.5 rounded bg-custom-background-80 px-3 py-1.5"
          >
            <Zap size={14} strokeWidth={2} fill="rgb(var(--color-text-100))" />
            <span className="text-xs hidden sm:hidden md:block font-medium">{"What's new?"}</span>
          </a>
          <a
            className="flex flex-shrink-0 items-center gap-1.5 rounded bg-custom-background-80 px-3 py-1.5 "
            href="https://github.com/makeplane/plane"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={resolvedTheme === "dark" ? githubWhiteImage : githubBlackImage}
              height={16}
              width={16}
              alt="GitHub Logo"
            />
            <span className="text-xs font-medium hidden sm:hidden md:block">Star us on GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
};
