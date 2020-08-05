$(document).ready(() => {

  $(".save-btn").on("click", function() {
    var patternId = $(this).attr("data-id");
    var idValue = $(this).attr("id");
    var numberValue = idValue.substring(11);
    var nameValue = $("#patternName" + numberValue).text();
    var urlValue = $("#patternLink" + numberValue).attr("href");
    var imageLink = $("#patternImage" + numberValue).attr("src");
    var authorName = $("#patternAuthor" + numberValue).text();
    $.ajax({
      url: "/api/patterns",
      method: "POST",
      async: true,
      data: {
        id: patternId,
        name: nameValue,
        url: urlValue,
        image: imageLink,
        author: authorName
      },
      dataType: "json",
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Error saving. Error code: " + errorThrown);
      }
    }).then(function(data) {
      // console.log(data);
      if (data.saved === "done") { 
        alert("Saved pattern");
      } else if (data.saved === "already") {
        alert("You have already saved this pattern");
      } else if (data.saved === "error") {
        alert("Error saving the pattern to your profile");
      }
    });
  });

  //Generate next 6 patterns
  $("#next").on("click", function() {
    console.log('made it');
    if ($("#patternsContainer").hasClass("d-block")) {
      $("#patternsContainer")
        .removeClass("d-block")
        .addClass("d-none");
    }

    if ($("#spinnerDiv").hasClass("d-none")) {
      $("#spinnerDiv")
        .removeClass("d-none")
        .addClass("d-block");
    }

  })

  $("#generatePatterns").on("click", function(event) {
    event.preventDefault();

    if ($("#patternsContainer").hasClass("d-block")) {
      $("#patternsContainer")
        .removeClass("d-block")
        .addClass("d-none");
    }

    if ($("#spinnerDiv").hasClass("d-none")) {
      $("#spinnerDiv")
        .removeClass("d-none")
        .addClass("d-block");
    }

    let knitOrCrochet = $("#knit-or-crochet").val();
    let yarnWeight = $("#yarnWeight").val();
    let articleOfClothing = $("#articleOfClothing").val();

    $.ajax({
      url: "/api/patterns",
      method: "GET",
      async: true,
      data: {
        knitOrCrochet: knitOrCrochet,
        yarnWeight: yarnWeight,
        articleOfClothing: articleOfClothing
      },
      dataType: "json",
      error: function(errorThrown) {
        alert(
          "Error code: " + errorThrown + "\n Please refresh and try again."
        );
        
        //Remove spinner if error occurs
        if (
          $("#patternsContainer").hasClass("d-none") &&
          $("#spinnerDiv").hasClass("d-block")
        ) {
          $("#spinnerDiv")
            .removeClass("d-block")
            .addClass("d-none");
          $("#patternsContainer")
            .removeClass("d-none")
            .addClass("d-block");
        };
  
      }
    }).then(data => {
      for (let i = 0; i < data.length; i++) {
        $("#patternImage" + (i + 1)).attr("src", data[i].image);
        $("#patternName" + (i + 1)).text(data[i].name);
        $("#patternAuthor" + (i + 1)).text(data[i].author);
        $("#patternLink" + (i + 1)).attr("href", data[i].link);
        $("#patternSave" + (i + 1)).attr("data-id", data[i].id);
      }
      if (
        $("#patternsContainer").hasClass("d-none") &&
        $("#spinnerDiv").hasClass("d-block")
      ) {
        $("#spinnerDiv")
          .removeClass("d-block")
          .addClass("d-none");
        $("#patternsContainer")
          .removeClass("d-none")
          .addClass("d-block");
      }
    });
  });

});
