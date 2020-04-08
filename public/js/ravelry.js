var Ravelry = require("ravelry");
var rav = Ravelry.basic({
  ravAccessKey: "004da952631a901b56abfabce4da0fde", // also called Username in Ravelry Pro
  ravPersonalKey: "PsxTg2NYmxt5TfVyEY6a677pECo-KsvrRYM_FjCZ"
});
var allPatternIDs = [];

var randomNums = [];
// var knitCrochet = ["Knitting", "Crochet"];
// var articlesOfClothing = ["Socks", "Mittens", "Sweater", "Hats", "Scarf"];
// var yarnTypes = [
//   "Aran",
//   "Bulky",
//   "Super Bulky",
//   "Fingering",
//   "Light Fingering",
//   "Lace",
//   "Cobweb",
//   "Sport",
//   "DK",
//   "Worsted",
//   "Jumbo",
//   "Any gauge"
// ];

const startFunction = () => {
  rav.patterns
    .search({
      query: "Socks",
      craft: "Knitting",
      weight: "DK",
      // eslint-disable-next-line camelcase
      page_size: 1000
    })
    .then(results => {
      for (let i = 0; i < results.patterns.length; i++) {
        if (results.patterns[i].free === true) {
          var idkwhattoputhere = results.patterns[i].id;
          allPatternIDs.push(idkwhattoputhere);
        }
      }
      outputFunction();
    })
    .catch(err => {
      console.log(err);
    });
};

const outputFunction = () => {
  for (let i = 0; i < 5; i++) {
    randomNums.push(Math.floor(Math.random() * allPatternIDs.length));
  }

  // This has to be in here because of asyncronous issues
  for (let i = 0; i < randomNums.length; i++) {
    rav.patterns
      .patterns({ ids: allPatternIDs[randomNums[i]] })
      .then(results2 => {
        // id of the pattern we used
        console.log(allPatternIDs[randomNums[i]]);
        // name of pattern
        console.log(results2.patterns[allPatternIDs[randomNums[i]]].name);
        // author of pattern
        console.log(
          results2.patterns[allPatternIDs[randomNums[i]]].pattern_author.name
        );
        // download link
        console.log(
          results2.patterns[allPatternIDs[randomNums[i]]].download_location.url
        );
        // images
        console.log(
          results2.patterns[allPatternIDs[randomNums[i]]].photos[0].medium_url
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
};

startFunction();
