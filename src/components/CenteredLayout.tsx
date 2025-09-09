import React, { ReactElement } from "react";

const CenteredLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        {children}
      </div>
    </div>
  );
};

export default CenteredLayout;
