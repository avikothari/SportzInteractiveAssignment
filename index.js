
let players = []

function getPlayers() {
    fetch('https://api.jsonbin.io/b/5d0c6e6a860ae0341876aac6/2')
        .then(response => response.json())
        .then(data => {
            players = data.reverse()
            iteratePlayers(players)
        });
}

function iteratePlayers(players){
    document.getElementById('players').innerHTML = ''
    for (let player of players) {
        document.getElementById('players').innerHTML += getHTML(player)
    }
}

function getHTML(player) {
    return '<div class="player_card">' +
        '<img class="player_image" src="player-images/' + player.Id + '.jpg">' +
        '<div class="player_name">' +
        '' + player.PFName + '' +
        '<div class="player_skill">(' + player.SkillDesc + ')</div>' +
        '</div>' +
        '<div class="player_value">$' + player.Value + ' Million</div>' +
        '<div>Upcoming Match</div>' +
        '<div>' +
        '<div class="player_next_match">' + getUpcomingMatch(player) + '<br>' + getMatchDate(player.UpComingMatchesList[0].MDate)+ '</div>' +
        '</div>' +
        '</div>'

}

function getUpcomingMatch(player){
    if (player.UpComingMatchesList[0].CCode !== '' && player.UpComingMatchesList[0].VsCCode !== ''){
        return player.UpComingMatchesList[0].CCode  + ' vs ' + player.UpComingMatchesList[0].VsCCode
    }
    return '-'
}

function getMatchDate(date){
    return date ? moment(date,'DD/MM/YYYY hh:mm:ss a').format('DD-MM-YYYY hh:mm:ss a') : ''
}

function searchPlayers(){
    let search_str = document.getElementById('search').value

    iteratePlayers(players.filter(player =>
        player.PFName.toLowerCase().indexOf(search_str.toLowerCase()) !== -1 
    ))
}

window.onload = getPlayers()
