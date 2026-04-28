import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function SystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-start overflow-y-auto p-10 gap-4">
          {children}
        </main>
      </div>
    </div>
  );
}
