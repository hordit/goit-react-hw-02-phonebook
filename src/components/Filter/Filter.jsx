export const Filter = ({ value, onChange }) => {
    return (
        <label>
            Fined contacts by name
            <input type="text" value={value} onChange={onChange} />
        </label>
    );
};