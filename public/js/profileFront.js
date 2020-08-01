$(document).ready(() => {

  let pattern = document.querySelector('#patternUnsave');


  function patternUnsave() {
    let patternID = $(this).attr("data-id");
    console.log(patternID);

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
  };

  pattern.addEventListener('click', patternUnsave);
});
