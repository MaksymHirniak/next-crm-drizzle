"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (currentPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users?page=${currentPage}`);
      const json = await res.json();
      setUsers(json.data);
    } catch (error) {
      console.error("", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    await fetch(`/api/users?id=${id}`, { method: "DELETE" });

    fetchUsers(page);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc,_#e2e8f0_50%,_#cbd5e1_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl ">
                  CRM: Users
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm sm:min-w-80">
              <div className="rounded-xl bg-white px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Current page
                </div>
                <div className="mt-1 text-2xl font-semibold text-slate-950">
                  {page}
                </div>
              </div>
              <div className="rounded-xl bg-white px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Loaded users
                </div>
                <div className="mt-1 text-2xl font-semibold text-slate-950">
                  {loading ? "..." : users.length}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_80px_-35px_rgba(15,23,42,0.28)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-slate-950 text-slate-100">
                <tr className="text-xs uppercase tracking-[0.16em]">
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 text-center font-semibold">Role</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center gap-3">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
                        <p className="text-sm font-medium text-slate-500">
                          Loading data...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr
                      key={user.id}
                      className="group transition-colors hover:bg-slate-50/80"
                    >
                      {/* Тільки правильний порядковий номер, без зайвої колонки */}
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-500">
                        {index + 1 + (page - 1) * 10}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                            user.role === "admin"
                              ? "bg-amber-50 text-amber-700 ring-amber-200"
                              : "bg-emerald-50 text-emerald-700 ring-emerald-200"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="inline-flex items-center justify-center rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Back
          </button>

          <div className="text-center text-sm font-medium text-slate-500">
            Page <span className="text-slate-950">{page}</span>
          </div>

          <button
            onClick={() => setPage(page + 1)}
            disabled={users.length < 10}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Forward →
          </button>
        </section>
      </div>
    </main>
  );
}
