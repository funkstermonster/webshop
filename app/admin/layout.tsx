import Sidebar from "../components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex h-screen">
        <div className="flex flex-row">
        <Sidebar/>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
