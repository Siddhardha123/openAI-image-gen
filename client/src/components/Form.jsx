import React from 'react'
import axios from 'axios'
import { Input,Container,Button,Select } from '@chakra-ui/react'
import { useState } from 'react'
import Display from './Display';
const Form = () => {
   
   const [prompt,setPrompt] = useState('')
   const [size,setSize] = useState('')
   const [loading,setLoading] = useState()
   const [postdata,setPostdata] = useState({})
   const handleSubmit = (e)=>{
        e.preventDefault()
        setLoading(true)
        axios.post('http://localhost:3001/openai/generateimage',{
            prompt,
            size,
            "count" : 5,
        }).then((res) => {
            setPostdata(res.data)
            console.log(res.data)
            setLoading(false)
         })
        .catch(error => console.log(error))  
   }
  return (
    
      <div className='max-w-full p-10 justify-center place-content-center   m-auto'> 
         <form action="" onSubmit={handleSubmit}>
         <Container className='flex-col justify-between'>
             <h1 className='text-center py-5'>Convert your prompt into an AI generated image</h1>
         <Input placeholder="prompt" value={prompt} onChange={(e)=>{
               setPrompt(e.target.value)
         }} />
         <div className='py-5'>
         <Select placeholder='size'value={size} onChange={(e)=>{
               setSize(e.target.value)
         }}  >
            <option value='small'>small</option>
            <option value='medium'>medium</option>
            <option value='large'>large</option>
         </Select>
         </div>
         <div className='py-5'>
            <Button type="submit"  >generate</Button>
         </div>       
          <p>{"iosrghi" + loading}</p>
         </Container >
         </form>
         <div>
            {postdata && postdata.data.map((gg)=>{
                <>
                   <img src={gg.url} alt="" />
                </>
            })}
         </div>
        
      </div>
      

  )
}

export default Form