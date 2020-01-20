const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const URL = 'https://auto.ria.com/newauto/marka-volkswagen/';
const HOST = 'https://auto.ria.com';
const HEADERS  = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36';

const CONFIG = {
    headers: {'user-agent': HEADERS}
};

const getHtml = async (URL, CONFIG)=>{
    try{
        const res = await axios.get(URL,CONFIG);
        const data = res.data;
        // console.log(data);
        return data;
    }
    catch (e) {
        console.error(e);
    }
}


const getContent = async()=>{
    const html = await getHtml(URL, CONFIG);
    const parse = [];
    const $ = cheerio.load(html);
    $('.na-gallery-view  .na-card-item').each((i,elem) => {
        uah_price = $(elem).find('.size15').text()
        // if(uah_price == ''){
        //     uah_price = $(elem).find('.size15').text()
        // }
        // else{
        //     uah_price = 'Уточняйте'
        // };
        parse.push({
            uah_price: $(elem).find('.size15').text().replace(' • ', ''),
            title: $(elem).find('.size18').text(),
            link: HOST + $(elem).attr('href')
        })
    })
    console.log(parse);
}

getContent();


// const getHtml = async (URL, HEADERS)=>{
//     

//     return await axios.get(URL,config)
//         .then((response)=>{
//             // console.log(response.data)
//         })
//         .catch((error)=> {
//         // handle error
//             console.log(error);
//         })
// }

// const html = getHtml(URL, HEADERS);

// console.log(html);

// const parse = ()=>{
//     const html = getHtml(URL, HEADERS);
//     // if(html.status = 200){
//     //     console.log("200");
//     // }
//     // else {
//     //     console.log('else')
//     // }
//     console.log(html);
// }

// parse();
 

//  console.log(response.data);

// let getData = (html) =>{
//     data =[];
//     const $ = cheerio.load(html);
//     $('table table tr td:nth-child(3)').each((i,elem) => {
//         data.push({
//             title: $(elem).text(),
//             link: $(elem).find('a.storylink').attr('href')
//         })
//     })
//     console.log(data);
// }

