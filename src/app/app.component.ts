import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  displayValue: string = '';
  firstNumber: number | null = null;
  secondNumber: number | null = null;
  waitingForSecondOperand: boolean = false;
  operator: string | null = null;

  //Ir mostrando todo en el displayValue
  //1- Controlar que no se ingrese un operator primero, que se ingrese un numero, si ingresa operator 'Format not valid'
  //2- Una vez ingresado el numero, ir controlando con waitingForSecondOperand, si ingreso operator, ponerlo en true y se sigue con el secondNumber
  //3- Calcular el total y mostrarlo por pantalla

  //Methods
  inputDigit(digit: string): void {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue =
        this.displayValue === '' ? digit : this.displayValue + digit;
    }
  }

  inputDecimal(dot: string): void {
    if (this.waitingForSecondOperand) {
      this.waitingForSecondOperand = false;
    }
    if (!this.displayValue.includes(dot)) {
      this.displayValue += dot;
    }
  }
  
  handleOperator(nextOperator: string): void {
    const inputValue = parseFloat(this.displayValue);

    if (this.firstNumber === null) {
      this.firstNumber = inputValue;
    } else if (this.operator) {
      const result = this.calculate(
        this.firstNumber,
        this.operator,
        inputValue
        
      );
      this.displayValue = String(result);
      this.firstNumber = result;
    }

    this.operator = nextOperator;
    this.waitingForSecondOperand = true;
  }


  calculate(
    firstOperand: number,
    operator: string,
    secondOperand: number
    
  ): number {
    //TODO: switch en case +-*/
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  performCalculation(): void {
    const inputValue = parseFloat(this.displayValue);

    if (this.firstNumber == null || this.operator == null)
      return alert('Format Not Valid');

    const result = this.calculate(this.firstNumber,this.operator ,inputValue);
    
    this.displayValue = String(result);
    console.log(this.displayValue);
    this.firstNumber = null;
    this.secondNumber = null;
    this.waitingForSecondOperand = false;
  }

  resetCalculator(): void {
    this.displayValue = '';
    this.firstNumber = null;
    this.secondNumber = null;
    this.waitingForSecondOperand = false;
  }

  onButtonClick(value: string): void {
    if (value === 'all-clear') {
      this.resetCalculator();
    } else if (value === '=') {
      this.performCalculation();
    } else if (!isNaN(parseFloat(value))) {
      this.inputDigit(value);
    } else if (value === '.') {
      this.inputDecimal(value);
    } else {
      this.handleOperator(value);
    }
  }
}
