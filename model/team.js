// Our Team Model (Object)
// Constructed with a name and (optional) players
Team = function(name, players) {
  this.name = name;
  this.players = players || [];
};

// Define the Team Model once
_.extend(Team.prototype, {
  
  // Check whether the team is ready (has at least one active player)
  isReady: function() {
    return this.players.length > 0;
  },
  
  // Set the (unique) EJSON type name
  typeName: function() {
    return "CustomTeam";
  },

  // Define how to serialise this EJSON type
  toJSONValue: function() {
    var players = _.map(this.players, function(player) {
      return EJSON.toJSONValue(player);
    });
    
    return {
      name: this.name,
      players: players
    };
  }
});

// Add the custom EJSON type to the list of definitions
EJSON.addType("CustomTeam", function fromJSONValue(value) {
  var players = _.map(value.players, function(player) {
    return EJSON.fromJSONValue(player);
  });
  return new Team(value.name,
                  players);
});