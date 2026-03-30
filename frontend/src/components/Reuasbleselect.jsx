function ReusableSelect({ label, name, options, value, onChange }) {
    return (
        <div>
            <label>{label}</label>
            <select name={name} value={value} onChange={onChange}>
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

// Usage:
<ReusableSelect 
    label="Class"
    name="class"
    options={data.classes}
    value={formData.class}
    onChange={handleChange}
/>