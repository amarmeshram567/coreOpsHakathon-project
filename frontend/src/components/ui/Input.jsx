// components/ui/Input.jsx
import * as Label from "@radix-ui/react-label";

export default function Input({ id, label, type, placeholder, value, onChange, icon: Icon }) {
    return (
        <div className="space-y-1 relative">
            {label && (
                <Label.Root htmlFor={id} className="text-sm text-gray-600">
                    {label}
                </Label.Root>
            )}
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                className={`w-full pl-10 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring focus:border-blue-300`}
            />
        </div>
    );
}
