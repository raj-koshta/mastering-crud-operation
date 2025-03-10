import React, { useEffect, useState } from 'react'
import { postData, updateData } from '../api/PostApi';

const Form = ({ data, setData, updateDataAPI, setUpdateDataAPI }) => {

    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })

    let isEmpty = Object.keys(updateDataAPI).length === 0

    // get the updated data and add into input field

    useEffect(() => {
        updateDataAPI && setAddData({
            title: updateDataAPI.title || "",
            body: updateDataAPI.body || "",
        })
    }, [updateDataAPI])

    const handleInputChnage = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const addPostData = async () => {
        try {
            const res = await postData(addData);
            console.log(res);
            if (res.status === 201) {
                setData([...data, res.data])
                setAddData({ title: "", body: "" });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updatePostData = async () => {
        try {
            const res = await updateData(updateDataAPI.id, addData);
            console.log(res)

            if(res.status === 200) {
                setData((prev)=>{
                    return prev.map((curEle)=>{
                        return curEle.id === res.data.id ? res.data : curEle
                    })
                })
                setAddData({ title: "", body: "" });
                setUpdateDataAPI({})
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Form submittion
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if (action === "Add") {
            addPostData();
        } else if (action === "Edit") {
            updatePostData();
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor='title'></label>
                <input
                    type='text'
                    autoComplete='off'
                    id='title'
                    name='title'
                    placeholder='Add Title'
                    value={addData.title}
                    onChange={handleInputChnage}
                />
            </div>
            <div>
                <label htmlFor='body'></label>
                <input
                    type='text'
                    autoComplete='off'
                    id='body'
                    name='body'
                    placeholder='Add Post'
                    value={addData.body}
                    onChange={handleInputChnage}
                />
            </div>
            <button type='submit' value={isEmpty ? "Add" : "Edit"}>
                {isEmpty ? "Add" : "Edit"}
            </button>
        </form>
    )
}

export default Form