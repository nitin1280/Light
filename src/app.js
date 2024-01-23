const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Simulated in-memory data (replace with actual database calls)
const leaderboardData = [
    { userId: 1, username: "ROCK", score: 100 },
    { userId: 2, username: "JHON", score: 90 },
    // ... (add more data)
];

const userCountryData = [
    { userId: 1, country: "USA" },
    { userId: 2, country: "Canada" },
    // ... (add more data)
];

// Sample data for top 200 users and their countries
const top200UserData = [];
const top200CountryData = [];

for (let i = 1; i <= 200; i++) {
    const user = { userId: i, username: `User${i}`, score: Math.floor(Math.random() * 100) + 1 };
    const country = { userId: i, country: `Country${i % 5 + 1}` };

    leaderboardData.push(user);
    userCountryData.push(country);

    top200UserData.push(user);
    top200CountryData.push(country);
}

// Middleware to parse JSON requests
app.use(express.json());

// Display current week leaderboard (Top 200)
app.get("/leaderboard", (req, res) => {
    const top200Leaderboard = leaderboardData.slice(0, 200);
    res.json(top200Leaderboard);
});

// Display last week leaderboard given a country by the user (Top 200)
app.get("/lastWeekLeaderboard/:country", (req, res) => {
    const country = req.params.country;
    const countryLeaderboard = leaderboardData
         .slice(0, 200);

    res.json(countryLeaderboard);
});

// Fetch user rank, given the userId
app.get("/userRank/:userId", (req, res) => {
    const country = req.params.country;
    const countryLeaderboard = userCountryData
         .slice(0, 100);

    res.json(countryLeaderboard);
});

// API to get the top 200 users and their countries
app.get("/top200UsersAndCountries", (req, res) => {
    const top200Data = top200UserData.map((user, index) => ({ ...user, country: top200CountryData[index].country }));
    res.json(top200Data);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

