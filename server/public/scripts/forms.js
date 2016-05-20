// Initialize variables to track salaries and IDs
var totalSalaries = 0;

$(document).ready(function () {

  // Submit button event listener
  $('#employeeinfo').on('submit', postEmployee);

  // Delete button event listener
  $('main').on('click', '.chgStatus', changeStatus);

  // Load existing employees & salary total
  $.get('/employees', refreshList);
});

// Calculate monthly salary total & insert into aside element
function modifySalaryTotal(salary) {
  var total = salary[0].total;
  var monthly = (Math.round((total * 100) / 12)) / 100;
  $('aside').text('Total Monthly Salaries: $' + monthly);
}

// Rewrite all employees to the DOM
function refreshList(empInfo) {
  console.log(empInfo);
  $('#active-container').empty();
  $('#inactive-container').empty();

  empInfo.forEach(function (employee, i) {
    var prefix = '';
    var buttonText = '';

    // Direct the employee to either active or inactive list
    if (employee.active) {
      prefix = '#active-';
      buttonText = 'Set inactive';
    } else {
      prefix = '#inactive-';
      buttonText = 'Activate!';
    }

    $(prefix + 'container').append('<div class="person"></div>');

    // Set target to the created div and append a list a button, and data
    var $el = $(prefix + 'container').children().last();
    $el.append('<ul></ul><button class = "chgStatus">' + buttonText +
      '</button>');
    $el.data('id', employee.id);
    $el.data('status', employee.active);

    // Set target to the created list element and insert employee
    var $el2 = $(prefix + 'container').children().last().find('ul');
    $el2.append('<li>' + employee.first_name + '</li>');
    $el2.append('<li>' + employee.last_name + '</li>');
    $el2.append('<li>' + employee.id + '</li>');
    $el2.append('<li>' + employee.title + '</li>');
    $el2.append('<li>' + employee.salary + '</li>');
  });

  // Get new salary information and call DOM update
  $.get('/salary', modifySalaryTotal);

}

// Send new employee to database
function postEmployee(event) {
  event.preventDefault();
  var employee = {};
  var salary = 0;

  // put form fields into employee object
  $.each($('#employeeinfo').serializeArray(), function (i, field) {
    employee[field.name] = field.value;
  });

  // Post new employee
  $.post('/employees', employee, handleResponse);

  // clear out inputs and set focus back to first name
  $('#employeeinfo').find('input[type=text]').val('');
  $('#employeeinfo').find('input[type=number]').val('');
  $('#first_name').focus();

}

// function to handle ajax responses
function handleResponse(status) {
  if (status == 'Created' || status == 'OK' || status == 'PUT OK') {
    $.get('/employees', refreshList);
  } else {
    alert('Something went wrong!');
  }
}

// Change status event handler
function changeStatus(event) {

  // set target to object to be deleted & remove employee ID from array
  var employeeID = $(this).parent().data('id');
  var status = { newStatus: !$(this).parent().data('status')};
  console.log('DOM data', status);
  $.ajax({
    type: 'PUT',
    url: '/employees/' + employeeID,
    data: status,
    success: function (res) {
      console.log('PUT', res);
      handleResponse(res);
    },
  });
}
