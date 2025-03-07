import React, { useEffect } from 'react'
import { getPost } from './api/PostApi';

const App = () => {

  
  const getPostData = async () =>{
    try {
      const res = await getPost();
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getPostData()
  }, [])

  return (
    <div>
      Hello
    </div>
  )
}

export default App
