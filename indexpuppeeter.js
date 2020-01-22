const puppeteer = require('puppeteer');
const fs = require ('fs');

const launch = async ()=>{
    try{
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://scrapethissite.com/pages/forms/')

    
        const teams = await page.evaluate(()=>{
            const grabFromRow = (row, classname) =>row
                .querySelector(`td.${classname}`)
                .innerText
                .trim()

            const TEAM_ROW_SELECTOR = 'tr.team'
            const data = []
            const teamRows = document.querySelectorAll(TEAM_ROW_SELECTOR)
            for (const tr of teamRows){
                data.push({
                    name: grabFromRow(tr, 'name'),
                    yeaar: grabFromRow(tr, 'year'),
                    wins: grabFromRow(tr, 'wins'),
                    losses: grabFromRow(tr, 'losses')
                })
            }
            
            return data
        })

        await browser.close();
        
        fs.writeFile('teams.json', JSON.stringify(teams,null, 2),(err)=>{
            err ? console.error('Data not write', err) : console.log("Data writte")
        })
    }
    catch(err){
        console.log(err)
    }
}

launch();