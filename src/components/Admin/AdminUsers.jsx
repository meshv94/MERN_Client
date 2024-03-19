import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const handleDelete = useCallback(async (id) => {
        try {
            const response = await fetch("https://mern-server-q0i1.onrender.com/api/admin/deleteUser", {
                method: "DELETE",
                headers: {
                    user_id: id
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast.error(data.msg);
                // Manually trigger a re-render after successful deletion
                fetchData(localStorage.getItem('token'));
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            toast.error(error.toString());
        }
    }, []); // Empty dependency array since there are no external dependencies

    const fetchData = useCallback(async (token) => {
        try {
            const response = await fetch("https://mern-server-q0i1.onrender.com/api/admin/users", {
                method: "GET",
                headers: {
                    token: token
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                toast.error("You don't have admin rights");
            }
        } catch (error) {
            toast.error(error.toString());
        }
    }, [setUsers]); // Include setUsers as a dependency for useCallback

    useEffect(() => {
        fetchData(localStorage.getItem('token'));
    }, [fetchData]); // Include fetchData as a dependency

    return (
        <>
            <table className="">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Phone</th>
                        <th className="py-2">Edit</th>
                        <th className="py-2">Delete</th>
                    </tr>
                </thead>
                <tbody className='admin-users'>
                    {users && users.map((user, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="py-2">{user.username}</td>
                            <td className="py-2">{user.email}</td>
                            <td className="py-2">{user.phone}</td>
                            <td className="py-2"> <a>Edit</a> </td>
                            <td className="py-2"> <button onClick={() => handleDelete(user._id)}>Delete</button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default AdminUsers
