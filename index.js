 // Function to calculate tax based on income and age
    function calculateTax(event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        var grossIncome = parseFloat(document.getElementById('grossAnnualIncome').value);
        var extraIncome = parseFloat(document.getElementById('extraIncome').value);
        var age = document.getElementById('ageGroup').value;
        var deductions = parseFloat(document.getElementById('totalApplicableDeductions').value);

        // Calculate total income
        var totalIncome = grossIncome + extraIncome - deductions;

        // Initialize tax rate based on age
        var taxRate;
        if (age === '<40') {
            taxRate = 0.3;
        } else if (age === '>=40&<60') {
            taxRate = 0.4;
        } else {
            taxRate = 0.1;
        }

        // Calculate tax amount
        var taxAmount = 0;
        if (totalIncome > 800000) {
            taxAmount = taxRate * (totalIncome - 800000);
        }

        // Show the modal with calculated values
        $('#taxModal').modal('show');
        document.getElementById('taxAmount').innerText = taxAmount.toFixed(2) + ' Lakhs';
    }

    // Attach form submission handler
    document.getElementById('taxForm').addEventListener('submit', calculateTax);

    // Function to validate form fields and show error icons if necessary
    function validateForm() {
        var isValid = true;

        // Validate each input field
        ['grossAnnualIncome', 'extraIncome', 'ageGroup', 'totalApplicableDeductions'].forEach(function (field) {
            var value = document.getElementById(field).value;
            if (value === '' || isNaN(value)) {
                isValid = false;
                document.getElementById(field + 'Error').style.display = 'inline';
            } else {
                document.getElementById(field + 'Error').style.display = 'none';
            }
        });
        
        // If form is valid, calculate tax
        if (isValid) {
            calculateTax();
        }
    }

    // Attach input event listeners to validate input fields
    ['grossAnnualIncome', 'extraIncome', 'totalApplicableDeductions'].forEach(function (field) {
        document.getElementById(field).addEventListener('input', function () {
            if (!/^\d+$/.test(this.value)) {
                this.setCustomValidity('Only digits are allowed');
            } else {
                this.setCustomValidity('');
            }
        });
    });
