const puppeteer = require('puppeteer'); 

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('an event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

    test('user can expand an event to see its details', async () => {
        await page.click('.event .detailbutton');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    test('user can collapse event to hide details', async () => {
        await page.click('.event .detailbutton');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
});