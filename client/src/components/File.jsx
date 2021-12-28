import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { saveAs } from 'file-saver';

function File() {
    const [file, setFile] = useState('')
    const [title, setTitle] = useState('')
    const [p, setP] = useState("Drag your files here or click in this area.")
    const [dataFile, setDataFile] = useState([])
    var count = 0

    useEffect(async () => {
        const res = await axios.post('/user/getfiles', { "user": Cookies.get('user') })
        await setDataFile(res.data)
        console.log(dataFile)
    }, [])

    const downloadFile = async (link, name) => {
        const { data } = await getFile(name)
        const blob = new Blob([data], { type: `application/${link.split('.').pop()}` })
        saveAs(blob, `${name}.${link.split('.').pop()}`)
    }

    const getFile = async (name) => {
        return axios.get(`/download/${name}`, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'arraybuffer'
        })
    }
    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
        setP(e.target.files[0].name)
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const search = async (e) => {
        e.preventDefault();
    }
    const Submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title)
        // console.log(formData)
        try {
            const res = await axios.post('/public/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res)
            if (res.status == 200) {
                toast.success("File saved Successfully")
                setFile("")
                setTitle("")
                setP("Drag your files here or click in this area.")
            } else if (res.status == 500) {
                toast.error("Unsuccess")
                setFile("")
                setTitle("")
                setP("Drag your files here or click in this area.")
            } else {
                toast.error("Title already used")
                setFile("")
                setTitle("")
                setP("Drag your files here or click in this area.")
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (Cookies.get('user')) {
        if (dataFile.length == 0) {
            return (
                <div class="alert alert-warning container mt-4" role="alert">
                    No Files Uploaded Yet!!!
                </div>
            )
        } else {
            return (
                <>
                    <div className="main container">
                        <div className="search-file">
                            <form onSubmit={(e) => search(e)}>
                                <input type="text" value={title} onChange={onChangeTitle} placeholder="Name for file..." />
                                <button className="btn btn-primary">Search</button>
                            </form>
                        </div>
                        <div className="files-show">
                            <table class="table table-borderless">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">View/Download/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataFile.map((ele) => {
                                        count++
                                        return (<tr  >
                                            <th scope="row">{count}</th>
                                            <td>{ele.title}</td>
                                            <td>{ele.location.split('.').pop().toUpperCase()}</td>
                                            <td><button onClick={() => window.open(`http://localhost:5000/${ele.location.split('c/').pop()}`, "_blank")} className="preview btn btn-primary" > <i class="fas fa-eye"></i></button>
                                                <button onClick={(e) => downloadFile(ele.location, ele.title)} className="download btn btn-success"><i class="fas fa-download"></i></button>
                                                <button className="btn btn-primary"><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )
        }
    } else {
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
}

export default File
