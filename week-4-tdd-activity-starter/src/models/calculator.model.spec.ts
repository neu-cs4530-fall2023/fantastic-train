import { describe, expect, test, beforeEach } from '@jest/globals'
import { CalculatorModel } from './calculator.model';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { ActionKeys } from '../enums/action-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';

describe('CalculatorModel', (): void => {

  let calculator : CalculatorModel
  beforeEach(() => {
    calculator = new CalculatorModel()
  })

  test('should contain a CalculatorModel class that implements ICalculatorModel', (): void => {
    const calculator: ICalculatorModel = new CalculatorModel()
    expect(calculator).toBeDefined()
  })

  test('should have an empty display on init', (): void => {  
    // Act
    const displayValue: string = calculator.display()
    // Assert
    expect(displayValue).toEqual('')
  })

  test('should display `1` when the `1` key is pressed', (): void => {  
    // Act
  calculator.pressNumericKey(NumericKeys.ONE)
  const displayValue: string = calculator.display()
  // Assert
  expect(displayValue).toEqual('1')
  })

  test('should display `2` when the `2` key is pressed', (): void => {  
    calculator.pressNumericKey(NumericKeys.TWO)
    const displayValue: string = calculator.display()  
    expect(displayValue).toEqual('2') 
  })

  test('should display `98` when the `9` key is pressed followed by the `8` key', (): void => {
    calculator.pressNumericKey(NumericKeys.NINE)
    calculator.pressNumericKey(NumericKeys.EIGHT)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('98')  
  })

  test('should display `5` when keys `2+3=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressOperatorKey(OperatorKeys.PLUS)
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('5')
  })

  test('should display `-1` when keys `2+-3=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressOperatorKey(OperatorKeys.PLUS)
    calculator.pressOperatorKey(OperatorKeys.MINUS)
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('-1')
  })

  test('should display `1` when keys `-2+3=` are pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.MINUS)
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressOperatorKey(OperatorKeys.PLUS)
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('1')
  })

  test('should display `3` when keys `5-2=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressOperatorKey(OperatorKeys.MINUS)
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('3')
  })

  test('should display `-3` when keys `2-5=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressOperatorKey(OperatorKeys.MINUS)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('-3')
  })

  test('should display `2` when keys `3+1-2=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressOperatorKey(OperatorKeys.PLUS)
    calculator.pressNumericKey(NumericKeys.ONE)
    calculator.pressOperatorKey(OperatorKeys.MINUS)
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('2')
  })

  test('should display `15` when keys `3*5=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressOperatorKey(OperatorKeys.MULT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('15')
  })

  test('should display `0` when keys `0/12=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.ZERO)
    calculator.pressOperatorKey(OperatorKeys.DIV)
    calculator.pressNumericKey(NumericKeys.ONE)
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('0')
  })

  test('should display `14` when keys `2+3*4=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressOperatorKey(OperatorKeys.PLUS)
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressOperatorKey(OperatorKeys.MULT)
    calculator.pressNumericKey(NumericKeys.FOUR)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('14')
  })

  test('should error when keys `5/0=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressOperatorKey(OperatorKeys.DIV)
    calculator.pressNumericKey(NumericKeys.ZERO)    
    expect(() => calculator.pressActionKey(ActionKeys.EQUALS)).toThrow()
  })

  test('should do nothing when only key `=` is pressed', (): void => {
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('')
  })

  test('should do nothing when only key `=` is pressed after other equation', (): void => {
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressOperatorKey(OperatorKeys.MULT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('15')
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue2: string = calculator.display()
    expect(displayValue2).toEqual('15')
  })

  test('should display `-5` when keys `-5=` are pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.MINUS)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('-5')
  })

  test('should display `5` when keys `+5=` are pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.PLUS)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('5')
  })

  test('should display `0` when keys `*5=` are pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.MULT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('0')
  })

  test('should display `0` when keys `/5=` are pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.DIV)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('0')
  })

  test('should display `5` when keys `5=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('5')
  })

  test('should display `2.5` when keys `2.5=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.DOT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('2.5')
  })

  test('should display `5.7` when keys `2.5+3.2=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.DOT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressOperatorKey(OperatorKeys.PLUS)
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressActionKey(ActionKeys.DOT)
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('5.7')
  })

  test('should display `2.5` when keys `5/2=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressOperatorKey(OperatorKeys.DIV)
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('2.5')
  })

  test('should display `7.5` when keys `3*2.5=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressOperatorKey(OperatorKeys.MULT)
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.DOT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('7.5')
  })

  test('should display `0` when keys `.5+0.5` are pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.MINUS)
    calculator.pressActionKey(ActionKeys.DOT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressOperatorKey(OperatorKeys.PLUS)
    calculator.pressNumericKey(NumericKeys.ZERO)
    calculator.pressActionKey(ActionKeys.DOT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('0')
  })

  test('should display `0.5` when keys `.5=` are pressed', (): void => {    
    calculator.pressActionKey(ActionKeys.DOT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('0.5')
  })

  test('should error when keys `2.5.` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.DOT)
    calculator.pressNumericKey(NumericKeys.FIVE)    
    expect(() => calculator.pressActionKey(ActionKeys.DOT)).toThrow()
  })
  
  test('should error when keys `2.-` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.DOT)
    expect(() => calculator.pressOperatorKey(OperatorKeys.MINUS)).toThrow()
  })

  test('should error when keys `2..` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.DOT)    
    expect(() => calculator.pressActionKey(ActionKeys.DOT)).toThrow()
  })

  test('should error when keys `2.*` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.DOT)    
    expect(() => calculator.pressOperatorKey(OperatorKeys.MULT)).toThrow()
  })

  test('should error when keys `2./` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.DOT)    
    expect(() => calculator.pressOperatorKey(OperatorKeys.DIV)).toThrow()
  })

  test('should error when keys `2.+` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.DOT)    
    expect(() => calculator.pressOperatorKey(OperatorKeys.PLUS)).toThrow()
  })

  test('should error when keys `2.=` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.DOT)    
    expect(() => calculator.pressActionKey(ActionKeys.EQUALS)).toThrow()
  })

  test('should error when keys `2**` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressOperatorKey(OperatorKeys.MULT)
    expect(() => calculator.pressOperatorKey(OperatorKeys.MULT)).toThrow()
  })
  
  test('should error when keys `2*/` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressOperatorKey(OperatorKeys.MULT)
    expect(() => calculator.pressOperatorKey(OperatorKeys.DIV)).toThrow()
  })

  test('should error when keys `2++` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressOperatorKey(OperatorKeys.PLUS)
    expect(() => calculator.pressOperatorKey(OperatorKeys.PLUS)).toThrow()
  })

  test('should error when keys `2/+` are pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressOperatorKey(OperatorKeys.DIV)
    expect(() => calculator.pressOperatorKey(OperatorKeys.PLUS)).toThrow()
  })

  test('should do nothing when only key `C` is pressed', (): void => {
    calculator.pressActionKey(ActionKeys.CLEAR)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('')
  })

  test('should clear equation when key `C` is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressOperatorKey(OperatorKeys.MULT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('15')
    calculator.pressActionKey(ActionKeys.CLEAR)
    const displayValue2: string = calculator.display()
    expect(displayValue2).toEqual('')
  })

  test('should clear unfinished equation when key `C` is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressOperatorKey(OperatorKeys.MULT)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('3*')
    calculator.pressActionKey(ActionKeys.CLEAR)
    const displayValue2: string = calculator.display()
    expect(displayValue2).toEqual('')
  })

  test('should show second equation if two equations are entered', (): void => {
    calculator.pressNumericKey(NumericKeys.THREE)
    calculator.pressOperatorKey(OperatorKeys.MULT)
    calculator.pressNumericKey(NumericKeys.FIVE)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue: string = calculator.display()
    expect(displayValue).toEqual('15')
    calculator.pressNumericKey(NumericKeys.SEVEN)
    calculator.pressOperatorKey(OperatorKeys.PLUS)
    calculator.pressNumericKey(NumericKeys.TWO)
    calculator.pressActionKey(ActionKeys.EQUALS)
    const displayValue2: string = calculator.display()
    expect(displayValue2).toEqual('9')
  })
})
