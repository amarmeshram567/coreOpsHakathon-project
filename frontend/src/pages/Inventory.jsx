import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Plus, Edit, Trash2, X, AlertTriangle, Search } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Inventory() {
    const { items, fetchItems, addItem, updateItem, deleteItem } = useAppContext();

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddItem = async () => {
        if (!name || !category || !quantity || !price) return;
        await addItem({ name, category, quantity, price });
        setName(""); setCategory(""); setQuantity(""); setPrice("");
        setShowForm(false);
    };

    return (
        <div className="p-6 space-y-6 bg-background min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">Inventory</h1>
                    <p className="text-muted-foreground mt-1">Track and manage your inventory</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-primary text-background rounded-md hover-lift transition"
                >
                    <Plus className="w-4 h-4" /> Add Item
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search inventory..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-3 py-2 w-full border border-border rounded bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                />
            </div>

            {/* Inventory grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((item, i) => {
                    const isLow = item.quantity <= 10;
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`glass-card p-5 relative hover:shadow-lg transition`}
                        >
                            {isLow && (
                                <div className="absolute top-3 right-3 flex items-center gap-1 text-warning animate-pulse-slow">
                                    <AlertTriangle className="w-5 h-5" />
                                    <span className="text-xs">Low stock</span>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                    <Package className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground">{item.category}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-end justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground">Quantity</p>
                                    <p className={`text-lg font-bold ${isLow ? "text-warning" : "text-foreground"}`}>
                                        {item.quantity}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground">Price</p>
                                    <p className="text-lg font-bold text-foreground">${item.price}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                                <button className="p-1.5 rounded-md hover:bg-card/50 transition">
                                    <Edit className="w-4 h-4 text-foreground" />
                                </button>
                                <button
                                    onClick={() => deleteItem(item.id)}
                                    className="p-1.5 rounded-md hover:bg-destructive/20 transition"
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Add Item Modal */}
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
                            className="glass-card p-6 rounded-xl w-full max-w-md space-y-4 shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gradient">Add Item</h2>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="p-1 rounded hover:bg-card/40 transition"
                                >
                                    <X className="w-5 h-5 text-foreground" />
                                </button>
                            </div>

                            <input
                                type="text"
                                placeholder="Item name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md bg-card/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
                                />
                            </div>

                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 border rounded-md text-foreground hover:bg-card/40 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddItem}
                                    className="px-4 py-2 bg-primary text-background rounded-md hover-lift transition"
                                >
                                    Add Item
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
