import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

function AdminSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [courseFilter, setCourseFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Pagination
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch sales
  useEffect(() => {
    fetch("/sales")
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [courseFilter, fromDate, toDate]);

  // Unique courses
  const courses = useMemo(() => {
    const set = new Set(sales.map((s) => s.course).filter(Boolean));
    return ["", ...Array.from(set)];
  }, [sales]);

  // Filtered sales
  const filteredSales = useMemo(() => {
    return sales.filter((s) => {
      if (courseFilter && s.course !== courseFilter) return false;
      if (fromDate && s.saleDate < fromDate) return false;
      if (toDate && s.saleDate > toDate) return false;
      return true;
    });
  }, [sales, courseFilter, fromDate, toDate]);

  // KPIs
  const today = new Date().toISOString().slice(0, 10);
  const month = today.slice(0, 7);

  const todaysRevenue = filteredSales
    .filter((s) => s.saleDate === today)
    .reduce((sum, s) => sum + Number(s.price), 0);

  const monthlyRevenue = filteredSales
    .filter((s) => s.saleDate.startsWith(month))
    .reduce((sum, s) => sum + Number(s.price), 0);

  const totalSalesCount = filteredSales.length;

  const topCourse = useMemo(() => {
    const map = {};
    filteredSales.forEach((s) => {
      map[s.course] = (map[s.course] || 0) + Number(s.price);
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  }, [filteredSales]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredSales.length / PAGE_SIZE)
  );

  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Charts
  const monthlyRevenueData = useMemo(() => {
    const map = {};
    filteredSales.forEach((s) => {
      const m = s.saleDate.slice(0, 7);
      map[m] = (map[m] || 0) + Number(s.price);
    });
    return Object.entries(map).map(([month, total]) => ({ month, total }));
  }, [filteredSales]);

  const courseSalesData = useMemo(() => {
    const map = {};
    filteredSales.forEach((s) => {
      map[s.course] = (map[s.course] || 0) + Number(s.price);
    });
    return Object.entries(map).map(([course, total]) => ({ course, total }));
  }, [filteredSales]);

  // Helpers
  const clearFilters = () => {
    setCourseFilter("");
    setFromDate("");
    setToDate("");
  };

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Course", "Price", "Date"];
    const rows = filteredSales.map((s) => [
      s.id,
      s.name,
      s.course,
      s.price,
      s.saleDate,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredSales);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales");
    XLSX.writeFile(wb, "sales.xlsx");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Kpi title="Today’s Revenue" value={`₹ ${todaysRevenue.toFixed(2)}`} />
        <Kpi title="This Month" value={`₹ ${monthlyRevenue.toFixed(2)}`} />
        <Kpi title="Total Sales" value={totalSalesCount} />
        <Kpi title="Top Course" value={topCourse} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartBox title="Monthly Revenue">
          <LineChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="total" stroke="#6366f1" />
          </LineChart>
        </ChartBox>

        <ChartBox title="Course-wise Revenue">
          <BarChart data={courseSalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="course" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#22c55e" />
          </BarChart>
        </ChartBox>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <div className="flex gap-3 flex-wrap">
          <select
  className="
    p-2 border rounded
    bg-white dark:bg-gray-700
    text-gray-900 dark:text-gray-100
    border-gray-300 dark:border-gray-600
    focus:outline-none
    focus:ring-2 focus:ring-indigo-500
  "
  value={courseFilter}
  onChange={(e) => setCourseFilter(e.target.value)}
>

            {courses.map((c) => (
              <option key={c || "ALL"} value={c}>
                {c || "All Courses"}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="p-2 border rounded"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <Button onClick={clearFilters}>Clear</Button>
          <Button onClick={exportToCSV}>CSV</Button>
          <Button onClick={exportToExcel}>Excel</Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {["ID", "Name", "Course", "Price", "Date"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-sm font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedSales.map((s) => (
              <tr
                key={s.id}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{s.id}</td>
                <td className="px-4 py-2 font-medium">{s.name}</td>
                <td className="px-4 py-2">{s.course}</td>
                <td className="px-4 py-2">₹ {s.price}</td>
                <td className="px-4 py-2">{s.saleDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </Button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
  >
    {children}
  </button>
);

const Kpi = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-indigo-600">{value}</p>
  </div>
);

const ChartBox = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
    <h3 className="font-semibold mb-3">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  </div>
);

export default AdminSales;
