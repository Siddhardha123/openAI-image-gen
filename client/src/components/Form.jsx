import {Configuration,OpenAIApi} from 'openai'

import env from "react-dotenv";
import React from 'react'
import { Input,Container,Button,Select,Spinner } from '@chakra-ui/react'
import { useState} from 'react'

const Form = () => {
   //  console.log(env.API_KEY)
   const config = new Configuration({
      apiKey : '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',
  });
  const openai = new OpenAIApi(config);
 
  
   const [prompt,setPrompt] = useState('')
   const [count,setCount] = useState()
   const [size,setSize] = useState('')
   const [loading,setLoading] = useState(false)
   const [postdata,setPostdata] = useState()
   const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true) 
        const imageSize = size === 'small' ? 
        '256x256' : size === 'medium' ? '512x512': '1024x1024'
   const resp = await openai.createImage({
      prompt : prompt,
      n: count,
      size : imageSize,
    })
    setPostdata(resp.data)
    setLoading(false)
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