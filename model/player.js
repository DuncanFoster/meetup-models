// Our Player Model (Object)
// Constructed with the details of the name
Player = function(givenName, familyName, familyNameFirst) {
  this.givenName = givenName;
  this.familyName = familyName;
  this.familyNameFirst = !!familyNameFirst;
};

// Define the Player Model once
_.extend(Player.prototype, {
  
  // Return the full name for our player
  getFullName: function() {
    if(this.familyNameFirst) {
      return this.familyName + " " + this.givenName;
    }
    else {
      return this.givenName + " " + this.familyName;
    };
  },
  
  // Set the (unique) EJSON type name
  typeName: function() {
    return "CustomPlayer";
  },

  // Define how to serialise this EJSON type
  toJSONValue: function() {
    return {
      givenName: this.givenName,
      familyName: this.familyName,
      familyNameFirst: this.familyNameFirst
    };
  }
});

// Add the customer EJSON type to the list of definitions
EJSON.addType("CustomPlayer", function fromJSONValue(value) {
  return new Player(value.givenName,
                    value.familyName,
                    value.familyNameFirst);
});