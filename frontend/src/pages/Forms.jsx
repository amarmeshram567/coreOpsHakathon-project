// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FileText, Plus, ChevronDown, ChevronUp, X } from "lucide-react";
// import { useAppContext } from "../context/AppContext";

// export default function Forms() {
//     const { forms, submissions, fetchForms, fetchSubmissions, addForm } = useAppContext();
//     const [expandedForm, setExpandedForm] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [title, setTitle] = useState("");
//     const [fields, setFields] = useState("");

//     useEffect(() => {
//         fetchForms(); // fetch forms on mount
//     }, []);

//     const handleExpand = async (formId) => {
//         if (expandedForm === formId) {
//             setExpandedForm(null);
//         } else {
//             await fetchSubmissions(formId);
//             setExpandedForm(formId);
//         }
//     };

//     const handleAddForm = async () => {
//         if (!title || !fields) return;
//         await addForm({ title, fields: Number(fields) });
//         setTitle("");
//         setFields("");
//         setShowModal(false);
//         fetchForms();
//     };

//     const statusClasses = {
//         active: "bg-green-100 text-green-700 border border-green-200",
//         draft: "bg-yellow-100 text-yellow-700 border border-yellow-200",
//         inactive: "bg-gray-100 text-gray-500 border border-gray-200",
//         new: "bg-blue-100 text-blue-700 border border-blue-200",
//         reviewed: "bg-gray-100 text-gray-500 border border-gray-200",
//     };

//     return (
//         <div className="space-y-6 p-4">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gradient">Forms</h1>
//                     <p className="text-gray-500 mt-1">Create and manage submission forms</p>
//                 </div>
//                 <button
//                     onClick={() => setShowModal(true)}
//                     className="flex items-center gap-2 px-3 py-2 bg-gradient border text-white rounded-md border-gray-600 hover:border-gray-400"
//                 >
//                     <Plus className="w-4 h-4" /> Create Form
//                 </button>
//             </div>

//             {/* Forms List */}
//             <div className="space-y-3">
//                 {forms.map((form, i) => (
//                     <motion.div
//                         key={form.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: i * 0.05 }}
//                         className="border rounded-md overflow-hidden"
//                     >
//                         <button
//                             onClick={() => handleExpand(form.id)}
//                             className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
//                         >
//                             <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
//                                     <FileText className="w-5 h-5 text-blue-600" />
//                                 </div>
//                                 <div className="text-left">
//                                     <h3 className="font-semibold text-gray-900">{form.title}</h3>
//                                     <p className="text-xs text-gray-500">
//                                         {form.fields} fields · {form.submissions?.length || 0} submissions
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <span className={`px-2 py-1 rounded-md text-xs ${statusClasses[form.status]}`}>
//                                     {form.status}
//                                 </span>
//                                 {expandedForm === form.id ? (
//                                     <ChevronUp className="w-4 h-4 text-gray-500" />
//                                 ) : (
//                                     <ChevronDown className="w-4 h-4 text-gray-500" />
//                                 )}
//                             </div>
//                         </button>

//                         {/* Expandable Content */}
//                         <AnimatePresence>
//                             {expandedForm === form.id && (
//                                 <motion.div
//                                     initial={{ height: 0, opacity: 0 }}
//                                     animate={{ height: "auto", opacity: 1 }}
//                                     exit={{ height: 0, opacity: 0 }}
//                                     transition={{ duration: 0.3 }}
//                                     className="overflow-hidden border-t border-gray-200"
//                                 >
//                                     <div className="p-4">
//                                         <h4 className="text-sm font-medium text-gray-500 mb-3">Recent Submissions</h4>
//                                         <table className="w-full text-sm">
//                                             <thead>
//                                                 <tr className="border-b border-gray-200">
//                                                     <th className="text-left py-2 font-medium text-gray-500">Name</th>
//                                                     <th className="text-left py-2 font-medium text-gray-500">Email</th>
//                                                     <th className="text-left py-2 font-medium text-gray-500">Date</th>
//                                                     <th className="text-left py-2 font-medium text-gray-500">Status</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {submissions.map((sub) => (
//                                                     <tr key={sub.id} className="border-b border-gray-100">
//                                                         <td className="py-2 text-gray-900">{sub.name}</td>
//                                                         <td className="py-2 text-gray-500">{sub.email}</td>
//                                                         <td className="py-2 text-gray-500">{sub.date}</td>
//                                                         <td className="py-2">
//                                                             <span
//                                                                 className={`px-2 py-1 rounded-md text-xs ${statusClasses[sub.status]}`}
//                                                             >
//                                                                 {sub.status}
//                                                             </span>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </motion.div>
//                 ))}
//             </div>

//             {/* Add Form Modal */}
//             <AnimatePresence>
//                 {showModal && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
//                         onClick={() => setShowModal(false)}
//                     >
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.95 }}
//                             onClick={(e) => e.stopPropagation()}
//                             className="bg-white rounded shadow-lg p-6 w-full max-w-md space-y-4"
//                         >
//                             <div className="flex items-center justify-between">
//                                 <h2 className="text-lg font-bold text-gray-900">Create Form</h2>
//                                 <button onClick={() => setShowModal(false)} className="p-1 rounded hover:bg-gray-100">
//                                     <X className="w-5 h-5 text-gray-600" />
//                                 </button>
//                             </div>
//                             <input
//                                 placeholder="Form title"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 className="w-full px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Number of fields"
//                                 value={fields}
//                                 onChange={(e) => setFields(e.target.value)}
//                                 className="w-full px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                             />
//                             <div className="flex gap-2 justify-end">
//                                 <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
//                                     Cancel
//                                 </button>
//                                 <button onClick={handleAddForm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                                     Add Form
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
import { FileText, Plus, ChevronDown, ChevronUp, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Forms() {
    const { forms, submissions, fetchForms, fetchSubmissions, addForm } = useAppContext();
    const [expandedForm, setExpandedForm] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [fields, setFields] = useState("");

    useEffect(() => {
        fetchForms();
    }, []);

    const handleExpand = async (formId) => {
        if (expandedForm === formId) {
            setExpandedForm(null);
        } else {
            await fetchSubmissions(formId);
            setExpandedForm(formId);
        }
    };

    const handleAddForm = async () => {
        if (!title || !fields) return;
        await addForm({ title, fields: Number(fields) });
        setTitle("");
        setFields("");
        setShowModal(false);
        fetchForms();
    };

    const statusClasses = {
        active: "bg-success/20 text-success border border-success/50",
        draft: "bg-warning/20 text-warning border border-warning/50",
        inactive: "bg-muted/20 text-muted-foreground border border-muted/50",
        new: "bg-primary/20 text-primary border border-primary/50",
        reviewed: "bg-muted/20 text-muted-foreground border border-muted/50",
    };

    return (
        <div className="p-6 space-y-6 bg-background min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">Forms</h1>
                    <p className="text-gray-400 mt-1">Create and manage submission forms</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-primary text-background rounded-md hover:shadow-md transition"
                >
                    <Plus className="w-4 h-4" /> Create Form
                </button>
            </div>

            {/* Forms List */}
            <div className="space-y-3">
                {forms.map((form, i) => (
                    <motion.div
                        key={form.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card overflow-hidden rounded-xl"
                    >
                        <button
                            onClick={() => handleExpand(form.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-card/70 transition"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-foreground">{form.title}</h3>
                                    <p className="text-xs text-gray-400">
                                        {form.fields} fields · {form.submissions?.length || 0} submissions
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded-md text-xs ${statusClasses[form.status]}`}>
                                    {form.status}
                                </span>
                                {expandedForm === form.id ? (
                                    <ChevronUp className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                            </div>
                        </button>

                        {/* Expandable Content */}
                        <AnimatePresence>
                            {expandedForm === form.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden border-t border-border/50"
                                >
                                    <div className="p-4">
                                        <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Submissions</h4>
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-border/50">
                                                    <th className="text-left py-2 font-medium text-gray-400">Name</th>
                                                    <th className="text-left py-2 font-medium text-gray-400">Email</th>
                                                    <th className="text-left py-2 font-medium text-gray-400">Date</th>
                                                    <th className="text-left py-2 font-medium text-gray-400">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {submissions.map((sub) => (
                                                    <tr key={sub.id} className="border-b border-border/20">
                                                        <td className="py-2 text-foreground">{sub.name}</td>
                                                        <td className="py-2 text-muted-foreground">{sub.email}</td>
                                                        <td className="py-2 text-muted-foreground">{sub.date}</td>
                                                        <td className="py-2">
                                                            <span
                                                                className={`px-2 py-1 rounded-md text-xs ${statusClasses[sub.status]}`}
                                                            >
                                                                {sub.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Add Form Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card p-6 w-full max-w-md space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-foreground">Create Form</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-1 rounded hover:bg-card/40 transition"
                                >
                                    <X className="w-5 h-5 text-foreground" />
                                </button>
                            </div>
                            <input
                                placeholder="Form title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                            <input
                                type="number"
                                placeholder="Number of fields"
                                value={fields}
                                onChange={(e) => setFields(e.target.value)}
                                className="w-full px-3 py-2 border rounded bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border rounded text-foreground hover:bg-card/40 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddForm}
                                    className="px-4 py-2 bg-primary text-background rounded hover:shadow-md transition"
                                >
                                    Add Form
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

