import React from 'react'
import axios from 'axios'
import { Input,Container,Button,Select,Spinner } from '@chakra-ui/react'
import { useState} from 'react'
const Form = () => {
  
   const [prompt,setPrompt] = useState('')
   const [count,setCount] = useState()
   const [size,setSize] = useState('')
   const [loading,setLoading] = useState(false)
   const [postdata,setPostdata] = useState()
   const handleSubmit = (e)=>{
        e.preventDefault()
        setLoading(true) 
        axios.post('http://localhost:3001/openai/generateimage',{prompt,size,count}).then((res) => {
         setPostdata(res.data)
         // console.log(res.data)
         setLoading(false)
      })
     .catch(error => console.log(error)) 
   }
   if(postdata){
      console.log(postdata)
   }
  
  return (
    
      <div className='max-w-full p-10 justify-center place-content-center   m-auto'> 
         <form action="" onSubmit={handleSubmit}>
         <Container className='flex-col justify-between'>
             <h1 className='text-center py-5'>Convert your prompt into an AI generated image</h1>
         <Input placeholder="prompt" value={prompt} onChange={(e)=>{
               setPrompt(e.target.value)
         }} />
         <div className='py-5 flex'>
         <Select placeholder='size'value={size} onChange={(e)=>{
               setSize(e.target.value)
         }}  >
            <option value='small'>small</option>
            <option value='medium'>medium</option>
            <option value='large'>large</option>
         </Select>
         <Input placeholder="count" value={count} type="number" onChange={(e)=>{
               setCount(Number(e.target.value))
         }} />
         </div>
         <div className='py-5'>
            <Button type="submit"  >generate</Button>
         </div>       
         </Container >
         </form>
         <div className='flex flex-wrap gap-10 items-center justify-center'>
            {loading == false ? postdata && postdata.data.map((item)=>(
               <div className='p-5'> 
                 <img src={item.url} alt="image" />
               </div>
            )) : <Spinner />}
         </div>
        
      </div>
      

  )
}

export default Form