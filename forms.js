$(document).ready(function () {

  // Initialize variables to track salaries and IDs
  var totalSalaries = 0;
  var employeeIDs = [];

  // Delete button event handler
  $('#container').on('click', 'button', function () {

    // set target to object to be deleted & remove employee ID from array
    var $target = $(this).parent();
    removeID($target.data('employeeID'));

    // get salary to be removed and deduct it from running total
    totalSalaries -= parseFloat($target.data('employeeSalary'));
    modifySalaryTotal(totalSalaries);
    $(this).parent().remove();
  });

  // function to remove employeeID from array when an employee is deleted.
  function removeID(empID) {
    for (var i = 0; i < employeeIDs.length; i++) {
      if (empID === employeeIDs[i]) {
        employeeIDs.splice(i, 1);
        return true;
      }
    }
  }

  // Submit button event handler
  $('#employeeinfo').on('submit', function (event) {
    event.preventDefault();
    var values = {};
    var salary = 0;
    $.each($('#employeeinfo').serializeArray(), function (i, field) {
      values[field.name] = field.value;
    });

    // Check salary for usable input and reject if not usable.
    // Otherwise, process it.
    var validSalary = checkSalary(values.employeeSalary);
    var unique = checkID(values.employeeID, employeeIDs);
    if (validSalary && unique) {
      salary = parseFloat(values.employeeSalary);
      if (isNaN(salary)) {
        alert('Invalid salary entered - please revise & resubmit');
      } else {
        totalSalaries += salary;
        employeeIDs.push(values.employeeID);
        console.log(employeeIDs);

        // clear out inputs
        $('#employeeinfo').find('input[type=text]').val('');

        // add employee entry & update the salary total
        modifySalaryTotal(totalSalaries);
        appendEmployee(values, salary);
      }
    }
  });

  function checkSalary(salaryString) {
    for (var i = 0; i < salaryString.length; i++) {
      if (salaryString.charAt(i) != parseInt(salaryString[i]) &&
        salaryString.charAt(i) != '.') {
        alert('Invalid salary entered - please revise & resubmit');
        return false;
      }
    }

    return true;
  }

  function checkID(empID, listOfIDs) {
    for (var i = 0; i < listOfIDs.length; i++) {
      if (empID === employeeIDs[i]) {
        alert('That ID is alredy in use - please revise & resubmit');
        return false;
      }
    }

    return true;
  }

  // Calculate monthly salary total & insert into aside element
  function modifySalaryTotal(total) {
    var monthly = (Math.round((total * 100) / 12)) / 100;
    $('aside').text('Total Monthly Salaries: $' + monthly);
  }

  function appendEmployee(empInfo, salary) {
    $('#container').append('<div class="person"></div>');

    // Set target to the created div and append a list a button, and data
    var $el = $('#container').children().last();
    $el.append('<ul></ul><button>Delete Employee</button>');
    $el.data(empInfo);

    // Set target to the created list element and insert employee
    var $el2 = $('#container').children().last().find('ul');
    $el2.append('<li>' + empInfo.employeefirstname + '</li>');
    $el2.append('<li>' + empInfo.employeelastname + '</li>');
    $el2.append('<li>' + empInfo.employeeID + '</li>');
    $el2.append('<li>' + empInfo.employeeTitle + '</li>');
    $el2.append('<li>' + empInfo.employeeSalary + '</li>');

  }

});
