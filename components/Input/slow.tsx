import { ChangeEvent, useEffect, useState } from "react";

interface SlowInputProps {
    onChange: (value: string) => void;
    value: string;
    disabled: boolean;
}

const SlowInput = ({ value, onChange, disabled = false }: SlowInputProps) => {
    const [localValue, setLocalValue] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => onChange(localValue), 500);
        return () => clearTimeout(timeout);
    }, [localValue]);

    useEffect(() => setLocalValue(value), [value]);

    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLocalValue(value);
    };

    return (
        <input
            onChange={onValueChange}
            value={localValue}
            type="text"
            className="mt-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 py-2 px-4 w-full rounded-md focus:outline-none ring-gray-400 focus:ring-4 transition"
            id="subject"
            placeholder="EXAM SUBJECT YEAR/PAPER/QUESTION"
            disabled={disabled}
        />
    );
};

export default SlowInput;
