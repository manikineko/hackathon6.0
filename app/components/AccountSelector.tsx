"use client";
import React, { useEffect, useState } from "react";

interface Account {
  id: string;
  name: string;
  balance: number;
}

interface Props {
  onSelect: (account: Account) => void;
}

export default function AccountSelector({ onSelect }: Props) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    fetch("/api/bunq/accounts")
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data.accounts || []);
        setLoading(false);
      });
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    setSelected(id);
    const acc = accounts.find((a) => a.id === id);
    if (acc) onSelect(acc);
  }

  if (loading) return <div>Loading accounts...</div>;
  if (!accounts.length) return <div>No accounts found.</div>;

  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Select Bunq Account:</label>
      <select
        className="p-2 border rounded w-full"
        value={selected}
        onChange={handleChange}
      >
        <option value="">-- Choose an account --</option>
        {accounts.map((acc) => (
          <option key={acc.id} value={acc.id}>
            {acc.name} (Balance: €{acc.balance.toFixed(2)})
          </option>
        ))}
      </select>
    </div>
  );
}
