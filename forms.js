$(document).ready(function () {
  var array = [];
  $('#employeeinfo').on('submit', function (event) {
    event.preventDefault();
    var values = {};
    $.each($('#employeeinfo').serializeArray(), function (i, field) {
      values[field.name] = field.value;
    });

    console.log(values);

    // clear out inputs
    //$('#employeeinfo').find('input[type=text]').val('');

    appendEmployee(values);
  });

  function appendEmployee(empInfo) {
    $('#container').append('<div class="person"></div>');

    // Set target to the created div and append a list and button
    var $el = $('#container').children().last();
    $el.append('<ul></ul><button>Delete Employee</button>');

    // Set target to the created list element and insert employee
    $el = $('#container').children().last().find('ul');
    $el.append('<li>' + empInfo.employeefirstname + '</li>');
    $el.append('<li>' + empInfo.employeelastname + '</li>');
    $el.append('<li>' + empInfo.employeeID + '</li>');
    $el.append('<li>' + empInfo.employeeTitle + '</li>');
    $el.append('<li>' + empInfo.employeeSalary + '</li>');
  }

});
