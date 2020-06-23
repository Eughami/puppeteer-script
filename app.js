let bodyParser = require('body-parser');
var cors = require('cors');
const express = require("express");
// const puppeteer =require("puppeteer")
// const axios = require("axios")
// let MongoClient = require('mongodb').MongoClient;
// const moment =  require ('moment')
const testController = require("./controllers/TestController");

// db instance connection
require("./config/db");

const app = express();

const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// API ENDPOINTS


// function delay(time) {
//   return new Promise(function(resolve) { 
//       setTimeout(resolve, time)
//   });
// }
// app.post('/', async(req,res) =>{
//   const ChromeOptions = {
//     executablePath:'/usr/bin/google-chrome',
//     headless:false,
//     slowMo:10,
//     defaultViewport:null
//   }
//   let returnP =  new Promise(async function(resolve,reject) {
//     try
//     {
//       const browser = await puppeteer.launch(ChromeOptions);
//       const page = await browser.newPage();
//       console.log(req.body.value.url)
//       //get the campaign
//       await page.goto(`${req.body.value.url}/?campaignId=${req.body.value.campaignId}`, {waitUntil: 'networkidle2'});
//       let campaign = await page.$eval('#campaign', (el => el.value));
//       console.log("campaign id : ", campaign)
      
//       //fill the form
//       await page.type('#inputFirstNameId', req.body.value.first_name);
//       await page.type('#inputLastNameId', req.body.value.last_name);
//       await page.type('#inputEmailId', req.body.value.email);
//       await delay(6000);
//       await page.type('#inputPhoneId', req.body.value.phone_number);
//       await page.click('#buttonSend');
//       console.log('send info')      
//       // await page.waitForNavigation()
//       await delay(6000)
//       console.log('new page loaded')


//       let SuccessOrFail = false
//       if(page.url() == "https://traderlogin.zone/bufferLpSubmit/secureRealRegister_newcrm.php")
//         SuccessOrFail = true
       
//       let result = null
        
//       if(SuccessOrFail){
//         result = await page.evaluate(() =>
//         {
//           let myarr= []
//           let test = document.querySelectorAll('p')
//           test.forEach((item) =>
//           {
//             myarr.push({
//               paragraph: item.innerText
//             })
//           })
//           return  myarr
//         })

//       }else{
//         result = []
//       }
      
//       console.log('done')

//       //take a screenshot of the page

//       // const el = await page.$('form');
//       // el.screenshot({ path: 'capture.png'});

//       await page.setViewport({
//         clip: {x: 215, y: 0, width: 390, height: 50},
//         width: 1280,
//         height: 720,
//         deviceScaleFactor: 1,
//       });
//       let timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a')
//       await page.screenshot({path: `test${timeStamp}.png`});
//       await browser.close();

//       //define success or fail Msg
//       let succesMsg= ""
//       if(SuccessOrFail)
//          succesMsg = "Success"
//       else
//         succesMsg = "Fail"


//       //return the resolve
//       resolve({
//         "firstName":req.body.value.first_name,
//         "lastName":req.body.value.last_name,
//         "LP_URL":req.body.value.url,
//         "email":req.body.value.email,
//         "phone":req.body.value.phone_number,
//         "Campaign":campaign,
//         "testStatus": SuccessOrFail,
//         "testMsg":succesMsg,
//         // "timeStamp": timeStamp,
//         result}
//       )
//       // return fresponse

//     }catch (e)
//     {
//       return reject(e)
//     }
    
//   });
//   returnP.then(async function(value)
//   {
//     //mongoose server
//     axios.post('http://localhost:3301/tests', {
//       value: value
//      })
//      .then((r) => {
//        console.log("Sucessfully Inserted");
//      }, (er) => {
//        console.log(er);
//      });
//     console.log(value)
//   })
//   returnP.catch(console.error)
// })
app
  .route("/tests")
  .get(testController.listAllTests)
  .post(testController.createNewTest);

app
  .route("/tests/:testid")
  .get(testController.readTest)
  .put(testController.updateTest)
  .delete(testController.deleteTest);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
