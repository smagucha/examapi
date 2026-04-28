function ReusableSelect({ label, name, options, value, onChange }) {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <select name={name} value={value} onChange={onChange} required className="form-select">
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={option.id || index} value={option.id}>
                        {option.name || option.title}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default ReusableSelect;
