console.log("File Attached!!!");

$(document).ready(function () {
  reloadResponse();
  $(".pictures").on("click", ".btn-danger", handleDelete);
  $(".container").on("click", ".btn-warning", handleUpdate);
  $(".container").on("click", ".addProduct", addProduct);
  $("#Update").on("click", function () {
    let id = $("#updateId").val();
    let utit = $("#updateTitle").val();
    let uDesc = $("#updateDesc").val();
    let uLoc = $("#updateLoc").val();
    let uDate = $("#updateDate").val();
    $.ajax({
      url: "https://ali-picture-api.herokuapp.com/api/picture/" + id,
      method: "PUT",
      data: { Title: utit, Description: uDesc, Date: uDate, Location: uLoc },
      success: function (Response) {
        reloadResponse();
        $("#updateModal").modal("hide");
      },
    });
  });
});

function handleUpdate() {
  // $("#updateModal").modal("show");
  let btn = $(this);
  let parentDiv = btn.closest(".card");
  let id = parentDiv.attr("data-id");
  $.get(
    "https://ali-picture-api.herokuapp.com/api/picture/" + id,
    function (response) {
      $("#updateId").val(response._id);
      $("#updateTitle").val(response.Title);
      $("#updateDesc").val(response.Description);
      $("#updateLoc").val(response.Location);
      $("#updateDate").val(response.Date);
      $("#updateModal").modal("show");
    }
  );
}

function addProduct() {
  console.log("Clicked add product");
  // let title = $("#title").val();
  // let loc = $("#loc").val();
  // let date = $("#date").val();
  // let desc = $("#desc").val();
  // let photo = $("#photo").val();
  // console.log(photo);

  var formData = new FormData();
  formData.append("Title", $("#title").val());
  formData.append("Location", $("#loc").val());
  formData.append("Date", $("#date").val());
  formData.append("Description", $("#desc").val());
  formData.append("photo", $("#photo").val()); //$(".image")[0].files[0]
  console.log(formData);
  $.ajax({
    url: "https://ali-picture-api.herokuapp.com/api/picture",
    method: "POST",
    data: formData,
    processData: false, // tell jQuery not to process the data
    contentType: false,
    // data: {
    //   Title: title,
    //   Description: desc,
    //   Date: date,
    //   Location: loc,
    //   photo: photo,
    // },
    success: function (Response) {
      console.log(Response);
      reloadResponse();
      $("#addProductModal").modal("hide");
      $("#title").val("");
      $("#loc").val("");
      $("#date").val("");
      $("#desc").val("");
    },
  });
}

function reloadResponse() {
  $.ajax({
    url: "https://ali-picture-api.herokuapp.com/api/picture",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "GET",
    success: function (Response) {
      $(".pictures").empty();
      for (i = 0; i < Response.length; i++) {
        let rec = Response[i];
        $(".pictures").append(
          `<div class="card col-lg-3 col-mt-3 my-3 mx-3" data-id="${rec._id}" style='height: 40%; width: 30%; object-fit: contain'>
            <div class="card-body">
            <img src="" style='height: 100%; width: 100%; object-fit: contain' alt="" srcset="${rec.imgPath}">
              <h5 class="card-title">${rec.Title}</h5>
            
              <span class="card-text">${rec.Description}</span>
              <br>
              <span class="card-text">Location:${rec.Location}</span>
              <br>
              <span class="card-text">Date:${rec.Date}</span>
              <br>
              <button class="btn btn-danger btn-sm">Delete</button>
              <button class="btn btn-warning btn-sm">Edit</button>
              </div>
          </div>`
        );
      }
    },
  });
}

function handleDelete() {
  console.log("handle delete");
  let btn = $(this);
  let parentDiv = btn.closest(".card");
  let id = parentDiv.attr("data-id");
  // console.log(id);
  $.ajax({
    url: "https://ali-picture-api.herokuapp.com/api/picture/" + id,
    method: "DELETE",
    success: function () {
      reloadResponse();
    },
  });
}
