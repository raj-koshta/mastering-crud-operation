import { useEffect, useState } from "react";
import { getPost } from "../api/PostApi";
import "../App.css"

export const Posts = () =>{

    const [data, setData] = useState([]);

    const getPostData = async () =>{
        try {
          const res = await getPost();
          const result = res.data;
          console.log(result);
          setData(result);
        } catch (error) {
          console.log(error);
        }
    }
    
    useEffect(()=> {
    getPostData()
    }, [])

    return  <section className="section-post">
        <ol>
            {
                data.map((curElem)=>{
                    const {id,body,title} = curElem;
                    return <li key={id}>
                        <p>Title: {title}</p>
                        <p>Body: {body}</p>
                        <button>Edit</button>
                        <button className="btn-delete">Delete</button>
                    </li>
                })
            }
        </ol>
    </section>
}