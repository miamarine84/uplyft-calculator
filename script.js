let installmentInterval;

let startFuction = () => {
    $("#form-tag").submit(function (e) {
        let loanAmount = $("#loan-amount").val();
        let startLoan = $("#start-date").val();
        let InstallmentAmount = $("#installment-amount").val();
        let interestRate = $("#interest-rate").val();
        e.preventDefault();
        // Validation
        if (typeof (startLoan) == "string" && typeof (loanAmount) == "string" && typeof (InstallmentAmount) == "string" && typeof (interestRate) == "string") {
            loanCalculator(startLoan, loanAmount, InstallmentAmount, interestRate)
        } else {
            alert('Please make sure you have input proper values for all the options')
        }
    });
};

// Handling the installment buttons

$("#installmentButton button").click(function (e) {
    let thisBtn = $(this);
    thisBtn.addClass("active").siblings().removeClass("active");
    installmentInterval = thisBtn.val();
    e.preventDefault();
    startFuction();
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
}
// ************ Daily Installment Interval ***********

let daily = (startLoan, loanAmount, InstallmentAmount, interestRate) => {
    let customerBalance = parseInt(loanAmount);

    startLoan = new Date(startLoan);

    let daysTillPayOff = 1;
    let balanceSchedule = [customerBalance];
    let dailyInterest;
    //Setting the variables that will go on our ammortizationAppender

    for (let i = 0; 0 < customerBalance; i++) {
        dailyInterest = customerBalance * ((interestRate / 100).toFixed(2) / 365);
        daysTillPayOff += 1;
        customerBalance += dailyInterest - InstallmentAmount;
        balanceSchedule.push(parseFloat(customerBalance).toFixed(2));
        if (InstallmentAmount < dailyInterest) {
            $("#final-payment").empty();
            $("#final-payment").append(`<h4> Invalid Entry your installment payment will be less then your monthly interest.</h4>`);
            $("#amortization-table").empty();
            return;
        }
    }
    //Setting the variables that will go on our weekendHolidayChecker

    let finalDailyPay = (daysTillPayOff) => {
        let payOffDate = new Date(startLoan)

        let dates = [];
        let schedule = [];
        for (let i = 0; i < balanceSchedule.length - 2; i++) {
            startLoan.setDate(startLoan.getDate() + 1);
            dates.push(startLoan.setDate(startLoan.getDate()));
            schedule.push(balanceSchedule[i]);
            // console.log(startLoan, balanceSchedule[i + 1]);

        }
        payOffDate.setDate(payOffDate.getDate() + daysTillPayOff);
        // console.log(`On ${payOffDate} all you will have left to pay is ${balanceSchedule[balanceSchedule.length - 2]}`);
        let lastPaymentAmount = balanceSchedule[balanceSchedule.length - 2];
        weekendHolidayChecker(payOffDate, lastPaymentAmount);
        amortizationAppender(dates, schedule);

    }


    finalDailyPay(daysTillPayOff)

}
// ************ Weekly Installment Interval ***********

let weekly = (startLoan, loanAmount, InstallmentAmount, interestRate) => {
    let customerBalance = parseInt(loanAmount);

    startLoan = new Date(startLoan);

    let daysTillPayOff = 1;
    let balanceSchedule = [customerBalance];
    let weeklyInterest;
    //Setting the variables that will go on our ammortizationAppender

    for (let i = 0; 0 < customerBalance; i++) {
        weeklyInterest = 7 * customerBalance * ((interestRate / 100).toFixed(2) / 365);
        daysTillPayOff += 7;
        customerBalance += weeklyInterest - InstallmentAmount;
        balanceSchedule.push(parseFloat(customerBalance).toFixed(2));
        console.log(weeklyInterest, InstallmentAmount)
        if (InstallmentAmount < weeklyInterest) {
            $("#final-payment").empty();
            $("#final-payment").append(`<h4> Invalid Entry your installment payment will be less then your monthly interest.</h4>`);
            $("#amortization-table").empty();
            return 0;
        }
    }
    //Setting the variables that will go on our weekendHolidayChecker
    let finalWeeksPay = (daysTillPayOff) => {

        let payOffDate = new Date(startLoan);

        let dates = [];
        let schedule = [];
        for (let i = 0; i < balanceSchedule.length - 2; i++) {
            startLoan.setDate(startLoan.getDate() + 7);
            dates.push(startLoan.setDate(startLoan.getDate()));
            schedule.push(balanceSchedule[i]);
        }
        payOffDate.setDate(payOffDate.getDate() + daysTillPayOff);

        let lastPaymentAmount = balanceSchedule[balanceSchedule.length - 2];
        weekendHolidayChecker(payOffDate, lastPaymentAmount)
        amortizationAppender(dates, schedule);
    }


    finalWeeksPay(daysTillPayOff);
}

// ************ Monthly Installment Interval ***********

let monthly = (startLoan, loanAmount, InstallmentAmount, interestRate) => {
    let customerBalance = parseInt(loanAmount);

    startLoan = new Date(startLoan);

    let daysTillPayOff = 1;

    let balanceSchedule = [customerBalance];
    let monthlyInterest;
    //Setting the variables that will go on our ammortizationAppender
    for (let i = 0; 0 < customerBalance; i++) {
        monthlyInterest = 30 * (customerBalance * ((interestRate / 100).toFixed(2) / 365));
        console.log(monthlyInterest)
        daysTillPayOff += 30;
        customerBalance += monthlyInterest - InstallmentAmount;
        balanceSchedule.push(parseFloat(customerBalance).toFixed(2));
        console.log(monthlyInterest, customerBalance)
        if (InstallmentAmount < monthlyInterest) {
            $("#final-payment").empty();
            $("#final-payment").append(`<h4> Invalid Entry your installment payment will be less then your monthly interest.</h4>`);
            $("#amortization-table").empty();
            return 0;
        }
    }
    //Setting the variables that will go on our weekendHolidayChecker
    let finalMonthsPay = (daysTillPayOff) => {
        let payOffDate = new Date(startLoan);

        let dates = [];
        let schedule = [];
        for (let i = 0; i < balanceSchedule.length - 1; i++) {
            startLoan.setDate(startLoan.getDate() + 30);
            dates.push(startLoan.setDate(startLoan.getDate()));
            schedule.push(balanceSchedule[i]);

        }
        payOffDate.setDate(payOffDate.getDate() + daysTillPayOff);
        let lastPaymentAmount = balanceSchedule[balanceSchedule.length - 2];

        // console.log(`On ${payOffDate} all you will have left to pay is ${balanceSchedule[balanceSchedule.length - 2]}`);
        weekendHolidayChecker(payOffDate, lastPaymentAmount)
        amortizationAppender(dates, schedule);

    }


    finalMonthsPay(daysTillPayOff)

}

// Using this in Amortization Table and weekendHolidayChecker to display the full date
let weekdayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let weekendHolidayChecker = (payOffDate, lastPaymentAmount) => {
    //Validation    
    if (payOffDate == "Invalid Date") {
        alert("Please try again ");
        $("#final-payment").empty();
        $("#amortization-table").empty();
    }
    //Checking to see if payOffDate is a weekend date or not 
    if (payOffDate.getDay() == 6 || payOffDate.getDay() == 0) {
        payOffDate.setDate(payOffDate.getDate() + 1)
        console.log('passing this holiday!')
        return weekendHolidayChecker(payOffDate, lastPaymentAmount)

    } else {
        let holidayComparer
        console.log(payOffDate, "Made IT through all the holidays!!!");
        $("body").addClass("background-changer");
        if (payOffDate.getMonth() < 10) {
            holidayComparer = `${payOffDate.getFullYear()}-0${payOffDate.getMonth() + 1}-0${payOffDate.getDate()}`
        } else {
            holidayComparer = `${payOffDate.getFullYear()}-${payOffDate.getMonth() + 1}-${payOffDate.getDate()}`
        }
        // Comparing holidays of the year to our lastPaymentAmount on line 221 if true we make this in to a recursive function to check weekend and holidays again more documentation in https://calendarific.com/api-documentation
        axios.get(`https://calendarific.com/api/v2/holidays?&api_key=22fcccfee538966ec4663c5ae13ed473318871cb&country=US&year=${payOffDate.getFullYear()}&type=national`).then(result => {
            for (let i = 0; i < result.data.response.holidays.length; i++) {
                if (holidayComparer == result.data.response.holidays[i].date.iso) {
                    payOffDate.setDate(payOffDate.getDate() + 1)
                    weekendHolidayChecker(payOffDate, lastPaymentAmount);
                    console.log('Skipped a Holiday');

                }
            }
        }).catch(error => {
            console.log(error)
        })
        $("#final-payment").empty();
        // Appending our needed final payment to display to the user
        $("#final-payment").append(`Your last payment will be on ${weekdayArray[payOffDate.getDay()]} ${monthArray[payOffDate.getMonth()]}, ${payOffDate.getDate()} ${payOffDate.getFullYear()} for ${lastPaymentAmount}`)
        if (lastPaymentAmount == undefined) {
            $("#final-payment").empty();
            alert("Please try again ");
        }

    }
}

let amortizationAppender = (dates, schedule) => {
    $("#amortization-table").empty();

    // Initializing our arrays that will get pushed data with proper date for example March 6,2021
    let days = [];
    let weekday = [];
    let month = [];
    let year = [];
    // using the push method to create a full daym month and year that we wil show on line 265 throgh 270
    for (let i = 0; i < dates.length; i++) {
        days.push(new Date(dates[i]))
        weekday.push(days[i].getDay())
        month.push(days[i].getMonth())
        year.push(days[i].getFullYear())
    }
    // Validation of all inputs 
  
    if (days[1] == 'Invalid Date') {
        alert("Please try again ");
        $("#final-payment").empty();
        $("#amortization-table").empty();
        return 0;
    };
    // Appending Amortizaiton Table with the Date object and our arrays we created on lines 192 and 193
    for (let i = 1; i < days.length; i++) {
        $("#amortization-table").append(`<tr>
        <td>  On ${weekdayArray[weekday[i]]}  </td>
        <td> ${monthArray[month[i]]}  </td>
        <td> ${days[i].getDate()},    </td>
        <td> ${year[i]} Your balance will be: $${schedule[i]}`)
    }

}
