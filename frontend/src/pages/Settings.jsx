import { useState, useEffect } from "react";
import { Building, Bell, Shield, Save } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Settings() {
    const { workspace, updateSettings, fetchWorkspace } = useAppContext();

    const [workspaceName, setWorkspaceName] = useState("");
    const [email, setEmail] = useState("");
    const [notifications, setNotifications] = useState({
        "Email notifications": true,
        "Booking reminders": true,
        "Low stock alerts": true,
        "Staff updates": true,
        "Weekly reports": false,
    });
    const [security, setSecurity] = useState({
        "Two-factor authentication": false,
        "Session timeout (30 min)": false,
        "Login notifications": true,
    });

    useEffect(() => {
        if (workspace) {
            setWorkspaceName(workspace.name || "");
            setEmail(workspace.email || "");
        }
    }, [workspace]);

    const handleSave = async () => {
        try {
            const data = { name: workspaceName, email, notifications, security };
            await updateSettings(data);
            await fetchWorkspace();
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Failed to save settings:", error);
            alert("Failed to save settings.");
        }
    };

    // Modern toggle with primary/accent color
    const Toggle = ({ value, onClick }) => (
        <button
            onClick={onClick}
            className={`w-14 h-7 rounded-full flex items-center p-1 transition-all duration-300 ${value
                ? "bg-primary/80 justify-end shadow-[0_0_10px_hsl(var(--glow-primary))]"
                : "bg-gray-700 justify-start"
                }`}
        >
            <div
                className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 bg-card-foreground`}
            />
        </button>
    );

    const sections = [
        {
            icon: Building,
            title: "Workspace",
            description: "General workspace settings",
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-100 mb-1 block">
                            Workspace Name
                        </label>
                        <input
                            value={workspaceName}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                            className="w-full max-w-md px-4 py-2 rounded-lg bg-card/60 backdrop-blur-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground transition"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-100 mb-1 block">
                            Contact Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full max-w-md px-4 py-2 rounded-lg bg-card/60 backdrop-blur-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground transition"
                        />
                    </div>
                </div>
            ),
        },
        {
            icon: Bell,
            title: "Notifications",
            description: "Configure notification preferences",
            content: (
                <div className="space-y-3">
                    {Object.keys(notifications).map((label) => (
                        <div
                            key={label}
                            className="flex items-center justify-between max-w-md px-4 py-2 rounded-lg bg-card/50 shadow-sm"
                        >
                            <span className="text-sm text-gray-100">{label}</span>
                            <Toggle
                                value={notifications[label]}
                                onClick={() =>
                                    setNotifications((prev) => ({
                                        ...prev,
                                        [label]: !prev[label],
                                    }))
                                }
                            />
                        </div>
                    ))}
                </div>
            ),
        },
        {
            icon: Shield,
            title: "Security",
            description: "Security and privacy settings",
            content: (
                <div className="space-y-3">
                    {Object.keys(security).map((label) => (
                        <div
                            key={label}
                            className="flex items-center justify-between max-w-md px-4 py-2 rounded-lg bg-card/50 shadow-sm"
                        >
                            <span className="text-sm text-gray-100">{label}</span>
                            <Toggle
                                value={security[label]}
                                onClick={() =>
                                    setSecurity((prev) => ({
                                        ...prev,
                                        [label]: !prev[label],
                                    }))
                                }
                            />
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen p-6 bg-background space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-gradient">Settings</h1>
                    <p className="text-gray-400 mt-1">Manage your workspace settings</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-background shadow hover:shadow-lg transition"
                >
                    <Save className="w-5 h-5" /> Save Changes
                </button>
            </div>

            {/* Sections */}
            <div className="space-y-6">
                {sections.map((section, i) => (
                    <div
                        key={section.title}
                        className="glass-card p-6 rounded-xl shadow hover-lift"
                        style={{ transitionDelay: `${i * 50}ms` }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-primary to-cyan-300 flex items-center justify-center">
                                <section.icon className="w-6 h-6 text-background" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-100">{section.title}</h3>
                                <p className="text-xs text-gray-400">{section.description}</p>
                            </div>
                        </div>
                        <div>{section.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
