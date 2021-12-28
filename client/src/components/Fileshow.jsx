import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Fileshow(data) {
    const [fileLink, setFileLink] = useState('');
    const [name, setName] = useState('');
    useEffect(async () => {
        const res = await axios.post('/public/searchfile', { title: data.data })
        if (res.data.length == 1) {
            setName(res.data[0].title)
            setFileLink(res.data[0].location)
        } else {
            toast.error("Unsuccess")
        }
    }, [])
    const downloadFile = async (e) => {
        const { data } = await getFile()
        const blob = new Blob([data], { type: `application/${fileLink.split('.').pop()}` })
        saveAs(blob, `${name}.${fileLink.split('.').pop()}`)
    }

    const getFile = async () => {
        return axios.get(`/download/${name}`, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'arraybuffer'
        })
    }
    return (
        <>
            <div className="flex-column">
                <div className="file-box">
                    <p style={{ color: "white", fontSize: "20px" }}>{name}</p>
                    <div className="btn-box">
                        <button onClick={() => window.open(`http://localhost:5000/${fileLink.split('c/').pop()}`, "_blank")} className="preview btn btn-primary" > <i class="fas fa-eye"></i></button>
                        <button onClick={(e) => downloadFile()} className="download btn btn-success"><i class="fas fa-download"></i></button>
                        {/* <img src="http://localhost:5000/imports/1628765390925-myw3schoolsimage.jpg" alt="" /> */}
                    </div>
                </div>
            </div>
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
        </>
    )
}

export default Fileshow
