'use strict';

describe('Model_Team', function () {

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

  describe(' field should have', function() {
    it('outfits', function() {
    expect(team.outfits).not.toBeUndefined();
  });

  it('singles', function() {
    expect(team.singles).not.toBeUndefined();
  });

  xit('should have a getCharacters method', function() {
    
  });

  });

  
  describe('Team should be able to add a player', function() {

    beforeEach(function(done) {
      team.addPlayer("Bullet0Storm");
    });

    it('test should call done function', function(done) {
      expect(team.singles.length).toBe(1);    
      done();
    });

    xit('that makes the total players increase', function(done) {
      expect(team.singles.length).toBe(1);
    });

    xit('With the right name', function(done) {
      expect(team.singles[0].name.first).toBe("Bullet0Storm");
    });
  });
  

  describe('Load Team from API', function() {
    
  });



describe("Asynchronous specs", function() {
  var value;


  beforeEach(function(done) {
    setTimeout(function() {
      value = 0;
      done();
    }, 1);
  });

   it("should support async execution of test preparation and expectations", function(done) {
      value++;
      expect(value).toBeGreaterThan(0);
      done();
    });
  });

});
