import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Inbox() {
    const { messages: contextMessages, fetchMessages, sendMessage: sendMsgAPI } = useAppContext();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedContact, setSelectedContact] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        fetchMessages().then((data) => {
            const mapped = data.map((msg) => ({
                ...msg,
                isMine: msg.from === "You",
                time: msg.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }));
            setMessages(mapped);

            const firstContact = mapped.find((m) => m.from !== "You");
            setSelectedContact(firstContact ? firstContact.from : "");
        });
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const msg = {
            content: newMessage,
            from: "You",
            to: selectedContact,
            id: Date.now().toString(),
            isMine: true,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        try {
            const sent = await sendMsgAPI(msg);
            setMessages((prev) => [...prev, sent]);
            setNewMessage("");

            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        from: selectedContact,
                        to: "You",
                        content: "Got it, I'll take a look!",
                        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        isMine: false,
                    },
                ]);
            }, 2000);
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    const contacts = Array.from(
        new Map(
            messages.map((m) => [m.from, { name: m.from, unread: 0, online: true, role: "" }])
        ).values()
    );

    return (
        <div className="space-y-6 p-4 h-full">
            <div>
                <h1 className="text-3xl font-bold text-gradient">Inbox</h1>
                <p className="text-muted-foreground mt-1">Team messaging</p>
            </div>

            <div className="flex border rounded-md overflow-hidden h-[calc(100vh-200px)]">
                {/* Contacts */}
                <div className="w-72 border-r border-border flex-shrink-0 flex flex-col glass-card">
                    <div className="p-3 border-b border-border">
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="flex-1 px-3 py-2 rounded-md border border-input bg-card text-foreground placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors w-full"
                        />
                    </div>

                    <div className="overflow-y-auto flex-1">
                        {contacts.map((contact) => (
                            <button
                                key={contact.name}
                                onClick={() => setSelectedContact(contact.name)}
                                className={`w-full flex items-center gap-3 p-3 text-left transition-colors rounded-md
                  ${selectedContact === contact.name
                                        ? "bg-primary text-background"
                                        : "hover:bg-card/50 text-foreground"}`}
                            >
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                        {contact.name.split(" ").map((n) => n[0]).join("")}
                                    </div>
                                    {contact.online && (
                                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card-foreground" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{contact.name}</p>
                                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                                </div>
                                {contact.unread > 0 && (
                                    <span className="w-5 h-5 rounded-full bg-primary text-background text-xs flex items-center justify-center font-bold">
                                        {contact.unread}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat */}
                <div className="flex-1 flex flex-col glass-card">
                    <div className="p-4 border-b border-border flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                            {selectedContact.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">{selectedContact}</p>
                            <p className="text-xs text-success">Online</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        <AnimatePresence>
                            {messages
                                .filter(
                                    (msg) =>
                                        msg.from === selectedContact ||
                                        (msg.isMine && msg.to === selectedContact)
                                )
                                .map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: msg.isMine ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${msg.isMine
                                                ? "bg-primary text-background rounded-br-md"
                                                : "bg-card/60 text-foreground rounded-bl-md"
                                                }`}
                                        >
                                            <p>{msg.content}</p>
                                            <p className={`text-xs mt-1 ${msg.isMine ? "text-background/70" : "text-muted-foreground"}`}>
                                                {msg.time}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                                {selectedContact} is typing...
                            </motion.div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="p-4 border-t border-border">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendMessage();
                            }}
                            className="flex gap-2"
                        >
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-3 py-2 rounded-md border border-input bg-card text-foreground placeholder:text-muted-foreground
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="px-3 py-2 bg-primary text-background rounded-md disabled:opacity-50 hover:bg-primary/90 transition-colors flex items-center justify-center"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
