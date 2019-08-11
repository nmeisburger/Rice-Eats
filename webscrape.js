const cheerio = require('cheerio');
const request = require('request');

// request('http://dining.rice.edu/', (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//         const $ = cheerio.load(html);
//         let menus = {}
//         $('.item').each((index, value) => {
//             var name = $(value).find('.servery-title').text().trim();
//             menus[name] = [];
//             // $(value).find('.menu-item').each(function() {
//             //     menus[name].push($(this).text());
//             // })
//             $(value).find('.menu-item').each((i, v) => {
//                 menus[name].push($(v).text())
//             })
//         })
//         console.log(menus);
//     }
// })

async function webscrape() {
    request('http://dining.rice.edu/', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let menus = {}
            $('.item').each((index, value) => {
                var name = $(value).find('.servery-title').text().trim();
                menus[name] = [];
                // $(value).find('.menu-item').each(function() {
                //     menus[name].push($(this).text());
                // })
                $(value).find('.menu-item').each((i, v) => {
                    menus[name].push($(v).text())
                })
            })
            return menus;
        }
    })
}

webscrape().then(menus => console.log(menus)).catch(err => console.log("Error" + err));