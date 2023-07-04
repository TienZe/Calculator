let firstNum = null;
let secondNum = null;
let currentOperator = null;

const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", clear);

const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", deleteLetter);

const screenLast = document.getElementById("screen-last");
const screenCurrent = document.getElementById("screen-current");


const numBtns = document.querySelectorAll("#buttons-container button.num");
const operatorBtns = document.querySelectorAll("#buttons-container button.operator");
const equalOperator = document.querySelector(".equal");
const dotBtn = document.querySelector(".dot");

numBtns.forEach(element => {
    element.addEventListener("click", e => {
        // Đơn giản append input
        let num = e.target.textContent;
        screenCurrent.textContent = screenCurrent.textContent + num;
    });
});

dotBtn.addEventListener("click", e => {
    let currentInput = screenCurrent.textContent;
    if (currentInput.length > 0 && !currentInput.includes(".")) {
        screenCurrent.textContent = currentInput + ".";
    }
});

equalOperator.addEventListener("click", e => {
    let resInput = handleInput();

    if (resInput == "second") {
         // Có đầy đủ 2 số và toán tử cần tính
        // => Thực hiện phép tính
        let res = operate(firstNum, secondNum, currentOperator);
        // Cập nhật lại screen
        screenLast.textContent = firstNum + " " + currentOperator
            + " " + secondNum + " =" ;
        screenCurrent.textContent = res;

        // Cập nhật lại giá trị 2 số firstNum và secondNum
        firstNum = res;
        secondNum = null;
        
        // Hoàn thành phép tính, chuyển sang trạng thái chờ nhập
        // phép tính tiếp theo
        currentOperator = null;
    }
});

operatorBtns.forEach(element => {
    element.addEventListener("click", e => {
        let clickedOperator = e.target.textContent;

        // Nếu chưa có phép tính thì đơn giản set phép tính cho nó
        // Nếu ta chọn phép tính thì sẽ đồng thời nhập firstNum và 
        // currentOperator
        if (!currentOperator) {
            // Get input cho firstNum
            handleInput();
            screenLast.textContent = firstNum + " " + clickedOperator;
            screenCurrent.textContent = "";
            // Lưu lại phép tính được chọn
            currentOperator = clickedOperator;
            return;
        }

        //========= Đã có firstNum và phép tính ============
        // => Cần xử lý input cho secondNum

        // Nếu input text rỗng, trong khi user click vào operators
        // Ta đơn giản set lại currentOperator
        if (screenCurrent.textContent == "") {
            currentOperator = clickedOperator;
            // Cập nhật screen
            screenLast.textContent = first + " " + clickedOperator;
            return;
        }

        // Có input cho secondNum
        handleInput(); // get input đó cho secondNum

        // Có đầy đủ 2 số và toán tử cần tính
        // => Thực hiện phép tính
        let res = operate(firstNum, secondNum, currentOperator);
        // Cập nhật lại screen
        screenLast.textContent = res + " " + clickedOperator;
        screenCurrent.textContent = "";
        
        // Cập nhật lại giá trị 2 số firstNum và secondNum
        firstNum = res;
        secondNum = null;
        // Cập nhật lại phép tính
        currentOperator = clickedOperator;
        
    });
});

function handleInput() {
    let currentInput = screenCurrent.textContent;

    // Nhập cho firstNum đầu tien
    if (!firstNum) {
        firstNum = +currentInput;
        alert("first: " + firstNum);
        return "first";
    }
    // Nhập secondNum khi đã nhập phép tính
    if (currentOperator) {
        secondNum = +currentInput;
        alert("second : " + secondNum);
        return "second";
    }
}

function clear() {
    screenCurrent.textContent = "";
    screenLast.textContent = "";
    firstNum = null;
    secondNum = null;
    currentOperator = null;
}

function deleteLetter() {
    let currentValue = screenCurrent.textContent;
    if (currentValue) {
        screenCurrent.textContent = currentValue.slice(0, currentValue.length -1);
    }
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b; 
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return (a / b).toFixed(6);
}

function operate(a, b, operator) {
    switch(operator) {
        case "+" : return add(a, b);
        case "-" : return substract(a, b);
        case "*" : return multiply(a, b);
        case "÷" : return divide(a, b);
    }
}