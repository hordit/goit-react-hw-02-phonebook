export const Contact = ({
    contact: { id, name, number }, onDelete
}) => {
    return <div>
        <p>{name}: {number}</p>
        <button aria-label="Delete" onClick={() => onDelete(id)}>Delete</button>
    </div>
}