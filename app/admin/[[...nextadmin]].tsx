import React from "react";
import { useRouter } from "next/router"; // Import the router

const AdminDashboard: React.FC = () => {
    const router = useRouter();
    const { nextadmin } = router.query; // Access the captured route parameters

    // Use type assertion to ensure nextadmin is treated as an array of strings
    const segments = Array.isArray(nextadmin) ? nextadmin : [];

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Segments: {segments.join(" / ")}</p>
            {/* Add your custom dashboard components */}
        </div>
    );
};

export default AdminDashboard;
