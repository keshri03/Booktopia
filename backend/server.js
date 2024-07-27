const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173' // Allow only this origin
};
app.use(cors(corsOptions));
app.use(express.json());

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// Endpoint to get detailed information about books
app.post('/books', async (req, res) => {

    const { details } = req.body;
    // console.log("backend called "+ details);
    try {
        const propmt = `
        Please provide the names at max 10 books with description as "${details}". Format the response as a numbered list where each book name is on a new line.
        Do not include any additional information or descriptions, just the book names with numbering`;
        const result = await model.generateContent(propmt);
        const response = await result.response;
        const text = response.text();
        const bookNames = text.split('\n').map(line => line.replace(/^\d+\.\s*/, '').trim()).filter(name => name.length > 0);
        res.json(bookNames);      
        
    } catch (error) {
        console.error('Error generating book names:', error);
        res.status(500).json({ error: 'Error generating book names' });
    }
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
