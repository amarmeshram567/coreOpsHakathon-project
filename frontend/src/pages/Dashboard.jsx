import { motion } from 'framer-motion';
import { CalendarDays, DollarSign, AlertTriangle, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import AnimatedCounter from '../components/AnimatedCounter';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

const revenueData = [
    { month: 'Jan', revenue: 4200 }, { month: 'Feb', revenue: 5800 },
    { month: 'Mar', revenue: 4900 }, { month: 'Apr', revenue: 7200 },
    { month: 'May', revenue: 6100 }, { month: 'Jun', revenue: 8400 },
    { month: 'Jul', revenue: 7600 }, { month: 'Aug', revenue: 9200 },
    { month: 'Sep', revenue: 8100 }, { month: 'Oct', revenue: 10500 },
    { month: 'Nov', revenue: 9800 }, { month: 'Dec', revenue: 12400 },
];

const bookingsData = [
    { day: 'Mon', count: 12 }, { day: 'Tue', count: 19 },
    { day: 'Wed', count: 15 }, { day: 'Thu', count: 22 },
    { day: 'Fri', count: 28 }, { day: 'Sat', count: 35 },
    { day: 'Sun', count: 18 },
];

const metrics = [
    { label: 'Total Bookings', value: 1284, icon: CalendarDays, change: '+12.5%', color: 'text-primary' },
    { label: 'Revenue', value: 48250, icon: DollarSign, prefix: '$', change: '+8.2%', color: 'text-success' },
    { label: 'Low Stock Alerts', value: 7, icon: AlertTriangle, change: '-3', color: 'text-warning' },
    { label: 'Staff Members', value: 24, icon: Users, change: '+2', color: 'text-primary' },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const Dashboard = () => {

    const { dashboard, fetchDashboard } = useAppContext()
    console.log(dashboard)


    useEffect(() => {
        fetchDashboard()
    }, [dashboard])


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Overview of your business metrics</p>
            </div>

            {/* Metrics Cards */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {metrics.map((metric) => (
                    <motion.div
                        key={metric.label}
                        variants={item}
                        className="glass-card p-6 hover-lift cursor-default group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${metric.color}`}>
                                <metric.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-success flex items-center gap-1">
                                {metric.change}
                                <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                            <AnimatedCounter end={metric.value} prefix={metric.prefix} />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-foreground">Revenue Overview</h3>
                            <p className="text-sm text-muted-foreground">Monthly revenue trend</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-success">
                            <TrendingUp className="w-4 h-4" />
                            +18.2%
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(187, 94%, 43%)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(187, 94%, 43%)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                            <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                            <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(222, 47%, 9%)',
                                    border: '1px solid hsl(222, 30%, 18%)',
                                    borderRadius: '8px',
                                    color: 'hsl(210, 40%, 96%)',
                                }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="hsl(187, 94%, 43%)" fill="url(#colorRevenue)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-6"
                >
                    <h3 className="font-semibold text-foreground mb-1">Weekly Bookings</h3>
                    <p className="text-sm text-muted-foreground mb-6">This week's activity</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={bookingsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                            <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                            <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(222, 47%, 9%)',
                                    border: '1px solid hsl(222, 30%, 18%)',
                                    borderRadius: '8px',
                                    color: 'hsl(210, 40%, 96%)',
                                }}
                            />
                            <Bar dataKey="count" fill="hsl(187, 94%, 43%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
