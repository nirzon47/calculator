// Initialising the DOM elements.
const display = document.querySelector('#result')
const number = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelectorAll('.equal')
const decimal = document.querySelector('.decimal')
decimal

// Initialising the global variables.
let previousNumber = '',
	currentNumber = '',
	op = ''

// Assigning an event listener to every number to handle the textcontent (number) of that button and passing it to handleNumber().
number.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		handleNumber(e.target.textContent)
	})
})

// Function to handle the numbers.
function handleNumber(num) {
	// Takes input as long as the length does not exceed 8 and displays it on the display.
	if (currentNumber.length < 8) {
		currentNumber += num
		display.textContent = currentNumber
	}
}

// Assigning an event listener to every operator to handle the textcontent (operator) of that button and passing it to handleOperator().
operators.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		handleOperator(e.target.textContent)
	})
})

function handleOperator(operator) {
	// Exits the function in case the user starts the calculator with nothing but presses any operators.
	if (previousNumber === '' && currentNumber === '') return

	// Switches the numbers so a new operand can be added in the next iteration and displays the new number to be added.
	if (previousNumber === '') {
		previousNumber = currentNumber
		currentNumber = ''
		display.textContent = previousNumber
	}

	// Calculates in case both the numbers exist and a calculation is possible, puts the result in previousNumber and empties the currentNumber for further calculations.
	if (previousNumber !== '' && currentNumber !== '') {
		calculate(op)
		currentNumber = ''
		display.textContent = previousNumber
	}

	// Assigns the new operator regardless of any conditions.
	op = operator
}

// Directly calculates since equal button is used. This function is called in HTML. Also sets the environment for next calculation.
function handleEqual() {
	calculate(op)
	currentNumber = ''
	display.textContent = previousNumber
}

// Function used to change the sign of the number. This function is directly called from HTML.
function handleSign() {
	if (currentNumber[0] === '-') {
		currentNumber = currentNumber.slice(1)
	} else {
		currentNumber = '-' + currentNumber
	}
	display.textContent = currentNumber
}

// Function to clear one digit. This function is directly called from HTML.
function backSpace() {
	let lastIndex = currentNumber.length - 1
	currentNumber = currentNumber.slice(0, lastIndex)
	if (currentNumber.length > 0) display.textContent = currentNumber
	else display.textContent = 0
}

// Resets everything to empty strings. I have no idea why prettier formatted it like that though.
function reset() {
	;(previousNumber = ''), (currentNumber = ''), (op = '')
	display.textContent = 0
}

// Main calculator logic, operates based on what operator is selected. Returns the result as a string for easier handling.
function calculate(operator) {
	// Temporarily converts the strings to numbers for calculations.
	let num1 = Number(previousNumber),
		num2 = Number(currentNumber)

	// Switch based on the operator currently selected.
	switch (operator) {
		case '+':
			previousNumber = '' + (num1 + num2)
			break
		case '-':
			previousNumber = '' + (num1 - num2)
			break
		case '/':
			previousNumber = '' + num1 / num2
			break
		case '*':
			previousNumber = '' + num1 * num2
			break
		default:
			break
	}
}
