function calculateBMI() {
    const weightKg = parseFloat(document.getElementById("weight-kg").value);
    const heightFeet = parseFloat(document.getElementById("height-feet").value);
    const heightInches = parseFloat(document.getElementById("height-inches").value);

    const totalHeightInches = (heightFeet * 12) + heightInches;
    const heightMeters = totalHeightInches * 0.0254;

    if (!weightKg || !heightMeters) {
        alert("Please enter valid weight and height values.");
        return;
    }

    const bmi = (weightKg / (heightMeters ** 2)).toFixed(2);
    document.getElementById("bmi-result").textContent = `Your BMI is ${bmi}`;

    // Determine needle position and category
    const bmiCategory = document.getElementById("bmi-category");
    const needleGroup = document.getElementById("needle-group");

    let angle = 0;
    let categoryText = '';

    if (bmi < 18.5) {
        angle = -45; // Underweight
        categoryText = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        angle = 0; // Normal
        categoryText = 'Normal';
    } else if (bmi >= 25 && bmi < 30) {
        angle = 45; // Overweight
        categoryText = 'Overweight';
    } else {
        angle = 90; // Obese
        categoryText = 'Obese';
    }

    // Rotate the needle group to the calculated angle
    needleGroup.setAttribute('transform', `rotate(${angle}, 150, 130)`);
    bmiCategory.textContent = categoryText;
}
