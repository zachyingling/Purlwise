$(document).ready(() => {
  $(".unsave-btn").on("click", function() {
    let patternID = $(this).attr("data-id");

    $.ajax({
      url: "/api/patterns",
      method: "PUT",
      data: {
        id: patternID
      }
    })
      .then(response => {
        if (response === "destroyed") {
          alert("Pattern unsaved.");
          location.reload(true);
        } else {
          alert("Error unsaving pattern.");
          location.reload(true);
        }
      })
      .catch(err => console.log(err));
  });
});
