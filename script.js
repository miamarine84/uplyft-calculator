let installmentInterval;
$("#form-tag").submit(function (e) {
    let loanAmount = $("#loan-amount").val();
    let startLoan = $("#start-date").val();
    let InstallmentAmount = $("#installment-amount").val();
    // let buttonInterval = $(":button").attr("value");
    console.log(loanAmount, "loan");
    console.log(installmentInterval, "installmentvalue")
    console.log(startLoan, "startLoan");
    console.log(InstallmentAmount, "InstallmentAmount")
    e.preventDefault();
})

   // Handling the installment buttons

$("#installmentButton button").click(function (e) {
    let thisBtn = $(this);
    thisBtn.addClass("active").siblings().removeClass("active");
    installmentInterval = thisBtn.val();
    e.preventDefault();
})