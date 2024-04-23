const app = {};

app.userInput = function () {
    const platformChoice = document.querySelector('#platform');
    document.querySelector('#platform').addEventListener('change', function () {
        app.queryResolver(platformChoice.selectedOptions[0].value);
    });
};

app.apiQuery = 'https://api.allorigins.win/raw?url=https://www.gamerpower.com/api/giveaways?&type=game&sort-by=value';

app.queryResolver = function (userChoice) {
    if (userChoice === 'epic') {
        app.apiQuery = 'https://api.allorigins.win/raw?url=https://www.gamerpower.com/api/giveaways?platform=epic-games-store&type=game&sort-by=value';
        app.fetchData(app.apiQuery);
    } else if (userChoice === 'steam') {
        app.apiQuery = 'https://api.allorigins.win/raw?url=https://www.gamerpower.com/api/giveaways?platform=steam&type=game&sort-by=value';
        app.fetchData(app.apiQuery);
    } else if (userChoice === 'xbox') {
        app.apiQuery = 'https://api.allorigins.win/raw?url=https://www.gamerpower.com/api/giveaways?platform=xbox-one&platform=xbox-series-xs&type=game&sort-by=value';
        app.fetchData(app.apiQuery);
    } else if (userChoice === 'gog') {
        app.apiQuery = 'https://api.allorigins.win/raw?url=https://www.gamerpower.com/api/giveaways?platform=gog&type=game&sort-by=value';
        app.fetchData(app.apiQuery);
    } else if (userChoice === 'all') {
        app.apiQuery = 'https://api.allorigins.win/raw?url=https://www.gamerpower.com/api/giveaways?type=game&sort-by=value';
        app.fetchData(app.apiQuery);
    }
};

app.fetchData = function (input) {
    app.url = new URL(input);
    fetch(app.url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something is broken. Check your code.');
            }
        })
        .then(function (jsonResponse) {
            app.showGames(jsonResponse);
        });
};

app.mainSpace = document.querySelector('#mainContent');

app.showGames = function (data) {
    document.querySelector("#mainContent").innerHTML = "";
    data.forEach(function (game) {
        let thisGamehtml = document.getElementById('mainContent');
        thisGamehtml.innerHTML +=
            `
        <hr>
        <div class='game'>
        <a href=${game.open_giveaway_url}><h2>${game.title}</h2></a>
        <h3>Available on: ${game.platforms}</h3>
        <a href=${game.open_giveaway_url}><img src='${game.image}' alt='${game.title}'></a>
        <h3>Value: ${game.worth}</h3>
        <p>Became free on: 
        ${game.published_date}</p>
        <p>Offer expires(?):
        ${game.end_date}</p>
        <p>Claimed offers: ${game.users}</p>
        <a href=${game.open_giveaway_url}>LINK</a>
        <p>How to claim: ${game.instructions}</p>
        </div>
        `;
    });
};

app.init = function () {
    app.userInput();
    app.fetchData(app.apiQuery);
};

app.init();
