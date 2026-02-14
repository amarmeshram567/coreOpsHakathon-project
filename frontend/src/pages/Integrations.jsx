import { useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CreditCard, Mail, Calendar, BarChart3, MessageCircle, Cloud } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Integrations() {
    const { integrations, fetchIntegrations, addIntegration } = useAppContext();

    useEffect(() => {
        fetchIntegrations(); // fetch integrations on mount
    }, []);

    const toggleIntegration = async (integration) => {
        try {
            // Here you could call a backend endpoint to toggle the integration
            // For now, we'll just simulate it by updating the frontend state
            await addIntegration({ ...integration, enabled: !integration.enabled });
        } catch (error) {
            console.error("Failed to toggle integration", error);
        }
    };

    return (
        <div className="space-y-6 p-4">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gradient">Integrations</h1>
                <p className="text-gray-500 mt-1">Connect third-party services</p>
            </div>

            {/* Integrations grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration, i) => {
                    const Icon = {
                        Stripe: CreditCard,
                        SendGrid: Mail,
                        "Google Calendar": Calendar,
                        Analytics: BarChart3,
                        Slack: MessageCircle,
                        "AWS S3": Cloud,
                    }[integration.name] || ExternalLink;

                    return (
                        <motion.div
                            key={integration.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`p-5 border rounded-md bg-white shadow-sm hover:shadow-md transition ${integration.enabled ? "border-blue-200" : "border-gray-200"}`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${integration.enabled ? "bg-blue-100" : "bg-gray-200"}`}>
                                        <Icon className={`w-5 h-5 ${integration.enabled ? "text-blue-600" : "text-gray-500"}`} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                                            <span
                                                className={`text-xs px-2 py-0.5 rounded-full border ${integration.enabled
                                                    ? "bg-green-100 text-green-600 border-green-200"
                                                    : "bg-gray-100 text-gray-500 border-gray-200"
                                                    }`}
                                            >
                                                {integration.enabled ? "connected" : "available"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5">{integration.description}</p>
                                    </div>
                                </div>

                                {/* Toggle Switch */}
                                <div
                                    role="switch"
                                    aria-checked={integration.enabled}
                                    onClick={() => toggleIntegration(integration)}
                                    className={`w-10 h-5 rounded-full p-0.5 flex items-center cursor-pointer transition ${integration.enabled ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"}`}
                                >
                                    <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                                </div>

                            </div>

                            {/* Configure button */}
                            {integration.enabled && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mt-4 pt-3 border-t border-gray-200"
                                >
                                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs rounded border border-gray-300 hover:bg-gray-50 transition">
                                        <ExternalLink className="w-3 h-3" /> Configure
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
