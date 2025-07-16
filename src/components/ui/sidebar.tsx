import { LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  JSX,
  RefAttributes,
  SetStateAction,
} from "react";

interface SidebarProps {
  navItems: Array<{
    name: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    component: JSX.Element;
  }>;
  currentPage: string;
  setCurrentPage: React.Dispatch<SetStateAction<string>>;
}

export default function Sidebar({
  navItems,
  currentPage,
  setCurrentPage,
}: SidebarProps) {
  return (
    <nav className="w-64 bg-[#181c23] border-r border-[#22304a] min-h-screen">
      <div className="p-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === currentPage;
            return (
              <div
                key={item.name}
                className={`cursor-pointer flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-blue-400 bg-[#22304a]"
                    : "text-gray-400 hover:text-[#e5e7eb] hover:bg-[#22304a]"
                }`}
                onClick={() => setCurrentPage(item.name)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </div>
            );
          })}
        </nav>
      </div>
    </nav>
  );
}
