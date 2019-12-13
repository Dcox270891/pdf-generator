const [profileName, color ] = process.argv.slice(2);
const fetch = require(`node-fetch`);
const puppeteer = require('puppeteer')

fetch(`https://api.github.com/users/${profileName}`)
    .then(response => response.json())
    .then(profileInfo => {
        const {
            avatar_url: profilePic,
            login,
            location,
            html_url: githubProfileLink,
            blog,
            bio,
            public_repos: publicRepos,
            followers,
            starred_url: starredRepos,
            following,
        } = profileInfo;
        console.log(login)
        const website = generateHTML(profilePic, login, location, githubProfileLink, blog, bio, publicRepos, starredRepos, followers, following, color);
        printPDF(website);
    });

async function printPDF(webpage, err) {
    if (err){
        throw err;
    }
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(webpage, {waitUntil: 'networkidle0'});
    const pdf = await page.pdf({ format: 'A4' });
    
    await browser.close();
    return pdf
    };

function generateHTML(profilePic, login, location, githubProfileLink, blog, bio, publicRepos, starredRepos, followers, following, color) {
return `<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
    <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
    <title>Document</title>
    <style>
        @page {
            margin: 0;
        }
        *,
        *::after,
        *::before {
        box-sizing: border-box;
        }
        html, body {
        padding: 0;
        margin: 0;
        }
        html, body, .wrapper {
        height: 100%;
        }
        .wrapper {
        background-color: ${color};
        padding-top: 100px;
        }
        body {
        background-color: white;
        -webkit-print-color-adjust: exact !important;
        font-family: 'Cabin', sans-serif;
        }
        main {
        background-color: #E9EDEE;
        height: auto;
        padding-top: 30px;
        }
        h1, h2, h3, h4, h5, h6 {
        font-family: 'BioRhyme', serif;
        margin: 0;
        }
        h1 {
        font-size: 3em;
        }
        h2 {
        font-size: 2.5em;
        }
        h3 {
        font-size: 2em;
        }
        h4 {
        font-size: 1.5em;
        }
        h5 {
        font-size: 1.3em;
        }
        h6 {
        font-size: 1.2em;
        }
        .photo-header {
        position: relative;
        margin: 0 auto;
        margin-bottom: -50px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        background-color: ${color};
        color: black;
        padding: 10px;
        width: 95%;
        border-radius: 6px;
        }
        .photo-header img {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        object-fit: cover;
        margin-top: -75px;
        border: 6px solid ${color};
        box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
        }
        .photo-header h1, .photo-header h2 {
        width: 100%;
        text-align: center;
        }
        .photo-header h1 {
        margin-top: 10px;
        }
        .links-nav {
        width: 100%;
        text-align: center;
        padding: 20px 0;
        font-size: 1.1em;
        }
        .nav-link {
        display: inline-block;
        margin: 5px 10px;
        }
        .container {
        padding: 50px;
        padding-left: 100px;
        padding-right: 100px;
        }

        .row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .card {
            padding: 20px;
            border-radius: 6px;
            background-color: ${color};
            color: black;
            margin: 20px;
        }
        
        .col {
        flex: 1;
        text-align: center;
        }

        a, a:hover {
        text-decoration: none;
        color: inherit;
        font-weight: bold;
        }

        @media print { 
        body { 
            zoom: .75; 
        } 
        }
    </style>
    <body>
        <div class="card">
            <div class="main">
                <div class="container">
                    <div class="photo-header">
                        <h1>${login}</h1>
                        <img class="photo-img" src="${profilePic} alt="${login} profile pictutre on GitHub"
                        <h2>${location}</h2>
                    </div>
                </div>
                <div class="container">
                    <div class="links-nav">
                        <h3><a class="nav-link" href="${githubProfileLink}" alt="link to GitHub">GitHub</a></h3>
                        <h3><a class="nav-link" href="${bio}" alt="link to Bio">Bio</a></h3>
                        <h3><a class="nav-link" href="${blog}" alt="link to Blog">Blog</a></h3>
                    </div>
                    <div class="row">
                        <div class="column">
                            <div class="links-nav">
                                <h4><a class="nav-link" href="${followers}" alt="link to GitHub Followers">GitHub Follweres</a></h4>
                                <h4><a class="nav-link" href="${following}" alt="link to GitHub Following">GitHub Following</a></h4>
                            </div>
                        </div>
                            <div class="column">
                            <div class="links-nav">
                                <h4><a class="nav-link" href="${publicRepos}" alt="link to Public Repos">Public Repositories</a></h4>
                                <h4><a class="nav-link" href="${starredRepos}" alt="link to Star Repos">Starred Repositories</a></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>`
        };