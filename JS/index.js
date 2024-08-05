$(document).ready(function(){
    getUsers();
    $('body').on('click','.delete',deleteuser);
    $('body').on('click','.edit',editUser);
})
function getUsers() {
  $.ajax({
    url: "http://localhost:3000/employee",
    method: "GET",
    success: (data) => {
      const tbody = $("tbody");
      for (let i = 0; i < data.length; i++) {
        const tr = $("<tr>", {
          id: data[i].id,
        });
        const img = $("<img>", {
          src: data[i].img,
        });
        const td1 = $("<td>");
        td1.append(img);
        const td2 = $("<td>", {
          text: data[i].name,
        });
        const td3 = $("<td>", {
          text: data[i].gender,
        });
        const td4 = $("<td>");
        for (let j = 0; j < data[i].department.length; j++) {
          td4.append(
            $("<span>", { class: "crl", text: data[i].department[j] })
          );
        }
        const td5 = $("<td>", {
          text: data[i].salary,
        });
        const td6 = $("<td>", {
          text: data[i].Startdate,
        });
        const td7 =
          '<td><span><svg style="cursor: pointer;" class="edit"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#658292" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></span><span><svg onclick="deleteuser()" class="delete" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#658292" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></span></td>';
        tr.append(td1, td2, td3, td4, td5, td6, td7);
        tbody.append(tr);
      }
    },
  });
}

function deleteuser() {
  const tr = $(this).closest('tr');
  const id = tr.attr('id');
  console.log(id);
  deleteEmploye(id);
}

function deleteEmploye(id){
    $.ajax({
        url:"http://localhost:3000/employee/" + id,
        type: "DELETE",
        success:function(data){
            console.log('Succesfully deleted');
        },error(err){
            console.log(err);
        }
    });
}


function editUser(){
  const tr = $(this).closest('tr');
  const id = tr.attr('id');
 // console.log(id);
 $.ajax({
   url:"http://localhost:3000/employee/"+id,
   type: "GET",
   success: function(data){
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    window.location.replace("../Templates/addUser.html" );
   }

 })
}