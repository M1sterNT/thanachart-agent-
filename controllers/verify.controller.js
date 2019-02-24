const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const base_url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0"
const Validator = require('validatorjs');
const config = {
    headers: { 'Content-Type': 'application/json' ,'Ocp-Apim-Subscription-Key' :'ab6ac674a7684a9abc6623b7e5e7c9db' }
  };
async function getFaceID(url){

    const payload = {
        url: url
      };
    const url_api = base_url + '/detect?returnFaceId=true&returnFaceLandmarks=false';
    let body = await axios.post(url_api, JSON.stringify(payload),config);
    return body.data[0];
}
async function getVerify(face_id1,face_id2){
    const payload = {
        faceId1: face_id1,
        faceId2: face_id2
      };
    const url_api = base_url + '/verify';
    let body = await axios.post(url_api, JSON.stringify(payload),config);
    return body.data;
}

function UploadImage(image_base64) {
    return new Promise((resolve,reject) => {
     cloudinary.uploader.upload(image_base64,
         function (error, result) {
             if (error == undefined) {
                 resolve(result)
             }else{
                 reject(error)
             }
         });
    })
 }

 const Verify = function (req, res) {
    const rules = {
        images1: 'required',
        images2: 'required'
      }

      let validation = new Validator(req.body, rules);
      validation.passes(async function () {
        let data_img1 = await UploadImage(req.body.images1)
        let data_img2 = await UploadImage(req.body.images2)

        let face_id1 = await getFaceID(data_img1.url)
        let face_id2 = await getFaceID(data_img2.url)
        console.log(face_id1,face_id2)
        if (face_id1 != undefined && face_id1 != "" && face_id2 != undefined && face_id2 != "" ) {
            let result = await getVerify(face_id1.faceId,face_id2.faceId)
            console.log(face_id1,face_id2)
            res.status(200).json({ result })
        }else{
            res.status(200).json({
                "result": {
                "isIdentical": false,
                "confidence": 0
            } })
        }

      })
      validation.fails(function () {
        res.status(200).json(validation.errors)
      })
}
module.exports = Verify;