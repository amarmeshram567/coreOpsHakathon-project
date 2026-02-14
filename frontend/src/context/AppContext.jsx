import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    const [bookings, setBookings] = useState([]);
    const [forms, setForms] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [items, setItems] = useState([]);
    const [integrations, setIntegrations] = useState([]);

    const [dashboard, setDashboard] = useState([])

    const [staff, setStaff] = useState([]);
    const [workspace, setWorkspace] = useState(null);

    const api = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
    });

    api.interceptors.request.use(config => {
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });




    /** -------------------- AUTH -------------------- **/
    const register = async (data) => {
        const res = await api.post("/auth/register", data);
        return res.data;
    };
    // const login = async (data) => {
    //     const res = await api.post("/auth/login", data);
    //     setUser(res.data.user);
    //     setToken(res.data.accessToken);
    //     return res.data;
    // };

    const login = async (data) => {
        const res = await api.post("/auth/login", data);
        setUser(res.data.user);
        setToken(res.data.accessToken);
        return res.data;
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
        setToken(null);
    };
    const refreshToken = async () => {
        const res = await api.post("/auth/refresh");
        setToken(res.data.accessToken);
        return res.data;
    };

    /** -------------------- BOOKINGS -------------------- **/
    const fetchBookings = async () => {
        const res = await api.get("/bookings");
        setBookings(res.data);
        return res.data;
    };
    const createBooking = async (data) => {
        const res = await api.post("/bookings", data);
        setBookings((prev) => [res.data, ...prev]);
        return res.data;
    };
    const updateBooking = async (id, data) => {
        const res = await api.patch(`/bookings/${id}`, data);
        setBookings((prev) => prev.map(b => b.id === id ? res.data : b));
        return res.data;
    };
    const deleteBooking = async (id) => {
        await api.delete(`/bookings/${id}`);
        setBookings((prev) => prev.filter(b => b.id !== id));
    };

    /** -------------------- FORMS -------------------- **/
    const fetchForms = async () => {
        const res = await api.get("/forms");
        setForms(res.data);
        return res.data;
    };
    const createForm = async (data) => {
        const res = await api.post("/forms", data);
        setForms((prev) => [res.data, ...prev]);
        return res.data;
    };
    const submitForm = async (id, data) => {
        const res = await api.post(`/forms/${id}/submit`, data);
        return res.data;
    };
    const fetchSubmissions = async (id) => {
        const res = await api.get(`/forms/${id}/submissions`);
        setSubmissions(res.data);
        return res.data;
    };

    /** -------------------- MESSAGES / INBOX -------------------- **/
    const fetchMessages = async () => {
        const res = await api.get("/inbox");
        setMessages(res.data);
        return res.data;
    };
    const sendMessage = async (data) => {
        const res = await api.post("/inbox", data);
        setMessages((prev) => [res.data, ...prev]);
        return res.data;
    };

    /** -------------------- INTEGRATIONS -------------------- **/
    const fetchIntegrations = async () => {
        const res = await api.get("/integrations");
        setIntegrations(res.data);
        return res.data;
    };
    const addIntegration = async (data) => {
        const res = await api.post("/integrations", data);
        setIntegrations((prev) => [res.data, ...prev]);
        return res.data;
    };

    /** -------------------- ITEMS -------------------- **/
    const fetchItems = async () => {
        const res = await api.get("/items");
        setItems(res.data);
        return res.data;
    };
    const addItem = async (data) => {
        const res = await api.post("/items", data);
        setItems((prev) => [res.data, ...prev]);
        return res.data;
    };
    const updateItem = async (id, data) => {
        const res = await api.patch(`/items/${id}`, data);
        setItems((prev) => prev.map(i => i.id === id ? res.data : i));
        return res.data;
    };
    const deleteItem = async (id) => {
        await api.delete(`/items/${id}`);
        setItems((prev) => prev.filter(i => i.id !== id));
    };

    /** -------------------- ONBOARDING -------------------- **/
    const completeOnboarding = async () => {
        const res = await api.post("/onboarding/complete");
        return res.data;
    };

    /** -------------------- SETTINGS -------------------- **/
    // const updateSettings = async (data) => {
    //     const res = await api.patch("/settings", data);
    //     return res.data;
    // };

    /** -------------------- STAFF -------------------- **/
    const fetchStaff = async () => {
        const res = await api.get("/staff");
        setStaff(res.data);
        return res.data;
    };
    const addStaff = async (data) => {
        const res = await api.post("/staff", data);
        setStaff((prev) => [res.data, ...prev]);
        return res.data;
    };
    const updateRole = async (id, data) => {
        const res = await api.patch(`/staff/${id}`, data);
        setStaff((prev) => prev.map(s => s.id === id ? res.data : s));
        return res.data;
    };
    const removeStaff = async (id) => {
        await api.delete(`/staff/${id}`);
        setStaff((prev) => prev.filter(s => s.id !== id));
    };

    /** -------------------- WORKSPACE -------------------- **/
    const fetchWorkspace = async () => {
        const res = await api.get("/workspace");
        setWorkspace(res.data);
        return res.data;
    };
    const createWorkspace = async (data) => {
        const res = await api.post("/workspace", data);
        setWorkspace(res.data);
        return res.data;
    };
    const updateWorkspace = async (data) => {
        const res = await api.patch("/workspace", data);
        setWorkspace(res.data);
        return res.data;
    };



    const fetchDashboard = async () => {
        try {
            const { data } = api.get("/dashboard");
            setDashboard(data)
        } catch (error) {
            console.log(error)
        }
    }


    /** -------------------- SETTINGS / WORKSPACE UPDATE -------------------- **/
    const updateSettings = async (data) => {
        try {
            // Make a PATCH request to backend /settings route
            const res = await api.patch("/settings", data);

            // If workspace fields were updated, update workspace state locally
            if (workspace) {
                setWorkspace((prev) => ({
                    ...prev,
                    ...data, // merge updated fields like timezone, currency, etc.
                }));
            }

            return res.data;
        } catch (error) {
            console.error("Failed to update settings:", error);
            throw error;
        }
    };


    const value = {
        user,
        token,
        loading,
        setLoading,
        bookings,
        forms,
        submissions,
        messages,
        items,
        integrations,
        staff,
        workspace,
        dashboard,
        fetchDashboard,
        register,
        login,
        logout,
        refreshToken,
        fetchBookings,
        createBooking,
        updateBooking,
        deleteBooking,
        fetchForms,
        createForm,
        submitForm,
        fetchSubmissions,
        fetchMessages,
        sendMessage,
        fetchIntegrations,
        addIntegration,
        fetchItems,
        addItem,
        updateItem,
        deleteItem,
        completeOnboarding,
        updateSettings,
        fetchStaff,
        addStaff,
        updateRole,
        removeStaff,
        fetchWorkspace,
        createWorkspace,
        updateWorkspace,
        api, // raw access if needed
        isAuthenticated: !!user,
    }


    return (
        <AppContext.Provider
            value={value}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
