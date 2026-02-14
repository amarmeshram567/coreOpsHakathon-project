// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     CalendarDays,
//     Plus,
//     Search,
//     Eye,
//     Edit,
//     Trash2,
//     X,
//     ChevronLeft,
//     ChevronRight,
// } from "lucide-react";
// import { useAppContext } from "../context/AppContext";

// const statusColors = {
//     confirmed: "bg-success/20 text-success-foreground border border-success/30",
//     pending: "bg-warning/20 text-warning-foreground border border-warning/30",
//     completed: "bg-primary/20 text-primary-foreground border border-primary/30",
//     cancelled: "bg-destructive/20 text-destructive-foreground border border-destructive/30",
// };

// export default function Bookings() {
//     const { bookings, fetchBookings, createBooking } = useAppContext();

//     const [search, setSearch] = useState("");
//     const [page, setPage] = useState(1);
//     const [showForm, setShowForm] = useState(false);

//     // Form fields
//     const [customer, setCustomer] = useState("");
//     const [service, setService] = useState("");
//     const [date, setDate] = useState("");
//     const [time, setTime] = useState("");
//     const [amount, setAmount] = useState("");

//     const perPage = 10;

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const filtered = bookings.filter(
//         (b) =>
//             b.customer.toLowerCase().includes(search.toLowerCase()) ||
//             b.id.toLowerCase().includes(search.toLowerCase())
//     );
//     const totalPages = Math.ceil(filtered.length / perPage);
//     const paged = filtered.slice((page - 1) * perPage, page * perPage);

//     const handleCreateBooking = async () => {
//         if (!customer || !service || !date || !time || !amount) return;
//         await createBooking({ customer, service, date, time, amount });
//         // Reset form
//         setCustomer(""); setService(""); setDate(""); setTime(""); setAmount("");
//         setShowForm(false);
//     };

//     return (
//         <div className="space-y-6 p-4">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gradient">Bookings</h1>
//                     <p className="text-gray-500 mt-1">Manage all your bookings</p>
//                 </div>
//                 <button
//                     onClick={() => setShowForm(true)}
//                     className="flex items-center gap-2 px-3 py-2 bg-gradient border text-white rounded-md border-gray-600 hover:border-gray-400"
//                 >
//                     <Plus className="w-4 h-4" /> New Booking
//                 </button>
//             </div>

//             {/* Search */}
//             <div className="relative max-w-sm">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                     type="text"
//                     placeholder="Search bookings..."
//                     value={search}
//                     onChange={(e) => {
//                         setSearch(e.target.value);
//                         setPage(1);
//                     }}
//                     className="pl-10 pr-3 py-2 w-full border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
//                 />
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto glass-card">
//                 <table className="w-full text-sm border border-border bg-card/60">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="text-left px-4 py-2 font-medium text-gray-500">ID</th>
//                             <th className="text-left px-4 py-2 font-medium text-gray-500">Customer</th>
//                             <th className="text-left px-4 py-2 font-medium text-gray-500">Service</th>
//                             <th className="text-left px-4 py-2 font-medium text-gray-500">Date</th>
//                             <th className="text-left px-4 py-2 font-medium text-gray-500">Status</th>
//                             <th className="text-left px-4 py-2 font-medium text-gray-500">Amount</th>
//                             <th className="text-right px-4 py-2 font-medium text-gray-500">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {paged.map((booking, i) => (
//                             <motion.tr
//                                 key={booking.id}
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: i * 0.03 }}
//                                 className="border-b border-border hover:bg-card/50 transition-colors"
//                             >
//                                 <td className="px-4 py-2 font-mono text-xs text-foreground">{booking.id}</td>
//                                 <td className="px-4 py-2 font-medium text-foreground">{booking.customer}</td>
//                                 <td className="px-4 py-2 text-muted-foreground">{booking.service}</td>
//                                 <td className="px-4 py-2 text-muted-foreground">{booking.date} {booking.time}</td>
//                                 <td className="px-4 py-2">
//                                     <span className={`px-2 py-1 rounded-md text-xs ${statusColors[booking.status]}`}>
//                                         {booking.status}
//                                     </span>
//                                 </td>
//                                 <td className="px-4 py-2 text-foreground">${booking.amount}</td>
//                                 <td className="px-4 py-2">
//                                     <div className="flex justify-end gap-1">
//                                         <button className="p-1 rounded hover:bg-gray-100"><Eye className="w-4 h-4" /></button>
//                                         <button className="p-1 rounded hover:bg-gray-100"><Edit className="w-4 h-4" /></button>
//                                         <button className="p-1 rounded hover:bg-red-100 text-red-600"><Trash2 className="w-4 h-4" /></button>
//                                     </div>
//                                 </td>
//                             </motion.tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Pagination */}
//                 <div className="flex items-center justify-between px-4 py-2 border-t text-sm text-gray-500">
//                     <span>{filtered.length} bookings total</span>
//                     <div className="flex items-center gap-2">
//                         <button onClick={() => setPage((p) => p - 1)} disabled={page === 1} className="p-1 rounded border disabled:opacity-50">
//                             <ChevronLeft className="w-4 h-4" />
//                         </button>
//                         <span>Page {page} of {totalPages}</span>
//                         <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} className="p-1 rounded border disabled:opacity-50">
//                             <ChevronRight className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Modal */}
//             <AnimatePresence>
//                 {showForm && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex text-black items-center justify-center bg-black/50 backdrop-blur-sm p-4"
//                         onClick={() => setShowForm(false)}
//                     >
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//                             animate={{ opacity: 1, scale: 1, y: 0 }}
//                             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//                             onClick={(e) => e.stopPropagation()}
//                             className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-xl p-6 w-full max-w-md space-y-4"
//                         >
//                             {/* Header */}
//                             <div className="flex items-center justify-between">
//                                 <h2 className="text-lg font-bold text-foreground">New Booking</h2>
//                                 <button
//                                     onClick={() => setShowForm(false)}
//                                     className="p-1 rounded hover:bg-gray-100"
//                                 >
//                                     <X className="w-5 h-5" />
//                                 </button>
//                             </div>

//                             {/* Form Fields */}
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-foreground mb-1">
//                                         Customer Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={customer}
//                                         onChange={(e) => setCustomer(e.target.value)}
//                                         className="w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-foreground mb-1">
//                                         Service
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={service}
//                                         onChange={(e) => setService(e.target.value)}
//                                         className="w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-foreground mb-1">
//                                         Date
//                                     </label>
//                                     <input
//                                         type="date"
//                                         value={date}
//                                         onChange={(e) => setDate(e.target.value)}
//                                         className="w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-foreground mb-1">
//                                         Time
//                                     </label>
//                                     <input
//                                         type="time"
//                                         value={time}
//                                         onChange={(e) => setTime(e.target.value)}
//                                         className="w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-foreground mb-1">
//                                         Amount
//                                     </label>
//                                     <input
//                                         type="number"
//                                         value={amount}
//                                         onChange={(e) => setAmount(e.target.value)}
//                                         className="w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Buttons */}
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     onClick={() => setShowForm(false)}
//                                     className="px-3 py-2 border text-white rounded-md"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleCreateBooking}
//                                     className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                                 >
//                                     Create Booking
//                                 </button>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//         </div>
//     );
// }



import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CalendarDays,
    Plus,
    Search,
    Eye,
    Edit,
    Trash2,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const statusColors = {
    confirmed: "bg-success/20 text-success-foreground border border-success/30",
    pending: "bg-warning/20 text-warning-foreground border border-warning/30",
    completed: "bg-primary/20 text-primary-foreground border border-primary/30",
    cancelled: "bg-destructive/20 text-destructive-foreground border border-destructive/30",
};

export default function Bookings() {
    const { bookings, fetchBookings, createBooking } = useAppContext();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [showForm, setShowForm] = useState(false);

    // Form fields
    const [customer, setCustomer] = useState("");
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [amount, setAmount] = useState("");

    const perPage = 10;

    useEffect(() => {
        fetchBookings();
    }, []);

    const filtered = bookings.filter(
        (b) =>
            b.customer.toLowerCase().includes(search.toLowerCase()) ||
            b.id.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((page - 1) * perPage, page * perPage);

    const handleCreateBooking = async () => {
        if (!customer || !service || !date || !time || !amount) return;
        await createBooking({ customer, service, date, time, amount });
        setCustomer("");
        setService("");
        setDate("");
        setTime("");
        setAmount("");
        setShowForm(false);
    };

    return (
        <div className="space-y-6 p-6 bg-background min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">Bookings</h1>
                    <p className="text-muted-foreground mt-1">Manage all your bookings</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-primary text-background rounded-md hover-lift transition"
                >
                    <Plus className="w-4 h-4" /> New Booking
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search bookings..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="pl-10 pr-3 py-2 w-full border border-border rounded-md bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto glass-card">
                <table className="w-full text-sm border border-border bg-card/60">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-muted-foreground font-medium">ID</th>
                            <th className="px-4 py-2 text-left text-muted-foreground font-medium">Customer</th>
                            <th className="px-4 py-2 text-left text-muted-foreground font-medium">Service</th>
                            <th className="px-4 py-2 text-left text-muted-foreground font-medium">Date</th>
                            <th className="px-4 py-2 text-left text-muted-foreground font-medium">Status</th>
                            <th className="px-4 py-2 text-left text-muted-foreground font-medium">Amount</th>
                            <th className="px-4 py-2 text-right text-muted-foreground font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paged.map((booking, i) => (
                            <motion.tr
                                key={booking.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03 }}
                                className="border-b border-border hover:bg-card/50 transition-colors"
                            >
                                <td className="px-4 py-2 font-mono text-xs text-foreground">{booking.id}</td>
                                <td className="px-4 py-2 font-medium text-foreground">{booking.customer}</td>
                                <td className="px-4 py-2 text-muted-foreground">{booking.service}</td>
                                <td className="px-4 py-2 text-muted-foreground">{booking.date} {booking.time}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded-md text-xs ${statusColors[booking.status]}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-foreground">${booking.amount}</td>
                                <td className="px-4 py-2">
                                    <div className="flex justify-end gap-1">
                                        <button className="p-1 rounded hover:bg-card/50 transition"><Eye className="w-4 h-4" /></button>
                                        <button className="p-1 rounded hover:bg-card/50 transition"><Edit className="w-4 h-4" /></button>
                                        <button className="p-1 rounded hover:bg-destructive/20 transition"><Trash2 className="w-4 h-4 text-destructive" /></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-border text-sm text-muted-foreground">
                    <span>{filtered.length} bookings total</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => p - 1)}
                            disabled={page === 1}
                            className="p-1 rounded border disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span>Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={page === totalPages}
                            className="p-1 rounded border disabled:opacity-50"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
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
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card p-6 rounded-xl w-full max-w-md space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gradient">New Booking</h2>
                                <button onClick={() => setShowForm(false)} className="p-1 rounded hover:bg-card/40">
                                    <X className="w-5 h-5 text-foreground" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <input type="text" placeholder="Customer" value={customer} onChange={(e) => setCustomer(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                                <input type="text" placeholder="Service" value={service} onChange={(e) => setService(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button onClick={() => setShowForm(false)} className="px-3 py-2 border text-foreground rounded-md hover:bg-card/40">Cancel</button>
                                <button onClick={handleCreateBooking} className="px-3 py-2 bg-primary text-background rounded-md hover-lift transition">Create Booking</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
