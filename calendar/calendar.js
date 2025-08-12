const monthYearElement = document.getElementById('monthYr');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 0);
    const lastDay = new Date(currentYear, currentMonth+1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', {month : 'long', year : 'numeric'});
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';
    let i=0, j=0;
    for(i = firstDayIndex; i>0; i--){
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
        datesHTML += `<div class="date inactive" id="d${j}">${prevDate.getDate()}</div>`;
        j++;
    }

    for(i=1; i<=totalDays; i++){
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        datesHTML += `<div class="date ${activeClass}" id="d${j}">${i}</div>`;
        j++;
    }

    for(i=1; i<=7-lastDayIndex; i++){
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div class="date inactive" id="d${j}">${nextDate.getDate()}</div>`;
        j++;
    }
    datesElement.innerHTML = datesHTML;

}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth()-1);
    updateCalendar();
})
nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth()+1);
    updateCalendar();
})

updateCalendar();