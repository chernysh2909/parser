const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const json2xls = require('json2xls');

const URL = 'https://auto.ria.com/newauto/marka-audi/';
const HOST = 'https://auto.ria.com';
const HEADERS  = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36';

const CONFIG = {
    headers: {'user-agent': HEADERS}
};

const getHtml = async (URL, CONFIG)=>{
        const res = await axios.get(URL,CONFIG);
        const data = res.data;
        // console.log(data);
    return data;
}


const getContent = async()=>{
    const html = await getHtml(URL, CONFIG);
    const parse = [];
    const $ = cheerio.load(html);
    $('.na-gallery-view  .na-card-item').each((i,elem) => {
        uah_price = $(elem).find('.size15').text()
        if(uah_price == ''){
            uah_price = 'Уточняйте'
        }
        else{
            uah_price = $(elem).find('.size15').text().replace(' • ', '')
        }
        parse.push({
            uah_price: uah_price,
            title: $(elem).find('.size18').text(),
            link: HOST + $(elem).attr('href')
        })
    })
    return parse;
    // console.log(parse);
}

const writeExcel = async()=>{
    console.log("Выполняется");
    const xls = await getContent();
    const json = json2xls(xls);
    fs.writeFileSync('data.xlsx', json, 'binary');
}

writeExcel();



