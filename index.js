function isInteger(value) {
            return /^-?\d+$/.test(value);
        }

function isValidDate(day, month, year) {
          var maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Максимальное количество дней в каждом месяце (январь - 0, февраль - 1 и так далее)

          // Проверка високосного года (февраль может иметь 29 дней)
          if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
            maxDays[1] = 29; // Февраль имеет 29 дней в високосный год
          }

          // Проверка корректности дня и месяца
          if (day >= 1 && day <= maxDays[month - 1] && month >= 1 && month <= 12) {
            return true; // Дата считается корректной
          } else {
            return false; // Дата считается некорректной
          }
        }


function calcAge(){
  var dayInput = document.getElementById('day-input').value;
  var monthInput = document.getElementById('month-input').value;
  var yearInput = document.getElementById('year-input').value;

  var dayLabel = document.querySelector('label[for="day-input"]');
  var monthLabel = document.querySelector('label[for="month-input"]');
  var yearLabel = document.querySelector('label[for="year-input"]');

  var currentYear = new Date().getFullYear();

  var yearsElement = document.getElementById('years');
  var monthsElement = document.getElementById('months');
  var daysElement = document.getElementById('days');

  if (dayInput === '') {
  dayErrorText.style.display = 'block';
  dayErrorText.innerText = 'This file is required';
  dayLabel.classList.add('error-label');
  } else if (!isInteger(dayInput) || parseInt(dayInput, 10) < 1 || parseInt(dayInput, 10) > 31) {
    dayErrorText.style.display = 'block';
    dayErrorText.innerText = 'Must be a walid day';
    dayLabel.classList.add('error-label');
  }
  else {
    dayErrorText.style.display = 'none';
    dayLabel.classList.remove('error-label');
  }

  if (monthInput === '') {
  monthErrorText.style.display = 'block';
  monthErrorText.innerText = 'This file is required';
  monthLabel.classList.add('error-label');
  }
  else if (!isInteger(monthInput) || parseInt(monthInput, 10) < 1 || parseInt(monthInput, 10) > 12) {
      monthErrorText.style.display = 'block';
      monthErrorText.innerText = 'Must be a walid month';
      monthLabel.classList.add('error-label');
    }
   else {
    monthErrorText.style.display = 'none';
    monthLabel.classList.remove('error-label');
  }

  if (yearInput === '') {
  yearErrorText.style.display = 'block';
  yearErrorText.innerText = 'This file is required';
  yearLabel.classList.add('error-label');
  } else if (!isInteger(yearInput) || parseInt(yearInput, 10) < 1900 || parseInt(yearInput, 10) > currentYear) {
    yearErrorText.style.display = 'block';
    yearErrorText.innerText = 'Must be in the past';
    yearLabel.classList.add('error-label');
  }
  else {
  yearErrorText.style.display = 'none';
  yearLabel.classList.remove('error-label');
  }

if (dayInput !== '' && monthInput !== '' && yearInput !== '') {
    //isValidDate(dayInput,monthInput,yearInput);
     if (!isValidDate(dayInput,monthInput,yearInput)) {
         dayErrorText.style.display = 'block';
         dayErrorText.innerText = 'Must be a walid date';
         dayLabel.classList.add('error-label');
         monthLabel.classList.add('error-label');
         yearLabel.classList.add('error-label');
        } else {
         dayErrorText.style.display = 'none';
         var age = calculateAge(yearInput, monthInput, dayInput);
         yearsElement.innerHTML = `<span class="dash">${age.years}</span> years`;
         monthsElement.innerHTML = `<span class="dash">${age.months}</span> months`;
         daysElement.innerHTML = `<span class="dash">${age.days}</span> days`;
       }
     }

}

function calculateAge(year, month, day) {
  var currentDate = new Date(); // Текущая дата
  var inputDate = new Date(year, month - 1, day); // Введенная дата (месяцы в JavaScript начинаются с 0)

  var yearsDiff = currentDate.getFullYear() - inputDate.getFullYear(); // Разница в годах
  var monthsDiff = currentDate.getMonth() - inputDate.getMonth(); // Разница в месяцах
  var daysDiff = currentDate.getDate() - inputDate.getDate(); // Разница в днях

  // Если текущий месяц меньше месяца введенной даты или если текущий месяц равен месяцу введенной даты,
  // но текущий день меньше дня введенной даты, то уменьшаем количество лет на 1
  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    yearsDiff--;
  }

  // Если текущий месяц меньше месяца введенной даты, добавляем 12 к разнице в месяцах
  if (monthsDiff < 0) {
    monthsDiff += 12;
  }

  // Если текущий день меньше дня введенной даты, вычитаем разницу из количества дней и добавляем
  // количество дней в месяце предыдущего месяца
  if (daysDiff < 0) {
    monthsDiff--;
    var prevMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1; // Предыдущий месяц
    daysDiff += new Date(currentDate.getFullYear(), prevMonth + 1, 0).getDate();
  }

  return {
    years: yearsDiff,
    months: monthsDiff,
    days: daysDiff
  };
}
