
// $(document).ready(function(){
//   getUser();
// })


  
  //////////////////////////////////////////////////////////////////////////
  
  // $(document).ready(() => {
  //   if (localStorage.getItem("id")) {
  //     getFormElements(localStorage.getItem("id"));
  //   }
  
  //   dateSelect();
  
  //   $("form").submit(function (e) {
  //     e.preventDefault();
  //     formSubmit();
  //   });
  // });
  // for edit
  
  
  
  // function dateSelect() {
  //     var daySelect = $("#daySelect")
  //     for (let i = 1; i <= 31; i++) {
  //         daySelect.append($('<option>', {
  //             value: i,
  //             text: i,
  
  //         }))
  //     }
  //     var monthSelect = $('#monthSelect')
  //     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //     monthNames.forEach((month) => {
  //         monthSelect.append($('<option>', {
  //             text: month,
  //             value: month.slice(0, 3)
  //         }))
  //     })
  
  //     var yearSelect = $('#yearSelect')
  //     var currentYear = new Date().getFullYear()
  
  //     for (let i = currentYear; i >= currentYear - 100; i--) {
  //         yearSelect.append($('<option>', {
  //             value: i,
  //             text: i
  //         }))
  
  //     }
  // }
  
  // function formSubmit() {
  //     let url = "http://localhost:3000/employee"
  //     let method = 'POST'
  //     const id = localStorage.getItem('id')
  
  //     console.log(url)
  //     console.log(method)
  //     var name = $('form')[0].elements['name'].value
  //     var img = $('form')[0].elements['img'].value
  //     var gender = $('form')[0].elements['gender'].value
  //     var dep = $('form')[0].elements['department']
  //     var department = []
  //     dep.forEach((element) => {
  //         if (element.checked) {
  //             department.push(element.value)
  //         }
  
  //     })
  //     var salary = $('form')[0].elements['salary'].value
  //     var day = $('form')[0].elements['daySelect'].value
  //     var month = $('form')[0].elements['monthSelect'].value
  //     var year = $('form')[0].elements['yearSelect'].value
  //     var startDate = `${day} ${month} ${year}`
  //     var notes = $('form')[0].elements['notes'].value
  //     if (department.length == 0) {
  //         alert("select all options")
  //         return
  //     }
  //     let toSend = {
  //         name, img, department, salary, startDate, notes, gender
  //     }
  //     if (id) {
  //         url = "http://localhost:3000/employee/" + id
  //         method = 'PUT'
  //         console.log(url,method)
  //         toSend['id']=id
  //         console.log(toSend)
  //         localStorage.removeItem('id')
  //     }
  //     toSend=JSON.stringify(toSend)
  //     $.ajax({
  //         url: url,
  //         type: method,
  //         data: toSend,
  //         success: (data) => {
  //             window.location.replace("index.html");
  //         }
  //     })
  
  // }
  
  // $(document).ready(() => {
  //     var tbody = $(tbody)
  //     const deleted=localStorage.getItem('deleted')
  
  //     console.log("dleted value",deleted)
  
  //     getUser('')
  
  //     $('#search-icon').on('click', () => {
  //         click = true
  //         $('#search').css('width', '400px');
  //         var inp = $('<input>', {
  //             type: 'text',
  //             id: 'input-search',
  //             style: 'border:none',
  
  //         });
  //         $('#search').html(inp)
  
  //     });
  
  //     $('#search').on('input', () => {
  //         const filterData = $('#input-search')[0].value
  //         getUser(filterData)
  //     })
  //     if(deleted && deleted=='true'){
  //         myFunction()
  //         localStorage.setItem('deleted',false)
  //     }
  
  // }
  // );
  
  // function myFunction() {
  //     var x = document.getElementById("snackbar");
  //     x.className = "show";
  //     setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  // }
  
  function getUser(filterData) {
     // console.log("table updated")
      $.ajax({
          url: "http://localhost:3000/employee",
          type: "GET",
          success: (data) => {
              //console.log(data)
              if (filterData!=NaN && filterData != '') {
                  data = filterItems(data,filterData)
              }
              var tbody = $('tbody')[0]
              tbody.innerHTML = ''
  
              for (let i = 0; i < data.length; i++) {
                  var { id, img, name, gender, department, salary, startDate } = data[i]
  
                  var trow = $(`<tr id="${id}"></tr>`);
                  var td1 = $(`<td><img src='${img}' alt=""></td>`);
                  var td2 = $("<td></td>").text(name);
                  var td3 = $("<td class='gender-hide'></td>").text(gender);
                  var td4 = $(`<td>${department.map(element => `<span class="crl">${element}</span>`).join(' ')}</td>`);
  
                  var td5 = $(`<td class="salary-hide">₹${salary}</td>`)
                  var td6 = $('<td  class="startDate-hide"></td>').text(startDate)
                  var td7 = $(`<td class="icons"><span onclick="delEmployee('${id}')" ><img class="delIcon" src="Assets/delete-black-18dp.svg" height="28px" width="28px" alt=""></span><span onclick="ediEmployee('${id}')" ><img class="creIcon" src="Assets/create-black-18dp.svg" style="margin-left: 50px;" height="28px" width="28px" alt=""></span></td>`)
                  trow.append(td1, td2, td3, td4, td5, td6, td7)
  
                  tbody.append(trow[0])
              }
  
          }
      }
      )
  }
  
  // function filterItems(data,filterData) {
  //     console.log("filtered")
  //     data = data.filter((item) => {
  //         return item.gender.toLowerCase()[0] === filterData.toLowerCase()[0] || item.name.toLowerCase().includes(filterData.toLowerCase());
  //     })
  //     return data
  
  // }
  
  // function delEmployee(id) {
  //     $.ajax({
  //         url: "http://localhost:3000/employee/" + id,
  //         type: "DELETE",
  //         success: () => {
  //             localStorage.setItem('deleted',true)
  //         }
  //     })
  
  // }
  // function ediEmployee(id){
  //     console.log(id)
  //     window.location.replace('form.html')
  //     localStorage.setItem("id",id)
  // }
  
  //  add user in table///////////////
  // function loadDataToTable() {
  //   $(document).ready(function () {
  //     $.getJSON("../db/db.json", function (data) {
  //       var tableBody = $("tbody");
  //       tableBody.empty();
  
  //       // Iterate over each item in the JSON array
  //       $.each(data, function (index, item) {
  //         // Create a new row and cells for each piece of data
  //         console.log(item.name.value);
  //         console.log(item.gender);
  //         console.log(item.salary);
  
  //         var row = $("<tr></tr>");
  //         row.append($("<td></td>").text(item.name));
  //         row.append($("<td></td>").text(item.gender));
  //         row.append($("<td></td>").text(item.department));
  //         row.append($("<td></td>").text(item.salary));
  //         row.append($("<td></td>").text(item.Startdate));
  
  //         // Add more cells as per your db.json structure
  
  //         // Append the row to the table body
  //         tableBody.append(row);
  //       });
  //     });
  //   });
  // }
  
  // function delEmployee(id) {
  //     $.ajax({
  //         url: "http://localhost:3000/employee/" + id,
  //         type: "DELETE",
  //         success: () => {
  
  //         }
  //     })
  
  // }
  