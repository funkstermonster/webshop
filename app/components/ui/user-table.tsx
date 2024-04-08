"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";


interface RegisteredUsersProps {
  registeredUsers: User[];
}

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "registeredAt",
    label: "REGISTERED AT",
  },
  { key: "actions", label: "ACTIONS" },
];

export function TableForUser({ registeredUsers }: RegisteredUsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  useEffect(() => {
    const fetchUsers = () => {
      fetch(`/api/user`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setError("Failed to fetch users");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchUsers();
  }, []);


  const deleteUser = async (userId: any) => {
    try {
      const response = await fetch(`/api/user/${userId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      // Remove the deleted user from the local state
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error if necessary
    }
  };

  const renderActions = (item: any) => (
    <div className="relative flex items-center gap-2">
      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
      <Eye />
      </span>
      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
      <Pencil />
      </span>
      <span className="text-lg text-danger cursor-pointer active:opacity-50">
      <Trash2 onClick={() => deleteUser(item.id)}/>
      </span>
    </div>
  );

  return (
    <Table
      aria-label="Example table with dynamic content"
      className="dark"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{ wrapper: "min-h-[222px]" }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.key === "actions" ? renderActions(item) : getKeyValue(item, column.key)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
