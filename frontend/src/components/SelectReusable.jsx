import "../css/TakeAttendance.css";
function SelectReusable({ label, name, options, value, onChange }) {
    return (
        <div className="form-group">
            <label className="form-label">
                {label}<span className="required">*</span>
            </label>
            <select name={name} value={value} onChange={onChange} className="form-select">
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
export default SelectReusable;
