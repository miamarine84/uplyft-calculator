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
        startLoan.setDate(startLoan.getDate() + 1) // Quick Fix check on it more
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
        startLoan.setDate(startLoan.getDate() + 1); // Quick Fix check on it more
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
        daysTillPayOff += 31;
        customerBalance += monthlyInterest - InstallmentAmount;
        balanceSchedule.push(parseFloat(customerBalance).toFixed(2));
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
            startLoan.setDate(startLoan.getDate() + 31);
            dates.push(startLoan.setDate(startLoan.getDate()));
            schedule.push(balanceSchedule[i]);

        }
        payOffDate.setDate(payOffDate.getDate() + daysTillPayOff);
        let lastPaymentAmount = balanceSchedule[balanceSchedule.length - 2];


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
        alert("Please try again line 204");
        $("#final-payment").empty();
        $("#amortization-table").empty();
        return;
    }
    //Checking to see if payOffDate is a weekend date or not 
    if (payOffDate.getDay() == 6 || payOffDate.getDay() == 0) {
        payOffDate.setDate(payOffDate.getDate() + 1)
        console.log('passing this weekend!')
        return weekendHolidayChecker(payOffDate, lastPaymentAmount)

    } else {
        let holidayComparer
        console.log(payOffDate, "Made IT through all the weekend!!!");
        $("body").addClass("background-changer");
        if (payOffDate.getMonth() < 10) {
            holidayComparer = `${payOffDate.getFullYear()}-0${payOffDate.getMonth() + 1}-0${payOffDate.getDate()}`
        } else {
            holidayComparer = `${payOffDate.getFullYear()}-${payOffDate.getMonth() + 1}-${payOffDate.getDate()}`
        }
        // Comparing holidays of the year to our lastPaymentAmount on line 221 if true we make this in to a recursive function to check weekend and holidays again more documentation in https://calendarific.com/api-documentation
        axios.get(`https://calendarific.com/api/v2/holidays?&api_key=45aee06a4ce31ccbb9ec0b95882f03a67addf6ee&country=US&year=${payOffDate.getFullYear()}&type=national`).then(result => {
            for (let i = 0; i < result.data.response.holidays.length; i++) {
                if (holidayComparer == result.data.response.holidays[i].date.iso) {
                    payOffDate.setDate(payOffDate.getDate() + 1)
                    weekendHolidayChecker(payOffDate, lastPaymentAmount);
                    console.log(lastPaymentAmount)
                    console.log('Skipped a Holiday');

                }
            }
        }).catch(error => {
            console.log(error)
        })
        $("#final-payment").empty();
        // Appending our needed final payment to display to the user
        $("#final-payment").append(`Your last payment will be on: <br>${weekdayArray[payOffDate.getDay()]} ${monthArray[payOffDate.getMonth()]}, ${payOffDate.getDate()} ${payOffDate.getFullYear()} for $${lastPaymentAmount}`)
        if (lastPaymentAmount == undefined) {
            $("#final-payment").empty();
            alert("Please try again");
            return;
        }

    }
}

let amortizationAppender = (dates, schedule) => {
    // Validation of all inputs


    $("#amortization-table").empty();
    if (isNaN(dates[0])) {
        alert("Please try again");
        $("#final-payment").empty();
        $("#amortization-table").empty();
        return;
    }
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



    // Appending Amortizaiton Table with the Date object and our arrays we created on lines 192 and 193
    for (let i = 0; i < days.length; i++) {

        console.log(i)
        //           let holidayComparer = `${days[i].getFullYear()}-${days[i].getMonth() + 1}-${days[i].getDate()}`;

        //     if (days[i].getMonth() < 10) {
        //         holidayComparer = `${days[i].getFullYear()}-0${days[i].getMonth() + 1}-${days[i].getDate()}`
        //     } else {
        //         holidayComparer = `${days[i].getFullYear()}-${days[i].getMonth() + 1}-${days[i].getDate()}`
        //     }
        // const promise1 = new Promise((resolve, reject) => {
        //     axios.get(`https://calendarific.com/api/v2/holidays?&api_key=45aee06a4ce31ccbb9ec0b95882f03a67addf6ee&country=US&year=${days[i].getFullYear()}&type=national`).then(result => {
        //         console.log('here')
        //         for (let x = 0; x < result.data.response.holidays.length; x++) {
        //             if (holidayComparer == result.data.response.holidays[x].date.iso) {
        //                 console.log(result.data.response.holidays[x].date.iso)
        //                 console.log(holidayComparer)
        //                 console.log(i)
        //                 resolve(true)
        //                 console.log('did this')
        //                 i++

        //                 console.log(i)

        //             }
        //         }
        //     }).catch(error => {
        //         console.log(error)
        //     })
        // })

        // promise1.then((value) => {
        //     console.log(value)
        // });

        if (days[i].getDay() == 0 || days[i].getDay() == 6) {
            console.log('skipping payment on weekends')

        }
        else {


            //     const promise1 = new Promise((resolve, reject) => {
            //     axios.get(`https://calendarific.com/api/v2/holidays?&api_key=45aee06a4ce31ccbb9ec0b95882f03a67addf6ee&country=US&year=${days[i].getFullYear()}&type=national`).then(result => {
            //         console.log('here')
            //         for (let x = 0; x < result.data.response.holidays.length; x++) {
            //             if (holidayComparer == result.data.response.holidays[x].date.iso) {
            //                 console.log(result.data.response.holidays[x].date.iso)
            //                 console.log(holidayComparer)
            //                 console.log(i)
            //                 resolve(true)
            //                 console.log('did this')
            //                 i++

            //                 console.log(i)

            //             }
            //         }
            //     }).catch(error => {
            //         console.log(error)
            //     })
            // })
            console.log(weekdayArray[weekday[i]])
            $("#amortization-table").append(`<tr>
            <td >  On ${weekdayArray[weekday[i]]}  </td>
            <td > ${monthArray[month[i]]} ${days[i].getDate()}, ${year[i]}  </td>
            <td > Your balance will be: $${schedule[i]} </tr>`)
            // expected output: "Success!"




        }
    }


}


//     let holidayComparer = `${payOffDate.getFullYear()}-${payOffDate.getMonth() + 1}-${payOffDate.getDate()}`;
//     axios.get(`https://calendarific.com/api/v2/holidays?&api_key=22fcccfee538966ec4663c5ae13ed473318871cb&country=US&year=${days[i].getFullYear()}&type=national`).then(result => {
//     for (let i = 0; i < result.data.response.holidays.length; i++) {
//         if (holidayComparer == result.data.response.holidays[i].date.iso) {
//             console.log('Skipped a Holiday');
//         }
//     }
// }).catch(error => {
//     console.log(error)
// })
startFuction();