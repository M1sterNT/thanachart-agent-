
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const route = require('./route')
const app = express()
const port = (process.env.PORT || '3000');

app.use(cors())
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));

app.get('/', (req, res) => res.send('Hello World!'))


app.use('/apis/', route);


app.listen(port, () => console.log(`backend app listening on port ${port}!`))




//main()
async function main(){
  //let data = await UploadImage("")
   let FaceID_data = await getFaceID(data.url)
   console.log(FaceID_data)
}



