import Header from "@/components/layout/Header";

export default function UsuariosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
      
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}