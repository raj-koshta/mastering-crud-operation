import React, { useState } from 'react'
import { postData } from '../api/PostApi';

const Form = ({ data, setData }) => {

    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })

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

    const addPostData = async ()=>{
        const res = await postData(addData);
        console.log(res);
        if(res.status === 201){
            setData([...data, res.data])
            setAddData({title:"",body:""});
        }
    }

    //Form submittion
    const handleFormSubmit = (e) =>{
        e.preventDefault();
        addPostData();
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
            <button type='submit'>Add</button>
        </form>
    )
}

export default Form