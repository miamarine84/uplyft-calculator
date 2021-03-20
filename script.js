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
    console.log(startLoan, loanAmount, installmentInterval, InstallmentAmount, interestRate);

    let dailyInterest = loanAmount * (interestRate / 365);
    // console.log(dailyInterest, "daily interest");
    if (installmentInterval == "daily") {
        daily();
    } else if (installmentInterval == "weekly") {
        weekly(startLoan, loanAmount, dailyInterest, InstallmentAmount);
    } else if (installmentInterval == "monthly") {
        monthly(loanAmount, dailyInterest);
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

let weekly = (startLoan, loanAmount, dailyInterest, InstallmentAmount) => {

    let customerBalance = parseInt(loanAmount);

    startLoan = new Date(startLoan);
    // let loanDate = startLoan.setDate(startLoan.getDate() + 6);
    // console.log(new Date(loanDate));
    // var dt = Date.parse(startLoan);
    // console.log(dt);


    // console.log(dt.getDate() + 23);
    // Weekend Checker
    if (startLoan.getDay() == 6 || startLoan.getDay() == 5) {

        console.log("weekend");
    } else {
        console.log("not weekend");
    }

    let finalWeeksPay = (daysTillPayOff)=>{
        startLoan.setDate(startLoan.getDate() +  daysTillPayOff);
        console.log(startLoan, daysTillPayOff)
        console.log(balanceSchedule.length)
        for(let i = 7; i < balanceSchedule.length; i += 7){
            console.log('this many weeks')
          
            console.log(balanceSchedule[i])
        }
        // Need to create a while loop here instead to capture how many weeks and days will get as well as weeks 
        console.log(balanceSchedule[balanceSchedule.length-2])
    }

    let daysTillPayOff = 1;
    let balanceSchedule =[];
    for (let i = 0; 0 < customerBalance; i++) {
        if (loanAmount > 0) {
            customerBalance += dailyInterest - InstallmentAmount;
            daysTillPayOff += 1;
            balanceSchedule.push(parseFloat(customerBalance).toFixed(2))         
        }
       

  
    }
    console.log(balanceSchedule)
    finalWeeksPay(daysTillPayOff)

}

let monthly = (loanAmount, dailyInterest) => {

}

