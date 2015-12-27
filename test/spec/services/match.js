'use strict';

describe('Model: Match', function () {

  // load the service's module
  beforeEach(module('statelessScoreboardApp'));

  // instantiate service
  var Match;
  var match;
  beforeEach(inject(function (_Match_) {
    Match = _Match_;
    match = new Match();
  }));

  it('should do something', function () {
    expect(!!Match).toBe(true);
  });

  it('should have a field players', function(){
    
    expect(match.players).toBeDefined();
  });

  it('should know what the field team is', function() {
    expect(match.players.team).toBeDefined();
  });

  it('should at least have 2 teams',function(){
    expect(match.players.team.length >= 2).toBeTruthy();
  });

  it('should contain match meta', function() {
    expect(match.matchMeta).toBeDefined();
  });
});
