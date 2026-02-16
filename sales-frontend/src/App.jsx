import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import AdminSales from "./AdminSales";
import SaleForm from "./SaleForm";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <AdminLayout active={page} onNavigate={setPage}>
      <div
  key={page}
  className="animate-fadeIn">
  {page === "dashboard" && <AdminSales />}
  {page === "sales" && <SaleForm />}
      </div>

    </AdminLayout>
  );
}

export default App;
