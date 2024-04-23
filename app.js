const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { log } = require('console');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
// Middleware to parse JSON bodies
app.use(express.json());
 
// Endpoint to get open positions for a department
app.get('/open-positions', async (req, res) => {
 
  const department = req.query.department;
 
  try {
    // Fetch Actian Careers page HTML
    const response = await axios.get('https://www.actian.com/company/careers');
    const html = response.data;
    console.log(response.data)
    // Load HTML into Cheerio for easy DOM traversal
    const $ = cheerio.load(html);
    console.log(html)
    // Find the department section
    const accordionDiv = $(`span.category-name:contains(${department})`).parentsUntil(".accordion-item").siblings().find("div.job-name")
      // Check if department parameter is provided
    if (accordionDiv.length===0) {
      return res.status(400).json({ error: 'Department is required!' });
    }
    const data =  []
    for (let i=0; i < accordionDiv.length; i++){
      data.push(accordionDiv.eq(i).text())
    }
   
    return res.json({ department, data });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
 
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});