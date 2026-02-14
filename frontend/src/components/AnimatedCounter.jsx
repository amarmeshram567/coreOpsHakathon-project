import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';



const AnimatedCounter = ({ end, duration = 1.5, prefix = '', suffix = '', decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef < HTMLSpanElement > (null);

    useEffect(() => {
        let startTime
        let animationFrame

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(eased * end);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold tabular-nums"
        >
            {prefix}{count.toFixed(decimals)}{suffix}
        </motion.span>
    );
};

export default AnimatedCounter;
