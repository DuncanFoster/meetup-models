// Our Game Model (Object)
// Constructed by extending with all document fields
Game = function(doc) {
  _.extend(this, doc);
};

// Define the Game Model once
_.extend(Game.prototype, {
  
  // Count the total number of players in a game
  playerCount: function() {
    return _.reduce(this.teams, function(count, team) {
      return count + _.size(team.players);
    }, 0);
  },
  
  // Check whether the game can start (all teams are ready)
  isReady: function() {
    if(this.teams.length < 2) {
      return false;
    }
    else {
      return _.every(this.teams, function(team) {
        return team.isReady();
    })}    
  }
});