import React from 'react';

const UserForm = ({ user, isEditing, onChange, onSubmit, onCancel }) => (
    <form onSubmit={onSubmit}>
        <div className='form-group'>
            <label>Enter Name:</label>
            <input
                type='text'
                placeholder='Name'
                className='form-control'
                value={user.name}
                onChange={(e) => onChange({ ...user, name: e.target.value })}
            />
        </div>
        <div className='form-group'>
            <label>Enter Number:</label>
            <input
                type='text'
                placeholder='Number'
                className='form-control'
                value={user.phone}
                onChange={(e) => onChange({ ...user, phone: e.target.value })}
            />
        </div>
        <div className='form-group'>
            <label>Enter Email:</label>
            <input
                type='email'
                placeholder='Email'
                className='form-control'
                value={user.email}
                onChange={(e) => onChange({ ...user, email: e.target.value })}
            />
        </div>
        <br />
        <div className='d-grid'>
            <input
                type='submit'
                value={isEditing ? 'Update' : 'Submit'}
                className={`btn ${isEditing ? 'btn-warning' : 'btn-primary'}`}
            />
        </div>
        {isEditing && (
            <div className='d-grid mt-2'>
                <button type='button' className='btn btn-secondary' onClick={onCancel}>
                    Cancel
                </button>
            </div>
        )}
    </form>
);

export default UserForm;
