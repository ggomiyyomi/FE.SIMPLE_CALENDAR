const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNectIcon = document.querySelectorAll(".icons span");
// addbutton = document.querySelectorAll(".show-modal");


// 현재 year과 month 업데이트 
let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();

// 월 영어로 변경
const months = ["January","February","March","Aprill","May","June","July","August","September","October","November","December"];



// console.log(date,currYear,currMonth);
const renderCalendar = () => {
    let today = new Date(); //오늘 날짜
    let firstDayofMonth = new Date(currYear,currMonth, 1).getDay(), // 이전달 마지막일자표시 28, 29, 30 ...
    lastDateofMonth = new Date(currYear,currMonth+1, 0).getDate(), // 해당월의 마지막일 ()
    lastDayofMonth = new Date(currYear,currMonth, lastDateofMonth).getDay(), // 다음달 첫번째일자 표시 1,2,3 ...
    lastDateofLastMonth = new Date(currYear,currMonth, 0).getDate(); // 이전월의 마지막일
    let liTag = "";
    // console.log(lastDateofMonth);


    for (let i = firstDayofMonth; i > 0; i--) { // 이전달의 마지막날 표시
        // console.log(i);
        liTag += `<li class="inactive">${lastDateofLastMonth-i+1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // 해당 달의 모든 날짜

        // 현재 년,월,일이 모두 일치하면 , 현재날짜에 표시
        // let isToday = i === date.getDate() && currMonth === new Date().getMonth()
        //                     && currYear === new Date().getFullYear() ? "active" : ""; 
        let isToday = i === today.getDate() && currMonth === today.getMonth()
                    && currYear === today.getFullYear() ? "active" : ""; 
        // console.log(i);
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // 다음 달의 첫번째날 표시
        liTag += `<li class="inactive">${ i-lastDayofMonth+1}</li>`;
    }

    currentDate.innerText =`${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

}
renderCalendar();

//이전, 이후 버튼
prevNectIcon.forEach(icon => {
    icon.addEventListener("click", () => { // 두버튼 클릭시 추가
        // console.log(icon);
        //만약 클릭 버튼이 이전 버튼이면, 현재 달에서 1감소 그렇지 않으면 1증가
        currMonth=icon.id === "prev"? currMonth-1:currMonth+1;

        //만약 현재 달이 0 미만, 11초과할 경우, 현재 년,월의 새로운 일자 생성하고 일자 값 넘기기 
        if(currMonth < 0 || currMonth > 11 ) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // 새로운 년도와 함께 현재 년도 업데이트
            currMonth = date.getMonth(); //새로운 달과 함께 현재 월 업데이트
        } else { // 그렇지 않으면 새로운 일자만 넘기기
            date = new Date();
        }
        renderCalendar();

    });
});


//일정 추가 버튼
// addbutton.forEach(button=> {
//     button.addEventListener("click", () => {
//         // console.log(button);
        
//         renderCalendar();
//     });
// });