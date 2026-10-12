/*Qayda1: Ay gün il daxil edilmədikdə DAY, MONTH, YEAR yazıları qırmızı rəngdə olacaq və
borderin altından "This field is request" yazısı yazılacaq qırmızı rəgdə*/

/*Qayda2: Hər ayın özünün 28-31 aralığında günü olacaq seçilmiş ayda olan gündən çox gün daxil
edilərsə və ya gün 1-dən az olrsa "Must be a valid day" yazısı yazılacaq */

/*Qayda 3: Ayın rəqəmi 1-dən az 12-dən çox olarsa xəta baş vercək "Must be a valid month" yazısı
  yazılacaq */

/*Qayda 4: İl rəqəmi 0-dan az və ya hazırki tarixdən böyük rəqəm daxil edilərsə "Must be in the past"
  yazısı yazılacaq */


/*Ay düzgün gün yanlış olarsa "Must be a valid date" yazılacaq */

//Gün, ay, ilin elementləri
const form = document.getElementById('ageForm');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

//Xəta mesajlarının elementləri
const errorTextDay1 = document.getElementById('errorTextDay1');
const errorTextDay2 = document.getElementById('errorTextDay2');
const errorTextDay3 = document.getElementById('errorTextDay3');
const errorTextMonth1 = document.getElementById('errorTextMonth1');
const errorTextMonth2 = document.getElementById('errorTextMonth2');
const errorTextYear1 = document.getElementById('errorTextYear1');
const errorTextYear2 = document.getElementById('errorTextYear2');

// Nəticə elementləri
const yearsResult = document.getElementById('yearsResult');
const monthsResult = document.getElementById('monthsResult');
const daysResult = document.getElementById('daysResult');

// Submit butonu
const submitBtn = document.getElementById("submitBtn");

// Bütün xətaları sıfırla
function clearErrors() {
    // inputGroup-lardan error classını sil (label + border sıfırlanır)
    dayInput.closest('.inputGroup').classList.remove('error');
    monthInput.closest('.inputGroup').classList.remove('error');
    yearInput.closest('.inputGroup').classList.remove('error');

    // Xəta mətnlərini gizlət
    errorTextDay1.style.display = 'none';
    errorTextDay2.style.display = 'none';
    errorTextDay3.style.display = 'none';
    errorTextMonth1.style.display = 'none';
    errorTextMonth2.style.display = 'none';
    errorTextYear1.style.display = 'none';
    errorTextYear2.style.display = 'none';
}

//Event hadisələri
form.addEventListener('submit', function (e) {
    e.preventDefault();

    clearErrors();

    //Dəyərlərin yoxlanılması
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);
    let isValid = true;

    if (!dayInput.value) { //əgər day boş olarsa
        errorTextDay1.style.display = 'block';
        dayInput.closest('.inputGroup').classList.add('error');
        isValid = false;
    }

    if (!monthInput.value) { //əgər ay boş olarsa
        errorTextMonth1.style.display = 'block';
        monthInput.closest('.inputGroup').classList.add('error');
        isValid = false;
    }

    if (!yearInput.value) { //əgər il boş olarsa
        errorTextYear1.style.display = 'block';
        yearInput.closest('.inputGroup').classList.add('error');
        isValid = false;
    }

    if (!isValid) return;

    if (month < 1 || month > 12) {
        errorTextMonth2.style.display = 'block';
        monthInput.closest('.inputGroup').classList.add('error');
        isValid = false;
    }

    if (year < 1 || year > (new Date().getFullYear())) {
        errorTextYear2.style.display = 'block';
        yearInput.closest('.inputGroup').classList.add('error');
        isValid = false;
    }

    // Hər ayın gün sayları (Fevral sabit 28 gün olmaqla)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let maxDays = 31;
    if (month >= 1 && month <= 12) {
        maxDays = daysInMonth[month - 1];
    }

    // Günün yoxlanılması (seçilmiş ayın gün sayına uyğun)
    if (day < 1 || day > maxDays) {
        errorTextDay3.style.display = 'block';
        dayInput.closest('.inputGroup').classList.add('error');
        isValid = false;
    }

    if (!isValid) return;

    // Hesablama funksiyasını çağırırıq
    calculateAge(day, month, year);
});

function calculateAge(birthDay, birthMonth, birthYear) {
    const today = new Date();

    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1; // Yanvar 0-dan başlayır deyə +1 edirik
    let currentDay = today.getDate();

    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    // Əgər cari gün doğum günündən kiçikdirsə, əvvəlki ay günlərindən borc götürürük
    if (days < 0) {
        months--;
        // Keçmiş ayın neçə gündən ibarət olduğunu tapırıq
        const prevMonth = new Date(currentYear, currentMonth - 1, 0);
        days += prevMonth.getDate();
    }

    // Əgər cari ay doğum ayından kiçikdirsə, illərdən borc götürürük
    if (months < 0) {
        years--;
        months += 12;
    }

    // Nəticələri ekrana yazdırırıq
    yearsResult.firstChild.textContent = years + ' ';
    monthsResult.firstChild.textContent = months + ' ';
    daysResult.firstChild.textContent = days + ' ';
}

