import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify';

const AdminContact = () => {
    const [contact, setContact] = useState([]);

    const handleDelete = useCallback(async (id) => {
        try {
            const response = await fetch("https://mern-server-q0i1.onrender.com/api/admin/deletecontact", {
                method: "DELETE",
                headers: {
                    contact_id: id
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

    const fetchData = async (token) => {
        try {
            const response = await fetch("https://mern-server-q0i1.onrender.com/api/admin/contacts", {
                method: "GET",
                headers: {
                    token: token
                }
            })
            if (response.ok) {
                const data = await response.json()
                // console.log('data on admin ', data)
                setContact(data);
            } else {
                toast.error(" you don't have admin rights")
            }
        } catch (error) {
            toast.error(error.toString())
        }
    }

    useEffect(() => {
        fetchData(localStorage.getItem('token'));
    }, []);
    return (
        <>
            <div className="admin-contact">
                {
                    contact && contact.map((item, index) => {
                        return (
                            <div className='admin-contact-item'>
                                <p>{item.email}</p>
                                <p>{item.message}</p>
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default AdminContact
