function calculateLoan() {
  let salary = parseFloat(document.getElementById("salary").value);
  let existingEmi = parseFloat(document.getElementById("existingEmi").value);
  let tenure = parseFloat(document.getElementById("tenure").value);
  let interest = parseFloat(document.getElementById("interest").value);

  if (!salary || !tenure || !interest) {
    document.getElementById("result").innerHTML = "⚠ Please enter salary, existing EMI, tenure, and interest rate!";
    return;
  }

  if (!existingEmi) existingEmi = 0;

  // Max EMI allowed according to salary (50%)
  let maxAllowedEmi = salary * 0.5;
  let availableEmi = maxAllowedEmi - existingEmi;

  if (availableEmi <= 0) {
    document.getElementById("result").innerHTML = "❌ Not eligible for more loans (existing EMI too high).";
    return;
  }

  // Calculate max loan possible with available EMI using standard EMI formula
  let monthlyRate = interest / 12 / 100; // convert annual interest to monthly
  let n = tenure * 12; // total months

  let principal = availableEmi * ((Math.pow(1 + monthlyRate, n) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, n)));

  document.getElementById("result").innerHTML = `
    ✅ <b>Loan Eligibility Results:</b><br>
    Maximum Additional Loan You Can Take: ₹${principal.toFixed(2)} <br>
    Available EMI: ₹${availableEmi.toFixed(2)} <br>
    Interest Rate: ${interest}% p.a.<br>
    Tenure: ${tenure} years
  `;
}
