PlayersList = new Mongo.Collection('players');

if(Meteor.isClient) {
    Template.leaderboard.helpers({
        'player': function() {
            return PlayersList.find({}, {sort: {score: -1, name: 1} });
        },
        'selectedClass': function() {
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if (selectedPlayer === playerId) {
                return "selected";
            }
        },
        'showSelectedPlayer': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayersList.findOne(selectedPlayer);
        }
    })
    Template.leaderboard.events({
        'click .player': function() {
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
        },
        'click .increment': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update(selectedPlayer, {$inc: {score: 5} });
        },
        'click .decrement': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update(selectedPlayer, {$inc: {score: -5} });
        },
        'submit form': function(event) {
            event.preventDefault();
            var playerName = event.target.playerName.value;
            PlayersList.insert({
                name: playerName,
                score: 0
            });
        },
        'click .remove': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.remove(selectedPlayer);
        }
    })
}
