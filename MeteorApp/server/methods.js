Meteor.methods({
  //items:
  'addItem': function() {
    const i = Items.find().count();
    Items.insert({
      completed: false,
      createdAt: new Date(),
      name: `Item #${i}`
    });
  },

  'removeItem': function(_id) {
    Items.remove({_id: _id});
  },

  // battles:
  'createBattle': function() {
    const i = Battles.find().count();
    Battles.insert({
      completed: false,
      createdAt: new Date(),
      name: `Battle #${i}`
    });
  },

  'removeBattle': function(_id) {
    // first remove associated Players:
    Players.remove({battleId: _id});

    Battles.remove({_id: _id});
  },

  'joinBattle': function(_id) {
    // already joined this battle?
    const joinedAlready = Players.findOne({userId : Meteor.userId(),battleId:_id});
    if (!joinedAlready){
      const newPlayerId = Players.insert({
        userId:Meteor.userId(),
        battleId:_id
      });

      // DEBUG:
      const newPlayer = Players.findOne({_id : newPlayerId});
      if(newPlayer){
        console.log('joinBattle:  done. Players joined: '+newPlayer.userInfo().emails[0].address);
      }
    }
  }
});
