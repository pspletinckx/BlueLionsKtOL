'use strict';

describe('Model: Team', function () {

  // load the service's module
  beforeEach(module('statelessScoreboardApp'));

  // instantiate service
  var Team;
  var team;
  beforeEach(inject(function (_Team_) {
    Team = _Team_;
    team = new Team();
  }));

  it('should do something', function () {
    expect(!!Team).toBe(true);
  });

  it('Team should have a field outfits', function() {
    expect(team.outfits).not.toBeUndefined();
  });

  it('Team should have a field singles', function() {
    expect(team.singles).not.toBeUndefined();
  });

  it('Team should have a getCharacters method', function() {
    
  });

  describe('Load Team from API', function() {
    
  });

});
