# actian-careers
A simple Node.js RESTful application with only one endpoint that makes an API call to Actian Careers and request an HTML page, and parse through the HTML to retrieve list of titles of open positions for a department.

**Here's what the code does:**
1. Imports necessary packages: Express for creating the server, Axios for making HTTP requests, and Cheerio for parsing HTML.
2. Sets up an Express server and defines a single endpoint /open-positions.(click)
3. Retrieves the department parameter from the query string.
4. Checks if the department parameter is provided, if not, returns a 400 Bad Request response.
5. Uses Axios to make a GET request to the Actian Careers page.
6. Parses the HTML response using Cheerio.
7. Searches for the section corresponding to the provided department using Cheerio selectors.
8. If the department section is not found, returns a 404 Not Found response.
9. Extracts the job titles from the department section.
10. Returns a 200 OK response with the department name and job titles.
11. Handles errors appropriately.

Make sure to install the required packages using npm:
```
npm install express axios cheerio
```

