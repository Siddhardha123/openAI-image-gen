import {Configuration,OpenAIApi} from 'openai'
const config = new Configuration({
    apiKey : process.env.API,
});


const openai = new OpenAIApi(config);
const generateImage = async (req,res) =>{
       try {
          const resp = await openai.createImage({
            prompt : 'polar bear on ice skates',
            n:1,
            size : '512x512'
          })

          const imageUrl = resp.data.data[0].url;
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