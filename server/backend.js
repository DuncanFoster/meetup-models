// Server-side actions
Meteor.methods({
  
  // Create a new unstarted game without any teams
  newGame: function() {
    Games.insert({
      started: false,
      teams: []
    });
  },
  
  // Add a new team to an exising game
  addTeam: function(game, name) {
    check(game, String);
    check(name, String);
    
    var game = Games.findOne(game);
    if(!game) {
      throw new Meteor.error(404, "Game not found");
    }    
    
    var team = new Team(name);
    game.teams.push(team);
    Games.update(game._id, { $set: {teams: game.teams }});
  },
  
  // Add a new player to an existing team
  addPlayer: function(gameId, teamName, familyName, givenName, familyNameFirst) {
    check(gameId, String);
    check(teamName, String);
    check(familyName, String);
    check(givenName, String);
    check(familyNameFirst, Boolean);
    
    var game = Games.findOne(gameId);
    if(!game) {
      throw new Meteor.error(404, "Game not found");
    }
    
    var gameTeam = _.find(game.teams, function(team) {
      return team.name === teamName;
    })
    if(!gameTeam) {
      throw new Meteor.error(404, "Team not found");
    }
    
    player = new Player(familyName, givenName, familyNameFirst);
    gameTeam.players.push(player);
    Games.update(game._id, { $set: {teams: game.teams }});
  }

});