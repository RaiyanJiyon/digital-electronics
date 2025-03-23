import { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <div className="flex-1">
        {/* Main Content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
