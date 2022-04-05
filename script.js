//url: `https://shrouded-bayou-34065.herokuapp.com/https://www.gamerpower.com/api/giveaways?&type=game&sort-by=popularity`

const app = {};

app.apiQuery = "https://shrouded-bayou-34065.herokuapp.com/https://www.gamerpower.com/api/giveaways?type=game&sort-by=value";
app.apiQuerySteam = "https://shrouded-bayou-34065.herokuapp.com/https://www.gamerpower.com/api/giveaways?platform=steam&type=game&sort-by=value";
app.apiQueryEpic = "https://shrouded-bayou-34065.herokuapp.com/https://www.gamerpower.com/api/giveaways?platform=epic-games-store&type=game&sort-by=value";
app.apiQueryUbisoft = "https://shrouded-bayou-34065.herokuapp.com/https://www.gamerpower.com/api/giveaways?platform=ubisoft&type=game&sort-by=value";
app.apiQueryXbox = "https://shrouded-bayou-34065.herokuapp.com/https://www.gamerpower.com/api/giveaways?platform=xbox-one&platform=xbox-series-xs&type=game&sort-by=value";
app.apiQueryGog = "https://shrouded-bayou-34065.herokuapp.com/https://www.gamerpower.com/api/giveaways?platform=gog&type=game&sort-by=value";



app.mainSpace = document.querySelector("#mainContent");


app.init = function() {
    app.fetchData();
};

app.fetchData = function() {
    app.url = new URL(app.apiQuery);
    fetch(app.url)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something is broken. Check your code.")
        }
    })
    .then(function(jsonResponse) {
        console.log(jsonResponse);
        app.showGames(jsonResponse);
    })
}

app.showGames = function(data) {
    data.forEach(function(game) {
        console.log(game);
        let thisGamehtml = document.getElementById("mainContent");
        thisGamehtml.innerHTML +=
        `
        <hr>
        <div class="game">
        <a href=${game.open_giveaway_url}><h2>${game.title}</h2></a>
        <h3>Available on: ${game.platforms}</h3>
        <a href=${game.open_giveaway_url}><img src="${game.image}"></a>
        <h3>Value: ${game.worth}</h3>
        <p>Became free on: 
        ${game.published_date}</p>
        <p>Offer expires(?):
        ${game.end_date}</p>
        <p>Claimed offers: ${game.users}</p>
        <a href=${game.open_giveaway_url}>LINK</a>
        <p>How to claim: ${game.instructions}</p>
        </div>
        `
    });
}

app.init();

