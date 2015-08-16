var assert = require('assert'),
  Canadarm = require('../../../build/canadarm.min').Canadarm,
  sinon = require('sinon'),
  errorObject = new Error(),
  generateError = function(){throw errorObject;};

describe('Canadarm.Appender', function () {
  var sandbox;

  beforeEach(function() {
    // Setup standard browser bits.
    Canadarm._window.location = {href: 'my-href'};
    Canadarm._window.navigator = {language: 'en-kitty-talk'};
    Canadarm._window.document = {
      characterSet: 'utf-meow',
      charset: 'utf-bark',
      defaultCharset: 'utf-woof'
    };
  });

  describe('#standardLogAppender', function() {

    it('returns correct keys when called', function () {
      var actualAttributes = Canadarm.Appender.standardLogAppender(
        Canadarm.level.INFO,
        errorObject,
        ''
      );

      assert(actualAttributes.characterSet);
      assert(actualAttributes.columnNumber);
      assert(actualAttributes.language);
      assert(actualAttributes.lineNumber);
      assert(actualAttributes.logDate);
      assert(actualAttributes.msg);
      assert(actualAttributes.pageURL);
      assert(actualAttributes.stack);
      assert(actualAttributes.type);
      assert(actualAttributes.scriptURL);
    });

    it('returns correct default values when called', function () {
      var actualAttributes = Canadarm.Appender.standardLogAppender(
          Canadarm.level.INFO,
          errorObject,
          ''
        ),
        message = '[' + Canadarm.level.INFO + ']: ' + Canadarm.constant.UNKNOWN_LOG,
        expectedDate = new Date(actualAttributes.logDate).toISOString();

      assert.equal(actualAttributes.characterSet, 'utf-meow');
      assert.equal(actualAttributes.columnNumber, Canadarm.constant.UNKNOWN_LOG);
      assert.equal(actualAttributes.language, 'en-kitty-talk');
      assert.equal(actualAttributes.lineNumber, Canadarm.constant.UNKNOWN_LOG);
      assert.equal(actualAttributes.logDate, expectedDate);
      assert.equal(actualAttributes.msg, message);
      assert.equal(actualAttributes.pageURL, 'my-href');
      assert.equal(actualAttributes.stack, errorObject.stack);
      assert.equal(actualAttributes.type, 'jserror');
      assert.equal(actualAttributes.scriptURL, Canadarm.constant.UNKNOWN_LOG);
    });
  });
});