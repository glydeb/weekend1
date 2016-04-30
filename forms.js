$(document).ready(function () {
  var totalSalaries = 0;
  $('#employeeinfo').on('submit', function (event) {
    event.preventDefault();
    var values = {};
    var salary = 0;
    var employeeIDs = [];
    $.each($('#employeeinfo').serializeArray(), function (i, field) {
      values[field.name] = field.value;
    });

    console.log(values);

    // check salary for spaces and reject if found
    // otherwise, process it
    var spaces = checkSalary(values.employeeSalary);
    var unique = checkID(values.employeeID);
    if (!spaces && unique) {
      salary = parseFloat(values.employeeSalary);
      if (isNaN(salary)) {
        alert('Invalid salary entered - please revise & resubmit');
      } else {
        totalSalaries += salary;

        // clear out inputs
        //$('#employeeinfo').find('input[type=text]').val('');
        modifySalaryTotal(totalSalaries);
        appendEmployee(values);
      }
    }
  });

  function checkSalary(salaryString) {
    for (var i = 0; i < salaryString.length; i++) {
      if (salaryString.charAt(i) === ' ') {
        alert('Invalid salary entered - please revise & resubmit');
        return true;
      }
    }

    return false;
  }

  function checkID(empID) {
    for (var i = 0; i < employeeIDs.length; i++) {
      if (empID === employeeIDs[i]) {
        alert('That ID is alredy in use - please revise & resubmit');
        return false;
      }
    }

    return true;
  }

  function modifySalaryTotal(total) {
    $('aside').empty();
    $('aside').text('Total Annual Salaries: $' + total);
  }

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
