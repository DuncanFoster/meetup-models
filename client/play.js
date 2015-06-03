// Helpers for the Play template
Template.play.helpers({
  
  // Find all games
  games: function() {
    return Games.find();
  },
  
  // Find the currently selected game
  selectedGame: function() {
    return Games.findOne(Session.get("game"));
  },

  // Find the currently selected team
  selectedTeam: function() {
    return _.find(Games.findOne(Session.get("game")).teams, function(team) {
      return team.name === Session.get("team");
    });
  }
  
});

// Event Handlers for the Play template
Template.play.events({
  
  // Create a new game
  'click #newGame': function () {
    Meteor.call("newGame");
  },
  
  // Set the selected game
  'click .gameId': function () {
    Session.set("game", this._id);
  },

  // Deselect the game
  'click #deselectGame': function () {
    Session.set("game", null);
  },
  
  // Set the selected team
  'click .teamId': function () {
    Session.set("team", this.name);
  },

  // Deselect the team
  'click #deselectTeam': function () {
    Session.set("team", null);
  },
  
  // Add a team to the selected game
  'click #addTeam': function (event, template) {
    Meteor.call("addTeam", Session.get("game"), template.$("#teamName").val());
  },

  // Add a team to the selected game
  'click #addPlayer': function (event, template) {
    Meteor.call("addPlayer", Session.get("game"), Session.get("team"),
                template.$("#givenName").val(),
                template.$("#familyName").val(),
                template.$("#familyNameFirst").prop("checked")
               );
  }
});