function isPrime(numToCheck){
    // special cases 1, 2
    let currentNum = 3;
    if (numToCheck < 555444333222111){
        if (numToCheck == 1) return false;
        if (numToCheck == 2) return true;
        if (numToCheck%2 == 0) return false;
        let maxCheck = Math.floor(Math.sqrt(numToCheck));

        while (currentNum <= maxCheck){
            if (numToCheck%currentNum == 0) return false;
            currentNum += 2;
        }
        return true;
    }
    else{
        // probabilistic checks
        while (currentNum <= 10000){
            if (numToCheck%currentNum == 0) return false;
            currentNum += 2;
        }
        // fermat

        return true;
    }
}

function getCurrentNum(){
    return Number(document.getElementById("currentNum").innerHTML);
}

function setErrorMessage(){
    document.getElementById("NumberDescription").innerHTML = "Enter a number first.";
}

function displayNumDescription(Num){
    if (isPrime(Num)){
        document.getElementById("NumberDescription").innerHTML = "This is a prime number.";
    }
    else{
        document.getElementById("NumberDescription").innerHTML = "This is not a prime number.";
    }
}

function displayNum(Num){
    document.getElementById("currentNum").innerHTML = Num;
}

function updateDisplay(Num){
    displayNum(Num);
    displayPreviousAndNext(Num);
    displayNumDescription(Num);
    if (isPrime(Num)){
        checkIfTwinsAndDisplay(Num);
    }
    // check for twinsies
}

function checkIfTwinsAndDisplay(Num){
    if (isPrime(Num+2)){
        document.getElementById("NumberDescription").innerHTML = Num + " is twin primes with " + (Num+2) + ".";
    }
    if (isPrime(Num-2)){
        document.getElementById("NumberDescription").innerHTML = Num + " is twin primes with " + (Num-2) + ".";
    }
}

function displayPreviousAndNext(Num){
    let nextNum = findNextPrime(Num);
    let prevNum = findPreviousPrime(Num);
    document.getElementById("previousNum").innerHTML = prevNum;
    document.getElementById("nextNum").innerHTML = nextNum;
}

function findNextPrime(Num){
    Num += 1;
    while (!isPrime(Num)) Num++;
    return Num;
}

function findPreviousPrime(Num){
    if (Num > 2){
        Num -= 1;
        while (!isPrime(Num)) Num--;
    }
    return Num;
}

function findNextTwin(Num){
    Num = findNextPrime(Num);
    while (!isPrime(Num+2)){
        Num = findNextPrime(Num);
    }
    return Num;
}

function findPrevTwin(Num){
    Num = findPreviousPrime(Num);
    while (!isPrime(Num-2)){
        Num = findPreviousPrime(Num);
        if (Num == 2) return 2;
    }
    return Num;
}

function checkButton(){
    var Num = Number(document.getElementById("EnteredNum").value);
    if (Num == NaN || Num <= 0){
        document.getElementById("NumberDescription").innerHTML = "Invalid Entry. Type in a non-negative non-zero whole number.";
        // make it go red
        return;
    }
    updateDisplay(Num);
}

function nextButton(){
    var currentNum = getCurrentNum();
    if (currentNum == NaN){
        setErrorMessage();
        return;
    }
    currentNum = findNextPrime(currentNum);
    updateDisplay(currentNum);
}

// These functions could be classes. This would save unnecessary overhead.
function nextTwinButton(){
    var currentNum = getCurrentNum();
    if (currentNum == NaN){
        setErrorMessage();
        return;
    }
    currentNum = findNextTwin(currentNum);
    updateDisplay(currentNum);
}

function previousButton(){
    var currentNum = getCurrentNum();
    if (currentNum == NaN){
        setErrorMessage();
        return;
    }
    currentNum = findPreviousPrime(currentNum);
    updateDisplay(currentNum);
}

function prevTwinButton(){
    var currentNum = getCurrentNum();
    if (currentNum == NaN){
        setErrorMessage();
        return;
    }
    currentNum = findPrevTwin(currentNum);
    updateDisplay(currentNum);
}

function convertNumToPX(inNum){
    return Number.toString(inNum) + "px";
}

function visualiseButton(){
    var currentNum = getCurrentNum();
    if (currentNum == NaN){
        setErrorMessage();
        return;
    }

    // visualise earth and prime planet
    var primePlanet = document.getElementById("primePlanet");
    var earth = document.getElementById("earth");
    if (primePlanet && earth){
        var referencewidth = 0;
        var referencelength = 0;
        var primewidth = 0;
        var primelength = 0;
        if (currentNum < 1000000000){
            // case 2: reference planet greater. prime planet = 800px
            referencewidth = 800;
            referencelength = 800;
            const scale = referencewidth/(2*1000000000);
            let widlen = scale * Math.ceil(Math.pow((3/4)*currentNum*Math.PI,(1/3)));
            primewidth = widlen;
            primelength = widlen;
        }
        else{
            // case 2: prime planet greater. prime planet = 800px
            primewidth = 800;
            primelength = 800;
            const scale = primewidth/(2*1000000000);
            let widlen = scale * Math.ceil(Math.pow((3/4)*currentNum*Math.PI,(1/3)));
            referencewidth = widlen;
            referencelength = widlen;
        }

        // earth is 1 trillion cubic km
        // vol of a sphere is 4*pi/3 * r^3
        // Earth's radius will be.. 400px
        // given vol, to get radius you: r = (3/4pi vol)^(1/3)
        // then scale radius down. So radius *= earth img radius (400) / earth actual radius
        // Initially: big earth (800px?).
        // while volume is less than half of earth, alter the red dot.
        // while volume is less than 5x of earth, alter earth.
        
        // When setting, must be in the format specified below.
        console.log(referencewidth);
        console.log(primewidth);
        earth.style.width = convertNumToPX(referencewidth);
        earth.style.height = convertNumToPX(referencelength);
        primePlanet.style.width = convertNumToPX(primewidth);
        primePlanet.style.height = convertNumToPX(primelength);
    }
}