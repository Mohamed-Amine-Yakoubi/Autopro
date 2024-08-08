const puppeteer = require('puppeteer');
const generatePdf = async (htmlContent) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();
    return pdfBuffer;
  } catch (error) {
    res.status(500).json({ error: "Internal server " });
  }
};

 
module.exports = { generatePdf };