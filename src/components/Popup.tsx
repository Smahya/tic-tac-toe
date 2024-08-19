export const Popup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center">
      <div className="bg-dark-navy p-4 min-h-[250px] w-full">{children}</div>
    </div>
  );
};
