import {Configuration,OpenAIApi} from 'openai'
import dotenv from 'dotenv'
dotenv.config()
const config = new Configuration({
    apiKey : process.env.API_KEY,
});

const openai = new OpenAIApi(config);
const generateImage = async (req,res) =>{
     const {prompt , size, count}= req.body;
     const imageSize = size === 'small' ? 
     '256x256' : size === 'medium' ? '512x512': '1024x1024'
       try {
          const resp = await openai.createImage({
            prompt : prompt,
            n: count,
            size : imageSize,
          })

          const imageUrl = resp.data.data;
          res.status(200).json({
            success : true,
            data : imageUrl
          })
       } catch (error) {
        res.status(400).json({
            success : false,
            error : 'image cannot be generated'
          })
          console.log(error)
       }
}


export default {
    generateImage,
}