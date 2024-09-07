
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import UserTable from './UserTable';

const Read = () => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", phone: "", email: "" });
    const [editUser, setEditUser] = useState({ id: "", name: "", phone: "", email: "" });

    const getData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setApiData(response.data);
        } catch (error) {
            setError('Error fetching data.');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const { name, phone, email } = newUser;
        if (!name || !phone || !email) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
                name,
                phone,
                email
            });

            setApiData([...apiData, response.data]);
            setNewUser({ name: "", phone: "", email: "" });
            setShowForm(false);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            setApiData(apiData.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        const { id, name, phone, email } = editUser;
        if (!name || !phone || !email) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
                name,
                phone,
                email
            });

            setApiData(apiData.map(user => user.id === id ? response.data : user));
            setEditUser({ id: "", name: "", phone: "", email: "" });
            setShowEditForm(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleEditClick = (user) => {
        setEditUser(user);
        setShowEditForm(true);
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="row">
            <div className="col-md-12">
                    <h1 className="text-center my-4 bg-secondary text-bolder">User Management Application</h1>
                <div className="mb-2 mt-2">
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Hide Form" : "Create New User"}
                    </button>
                </div>
                {showForm && !showEditForm && (
                    <UserForm
                        user={newUser}
                        isEditing={false}
                        onChange={setNewUser}
                        onSubmit={handleAddUser}
                        onCancel={() => setShowForm(false)}
                    />
                )}
                {showEditForm && (
                    <UserForm
                        user={editUser}
                        isEditing={true}
                        onChange={setEditUser}
                        onSubmit={handleEditUser}
                        onCancel={() => setShowEditForm(false)}
                    />
                )}
                <br />
                <UserTable
                    users={apiData}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteUser}
                />
            </div>
        </div>
    );
};

export default Read;
