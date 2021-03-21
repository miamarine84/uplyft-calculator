let installmentInterval;
// let todaysDate = new Date();
// todaysDate = `${todaysDate.getFullYear()}-0${todaysDate.getMonth()+1}-0${todaysDate.getDate()}`;
// console.log(todaysDate)
// $("#start-date").attr("min", todaysDate)
$("#form-tag").submit(function (e) {
    let loanAmount = $("#loan-amount").val();
    let startLoan = $("#start-date").val();
    let InstallmentAmount = $("#installment-amount").val();
    let interestRate = $("#interest-rate").val();
    e.preventDefault();
    loanCalculator(startLoan, loanAmount, InstallmentAmount, interestRate)
});

// Handling the installment buttons

$("#installmentButton button").click(function (e) {
    let thisBtn = $(this);
    thisBtn.addClass("active").siblings().removeClass("active");
    installmentInterval = thisBtn.val();
    e.preventDefault();
});




let loanCalculator = (startLoan, loanAmount, InstallmentAmount, interestRate) => {
    if (installmentInterval == "daily") {
        daily(startLoan, loanAmount, InstallmentAmount, interestRate);
    } else if (installmentInterval == "weekly") {
        weekly(startLoan, loanAmount, InstallmentAmount, interestRate);
    } else if (installmentInterval == "monthly") {
        monthly(startLoan, loanAmount, InstallmentAmount, interestRate);
    } else {
        alert("Please check all your choices and submit again");
    }

    // AJAX call to weed out the holidays from our loan estimate

    // let holidayUrl = "https://holidayapi.com/v1/holidays?pretty&key=693e5294-a29e-4650-8293-40b3e0579350&country=US&year=2020&public=true"
    // $.ajax({
    //     url: holidayUrl,
    //     type: "GET",
    //     success: function(result){
    //         console.log(result)
    //     },
    //     error:function(error){
    //         console.log(`Error ${error}`);
    //     }
    // })

}
// ************ Daily Installment Interval ***********

let daily = (startLoan, loanAmount, InstallmentAmount, interestRate) => {
    let customerBalance = parseInt(loanAmount);

    startLoan = new Date(startLoan);

    let daysTillPayOff = 1;
    let balanceSchedule = [customerBalance];
    let dailyInterest;
    for (let i = 0; 0 < customerBalance; i++) {
        dailyInterest = customerBalance * (interestRate / 365);
        daysTillPayOff += 1;
        customerBalance += dailyInterest - InstallmentAmount;
        balanceSchedule.push(parseFloat(customerBalance).toFixed(2));
    }

    let finalDailyPay = (daysTillPayOff) => {
        let payOffDate = new Date(startLoan)


        for (let i = 0; i < balanceSchedule.length - 2; i++) {
            startLoan.setDate(startLoan.getDate() + 1)
            console.log(startLoan, balanceSchedule[i + 1])
            amortizationAppender(startLoan, balanceSchedule[i])
        }
        payOffDate.setDate(payOffDate.getDate() + daysTillPayOff);
        console.log(`On ${payOffDate} all you will have left to pay is ${balanceSchedule[balanceSchedule.length - 2]}`);
        let lastPaymentAmount = balanceSchedule[balanceSchedule.length - 2];
        weekendHolidayChecker(payOffDate, lastPaymentAmount);

        console.log(balanceSchedule)
    }


    finalDailyPay(daysTillPayOff)

}
// ************ Weekly Installment Interval ***********

let weekly = (startLoan, loanAmount, InstallmentAmount, interestRate) => {
    let customerBalance = parseInt(loanAmount);

    startLoan = new Date(startLoan);

    let daysTillPayOff = 1;
    let balanceSchedule = [customerBalance * (interestRate / 365)];
    let dailyInterest;
    for (let i = 0; 0 < customerBalance; i++) {
        dailyInterest = customerBalance * (interestRate / 365);
        daysTillPayOff += 1;
        if (i % 7 == 0) {
            customerBalance += dailyInterest - InstallmentAmount;
            balanceSchedule.push(parseFloat(customerBalance).toFixed(2));

        }
    }

    let finalWeeksPay = (daysTillPayOff) => {

        let payOffDate = new Date(startLoan);


        for (let i = 0; i < balanceSchedule.length - 2; i++) {
            startLoan.setDate(startLoan.getDate() + 7);
            console.log(startLoan, balanceSchedule[i + 1]);
        }
        payOffDate.setDate(payOffDate.getDate() + daysTillPayOff);
        let lastPaymentAmount = balanceSchedule[balanceSchedule.length - 2];
        console.log(`On ${payOffDate} all you will have left to pay is ${balanceSchedule[balanceSchedule.length - 2]}`);
        weekendHolidayChecker(payOffDate, lastPaymentAmount)

        console.log(balanceSchedule);
    }


    finalWeeksPay(daysTillPayOff);
}

// ************ Monthly Installment Interval ***********

let monthly = (startLoan, loanAmount, InstallmentAmount, interestRate) => {
    let customerBalance = parseInt(loanAmount);

    startLoan = new Date(startLoan);

    let daysTillPayOff = 1;

    let balanceSchedule = [customerBalance];
    let dailyInterest;
    for (let i = 0; 0 < customerBalance; i++) {
        dailyInterest = customerBalance * (interestRate / 365);
        daysTillPayOff += 1;
        if (i % 30 == 0) {
            customerBalance += dailyInterest - InstallmentAmount;
            balanceSchedule.push(parseFloat(customerBalance).toFixed(2));
        }
    }

    let finalMonthsPay = (daysTillPayOff) => {
        let payOffDate = new Date(startLoan);


        for (let i = 0; i < balanceSchedule.length - 2; i++) {
            startLoan.setDate(startLoan.getDate() + 30);
            console.log(startLoan, balanceSchedule[i + 1]);
        }
        payOffDate.setDate(payOffDate.getDate() + daysTillPayOff);
        let lastPaymentAmount = balanceSchedule[balanceSchedule.length - 2];
        console.log(`On ${payOffDate} all you will have left to pay is ${balanceSchedule[balanceSchedule.length - 2]}`);
        weekendHolidayChecker(payOffDate, lastPaymentAmount)

        console.log(balanceSchedule);
    }


    finalMonthsPay(daysTillPayOff)

}




let weekendHolidayChecker = (payOffDate, lastPaymentAmount) => {


    console.log(payOffDate, lastPaymentAmount);
    console.log(payOffDate.getFullYear());
    if (payOffDate.getDay() == 6 || payOffDate.getDay() == 0) {
        payOffDate.setDate(payOffDate.getDate() + 1)
        weekendHolidayChecker(payOffDate, lastPaymentAmount)
    } else {
        console.log(payOffDate)
        console.log("not weekend");
    }

    let holidaysInYear = [];
    axios.get(`http://holidayapi.com/v1/holidays?pretty&key=fcc80f4d-87c4-4580-a0fc-57ac04d3309f&country=US&year=${payOffDate.getFullYear()}&public=true`).then(result => {
        console.log(result.data);

    }).catch(error => {
        console.log(error)
    })

}

let amortizationAppender = (loanDate, schedule) =>{
    console.log(loanDate, schedule)
let weekdayArray = [];
weekdayArray[0] = "Sunday";
weekdayArray[1] = "Monday";
weekdayArray[2] = "Tuesday";
weekdayArray[3] = "Wednesday";
weekdayArray[4] = "Thursday";
weekdayArray[5] = "Friday";
weekdayArray[6] = "Saturday";

let weekday = weekdayArray[loanDate.getDate()]

let monthArray = [];
monthArray[0] = "January";
monthArray[1] = "February";
monthArray[2] = "March";
monthArray[3] = "April";
monthArray[4] = "May";
monthArray[5] = "June";
monthArray[6] = "July";
monthArray[7] = "August";
monthArray[8] = "September";
monthArray[9] = "October";
monthArray[10] = "November";
monthArray[11] = "December";

let month = monthArray[loanDate.getMonth()]
    $("#amortization-table").append(`<tr><td> ${weekday} </td><td> ${month} </td><td> ${loanDate.getDate()} </td><td> ${loanDate.getFullYear()}, </td><td> ${schedule} </td></tr>`)
}