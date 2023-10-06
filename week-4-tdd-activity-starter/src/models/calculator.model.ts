import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';

export class CalculatorModel implements ICalculatorModel {
  private _buffer: string = ''
  private _currentNumber: string = ''
  private _numbers: number[] = []
  private _operators: string[] = []
  private _prev: string[] = []

  public pressNumericKey(key: NumericKeys): void {
    this._buffer += key
    this._currentNumber += key
  }

  public pressOperatorKey(key: OperatorKeys): void {
    if (key === '*' || key === '+' || key === '/') {
      if (this._buffer.slice(-1) === '.' 
      || this._buffer.slice(-1) === '*'
      || this._buffer.slice(-1) === '+'
      || this._buffer.slice(-1) === '-'
      || this._buffer.slice(-1) === '/') {
        throw new Error
      }
    } else {
      if (this._buffer.slice(-1) === '.') {
        throw new Error
      }
    }

    this._buffer += key
    this._operators.push(key)

    if (this._currentNumber != '') {
      this._numbers.push(parseFloat(this._currentNumber))
      this._currentNumber = ''
    } else {
      this._numbers.push(0)
    }
  }

  public pressActionKey(key: ActionKeys): void {
    if (key === 'C') {
      this._prev.push(this._buffer)
      this._buffer = ""
      this._numbers = []
      this._operators = []
    } else if (key === '=') {
      if (this._buffer.slice(-1) === '.' 
      || this._buffer.slice(-1) === '*'
      || this._buffer.slice(-1) === '+'
      || this._buffer.slice(-1) === '-'
      || this._buffer.slice(-1) === '/') {
        throw new Error
      }

      if (this._currentNumber != '') {
        this._numbers.push(parseFloat(this._currentNumber))
        this._currentNumber = ''
      }

      if (this._buffer != '') {
        this.calculate()
      }
    } else if (key === '.') {
      if (this._buffer.indexOf("=") > -1) {
        
      }

      if (this._currentNumber.indexOf(".") > -1) {
        throw new Error
      }

      this._buffer += key
      this._currentNumber += key
    }
  }

  public display(): string {
    return this._buffer
  }

  private calculate() : void {
    if (this._buffer === '') {
      return
    }

    if (this._numbers.length === 0) {
      return
    }

    if (this._operators.length + 1 != this._numbers.length) {
      throw new Error
    }
    while (this._operators.indexOf("*") > -1) {
      const index = this._operators.indexOf("*")
      this._numbers[index] = this._numbers[index] * this._numbers[index + 1]
      this._numbers.splice(index + 1, 1)
      this._operators.splice(index, 1)
    }

    while (this._operators.indexOf("/") > -1) {
      const index = this._operators.indexOf("/")
      if (this._numbers[index + 1] === 0) {
        throw new Error
      }

      this._numbers[index] = this._numbers[index] / this._numbers[index + 1]
      this._numbers.splice(index + 1, 1)
      this._operators.splice(index, 1)
    }

    while (this._operators.length > 0) {
      if (this._operators[0] === '+') {
        this._numbers[0] = this._numbers[0] + this._numbers[1]
        this._numbers.splice(1, 1)
        this._operators.splice(0, 1)
      } else if (this._operators[0] === '-') {
        this._numbers[0] = this._numbers[0] - this._numbers[1]
        this._numbers.splice(1, 1)
        this._operators.splice(0, 1)
      }
    }

    this._prev.push(this._buffer + this._numbers[0].toString())
    this._buffer = this._numbers[0].toString()
    this._numbers = []
    this._operators = []
  }
}
