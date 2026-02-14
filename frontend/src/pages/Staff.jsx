import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Edit, Trash2, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const roleColors = {
    Admin: "bg-red-100 text-red-600",
    Manager: "bg-blue-100 text-blue-600",
    Therapist: "bg-green-100 text-green-600",
    Receptionist: "bg-yellow-100 text-yellow-600",
    Trainer: "bg-purple-100 text-purple-600",
    Support: "bg-muted/20 text-muted-foreground",
};

export default function Staff() {
    const { staff, fetchStaff, addStaff, removeStaff } = useAppContext();

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        fetchStaff();
    }, []);

    const filtered = staff.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddMember = async () => {
        if (!name || !email || !role) return;
        await addStaff({ name, email, role });
        setName("");
        setEmail("");
        setRole("");
        setShowForm(false);
    };

    return (
        <div className="p-6 space-y-6 bg-background min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">Staff</h1>
                    <p className="text-gray-400 mt-1">Manage your team members</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-primary text-background rounded-md hover:shadow-md transition"
                >
                    <Plus className="w-4 h-4" /> Add Staff
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search staff..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-3 py-2 w-full border border-border rounded bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                />
            </div>

            {/* Staff Table */}
            <div className="overflow-x-auto border border-border rounded-xl shadow-sm glass-card">
                <table className="w-full text-sm">
                    <thead className="bg-card/70">
                        <tr>
                            {["Name", "Email", "Role", "Status", "Joined", "Actions"].map(
                                (header) => (
                                    <th
                                        key={header}
                                        className="text-left px-4 py-3 font-medium text-gray-400"
                                    >
                                        {header}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((member, i) => (
                            <motion.tr
                                key={member.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03 }}
                                className="border-t border-border/20 hover:bg-card/50 transition-colors"
                            >
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                        {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                    <span className="text-foreground">{member.name}</span>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">{member.email}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${roleColors[member.role] || "bg-muted/20 text-muted-foreground"
                                            }`}
                                    >
                                        {member.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center gap-1 text-xs ${member.status === "active"
                                            ? "text-success"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${member.status === "active"
                                                ? "bg-success"
                                                : "bg-muted-foreground"
                                                }`}
                                        />
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    {new Date(member.joined).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 flex gap-2 justify-end">
                                    <button className="p-1 rounded hover:bg-card/50 transition">
                                        <Edit className="w-4 h-4 text-foreground" />
                                    </button>
                                    <button
                                        onClick={() => removeStaff(member.id)}
                                        className="p-1 rounded hover:bg-destructive/20 transition"
                                    >
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Staff Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm p-4"
                        onClick={() => setShowForm(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card rounded-xl p-6 w-full max-w-md space-y-4 shadow-lg"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gradient">Add Staff Member</h2>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="p-1 rounded hover:bg-card/40 transition"
                                >
                                    <X className="w-5 h-5 text-foreground" />
                                </button>
                            </div>

                            {/* Form Inputs */}
                            <input
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md bg-card/60 backdrop-blur-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md bg-card/60 backdrop-blur-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md bg-card/60 backdrop-blur-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                            >
                                <option value="">Select role</option>
                                {Object.keys(roleColors).map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>

                            {/* Action Buttons */}
                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 border rounded-md text-foreground hover:bg-card/40 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddMember}
                                    className="px-4 py-2 bg-primary text-background rounded-md hover-lift transition"
                                >
                                    Add Member
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
