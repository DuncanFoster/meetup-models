Games = new Mongo.Collection("games", {
  transform: function (doc) {
    return new Game(doc);
  }
});