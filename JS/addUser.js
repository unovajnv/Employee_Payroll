$(document).ready(function () {
  if (localStorage.getItem("data")) {
    data = JSON.parse(localStorage.getItem("data"));
    $("#name").val(data.name);
    $(`input[class='form-check-input'][value='${data.img}']`).prop(
      "checked",
      true
    );
    $(`input[class='form-check-input gender'][value='${data.gender}']`).prop(
      "checked",
      true
    );
    console.log(data.gender);
    const departments = data.department;
    for (let i = 0; i < departments.length; i++) {
      $(`input[class='form-check-input'][value='${departments[i]}']`).prop(
        "checked",
        true
      );
    }
    $(`option[value='${data.salary}']`).prop("selected", true);
    const [day, month, year] = data.Startdate.split(" ");console.log(day +' '+month+' '+year);
    $(`option[value='${day}']`).prop("selected", true);
    $(`option[value='${month}']`).prop("selected", true);
    $(`option[value='${year}']`).prop("selected", true);
    $("#note").val(data.note);
    console.log(data.note);
  }
});
function tosubmit() {
  var name = $("#name")[0].value;
  var img = $('input[name="profileImage"]:checked').val();
  var gender = $('input[name="gender"]:checked').val();
  var department = [];
  $('input[name="department"]:checked').each(function () {
    department.push($(this).val());
  });
  var salary = $('select[name="salary"]').val();
  var date = $('select[name="date"]').val();
  var month = $('select[name="month"]').val();
  var year = $('select[name="year"]').val();
  var Startdate = `${date + " "}${month + " "}${year}`;
  var note = $('input[name="note"]').val();
  // if (department.length == 0) {
  //   alert("select all options");
  //   return;
  // }

  const toSend = JSON.stringify({
    name,
    img,
    gender,
    department,
    salary,
    Startdate,
    note,
  });
  if(localStorage.getItem('data')){
    const id = JSON.parse(localStorage.getItem('data')).id;
    $.ajax({
      url: "http://localhost:3000/employee/" + id,
      type: "PUT",
      data: toSend,
  
      success: (data) => {
        localStorage.removeItem('data');
        window.location.replace("../index.html");
      },
    });
    return;
  }
  $.ajax({
    url: "http://localhost:3000/employee",
    type: "POST",
    data: toSend,

    success: (data) => {
      window.location.replace("../index.html");
    },
  });
}
