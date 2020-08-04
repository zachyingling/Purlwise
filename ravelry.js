var Ravelry = require("ravelry");
var keys = require("./keys");
var rav = Ravelry.basic({
  ravAccessKey: keys.ravAccessKey,
  ravPersonalKey: keys.ravPersonalKey
});
var allPatternIDs = [];

module.exports = (knitOrCrochet, yarnWeight, articleOfClothing, cb) => {
  const startFunction = (knitOrCrochet, yarnWeight, articleOfClothing) => {
    rav.patterns
      .search({
        query: articleOfClothing,
        craft: knitOrCrochet,
        weight: yarnWeight,
        // eslint-disable-next-line camelcase
        page_size: 200
      })
      .then(results => {
        // var allPatternIDs = [];
        // var randomNums = [];
        // var allPatterns = [];

        for (let i = 0; i < results.patterns.length; i++) {
          if (results.patterns[i].free === true) {
            var idGettingPushedBeforeSorted = results.patterns[i].id;
            allPatternIDs.push(idGettingPushedBeforeSorted);
          }
        }

        randomNumber(allPatternIDs);

        // for (let i = 0; i < 6; i++) {
        //   randomNums.push(Math.floor(Math.random() * allPatternIDs.length));
        // }

        // for (let i = 0; i < randomNums.length; i++) {
        //   outputFunction(allPatternIDs[randomNums[i]], function(data) {
        //     allPatterns.push(data);
        //     if (allPatterns.length === 6) {
        //       return cb(allPatterns);
        //     }
        //   });
        // }
      })
      .catch(err => {
        console.log("startFunction Error", err);
      });
  };

  //Selects 6 random patterns
  function randomNumber(allPatternIDs) {
    var randomNums = [];
    for (let i = 0; i < 6; i++) {
      randomNums.push(Math.floor(Math.random() * allPatternIDs.length));
    }
    allPatterns(allPatternIDs,randomNums);
  }

  //Returns the information for 6 selected patterns
  function allPatterns (allPatternIDs,randomNums) {
    var allPatterns = [];
    for (let i = 0; i < randomNums.length; i++) {
      outputFunction(allPatternIDs[randomNums[i]], function(data) {
        allPatterns.push(data);
        if (allPatterns.length === 6) {
          console.log(allPatterns);
          return cb(allPatterns);
        }
      });
    }
  }

  const outputFunction = (num, cb) => {
    // This has to be in here because of asyncronous issues
    rav.patterns
      .patterns({ ids: num })
      .then(results2 => {
        let newPattern = {
          id: num,
          name: results2.patterns[num].name,
          author: results2.patterns[num].pattern_author.name,
          link: results2.patterns[num].download_location.url,
          image: results2.patterns[num].photos[0].medium_url
        };
        if (newPattern.link === null) {
          newPattern.link = "/generate";
        }
        return cb(newPattern);
      })
      .catch(err => {
        console.log("outputFunction ", err);
      });
  };

  return startFunction(knitOrCrochet, yarnWeight, articleOfClothing);
};
