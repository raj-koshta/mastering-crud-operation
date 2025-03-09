import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import "../App.css"
import Form from "./Form";

export const Posts = () => {

    const [data, setData] = useState([]);
    const [updateDataAPI, setUpdateDataAPI] = useState({});

    const getPostData = async () => {
        try {
            const res = await getPost();
            const result = res.data;
            console.log(result);
            setData(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostData()
    }, [])

    // function to delete post

    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id);
            if (res.status == 200) {
                const newUpdatedPosts = data.filter((curPost) => {
                    return curPost.id != id;
                })
                setData(newUpdatedPosts);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handlePostData

    const handleUpdatePost = (curElem) => setUpdateDataAPI(curElem);

    return (
        <>
            <section className="section-form">
                <Form data={data} setData={setData} updateDataAPI={updateDataAPI} setUpdateDataAPI={setUpdateDataAPI} />
            </section>
            <section className="section-post">
                <ol>
                    {
                        data.map((curElem) => {
                            const { id, body, title } = curElem;
                            return <li key={id}>
                                <p>Title: {title}</p>
                                <p>Body: {body}</p>
                                <button 
                                    onClick={() => { handleUpdatePost(curElem) }}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn-delete" 
                                    onClick={() => { handleDeletePost(id) }}
                                >
                                    Delete
                                </button>
                            </li>
                        })
                    }
                </ol>
            </section>
        </>
    )

}