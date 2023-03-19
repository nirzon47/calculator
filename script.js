const display = document.querySelector('#result')
const number = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelectorAll('.equal')
const decimal = document.querySelector('.decimal')
decimal

let previousNumber = '',
	currentNumber = '',
	op = ''

number.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		handleNumber(e.target.textContent)
	})
})

function handleNumber(num) {
	if (previousNumber !== '' && currentNumber !== '' && op === '') {
		previousNumber = ''
		display.textContent = currentNumber
	}
	if (currentNumber.length < 12) {
		currentNumber += num
		display.textContent = currentNumber
	}
}

operators.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		handleOperator(e.target.textContent)
	})
})

function handleOperator(operator) {
	if (previousNumber === '') {
		previousNumber = currentNumber
		currentNumber = ''
		op = operator
		display.textContent = currentNumber
	} else {
		calculate(op)
		op = operator
		currentNumber = ''
		display.textContent = previousNumber
	}
}

function calculate(operator) {
	let num1 = Number(previousNumber),
		num2 = Number(currentNumber)
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
