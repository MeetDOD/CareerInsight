const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.gartner.com/en/articles/gartner-top-10-strategic-technology-trends-for-2024', { waitUntil: 'networkidle2' });

    const content = await page.content();
    await browser.close();
    return content;
}

async function extractTechTrends(html) {
    const $ = cheerio.load(html);
    const trends = [];

    $('div.globalsite.cmp-globalsite-articletext > article.article-text.grid-norm.no-top > span.rte > ol > li').each((index, element) => {
        console.log($(element).html()); 
        console.log("Chiro")
        const trendTitle = $(element).find('p').text().trim();
        if (trendTitle) {
            trends.push(trendTitle);
        }
    });

    return trends;
}

app.get('/scrape', async (req, res) => {
    try {
        const html = await scrapeData();
        const trends = await extractTechTrends(html);
        res.json(trends);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while scraping' });
    }
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
