import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => (
    <table className="table table-bordered table-striped table-dark table-hover">
        <thead>
            <tr>
                <th>NAME</th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th>EDIT</th>
                <th>DELETE</th>
            </tr>
        </thead>
        <tbody>
            {users.map(item => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                        <button className="btn btn-primary" onClick={() => onEdit(item)}>
                            Edit
                        </button>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={() => onDelete(item.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default UserTable;
