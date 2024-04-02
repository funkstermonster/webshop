"use client";

import { useEffect, useState } from 'react';
import { User } from "@/types/user";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

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
      label: "REGISTERED AT"
  }
];

export function TableForUser({ registeredUsers }: RegisteredUsersProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers =  () => {
            fetch(`/api/user`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch users');
                    }
                    return response.json();
                })
                .then(data => {
                    setUsers(data);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                    setError('Failed to fetch users');
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Table aria-label="Example table with dynamic content" className="dark">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={users}>
                {(item) => (
                    <TableRow key={item.id}>
                        {columns.map(column => (
                            <TableCell key={column.key}>
                                {getKeyValue(item, column.key)}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
