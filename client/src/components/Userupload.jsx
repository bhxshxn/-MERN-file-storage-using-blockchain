import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'

function Userupload() {
    const [file, setFile] = useState('')
    const [title, setTitle] = useState('')
    const [p, setP] = useState("Drag your files here or click in this area.")
    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
        setP(e.target.files[0].name)
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const Submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title)
        formData.append('user', Cookies.get('user'))
        try {
            const res = await axios.post('/user/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res) {
                toast.success("File saved Successfully")
                setFile("")
                setTitle("")
                setP("Drag your files here or click in this area.")
            } else {
                toast.error("Unsuccess")
                setFile("")
                setTitle("")
                setP("Drag your files here or click in this area.")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="flex-box">
                <div className="title-box">
                    {/* <label className="label-for-title">Title For File:</label> */}
                    <input type="text" value={title} onChange={onChangeTitle} placeholder="Name for file..." />
                </div>
                <form onSubmit={Submit} className="form">
                    <input type="file" onChange={onChangeFile} />
                    <p>{p}</p>
                    <button type="submit">Upload</button>
                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div >
        </>
    )
}

export default Userupload
