// let num:number = '11' // false
let number: number = 0x1232
let n1:number = 0b010
let n2:number = 0o15

let arr1: number[] = [1,2,3]
// let arr2: Array<string> = [1,2,3]

let tup1: [string, number] = ['1',1]

// 数字枚举
enum Hello1 {
    zhong,
    cong,
    hai
}

//字符串枚举
enum Hello2 {
    zhong = 'zhong',
    cong = 'cong',
    hai = 'hai'
}

// 异构枚举
enum Hello3 {
    zhong = 'qwq',
    cong = 3,
    hai
}

//常量枚举
const enum Hello4{
    zhong,
    cong,
    hai
}


let anyVal:any



anyVal()
anyVal.push(1)

let a: number[] = anyVal


// unknown
let unknown1: unknown

// unknown1.push(11)
unknown1 = 1
unknown1 = 'fasdfa'


//字符串字面量类型

interface Kdd {
    // xixri: number,
    [key: string]: string,
}
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
  }
type xixi = number
let ads: string = 'fas'
type nanxi = `hello ${xixi}`
let nanxiq: nanxi = 'hello 12131233123'

let val1: any = '1213'
let num1: number = val1.length

type left = 'left'
let leftVal: left
leftVal = 'left'


// 非空断言
function fn1(val: string | undefined | null) {
    // const tmepVal:string = val;
    const tempVal1: string = val!;
}
// 函数调用忽略
type fn3 = () => number
function fn2(fn: fn3 | undefined) {
    // let num1 = fn() 
    let num2 = fn!()
}


// 确定赋值断言
// let x: number;
// init();
// console.log(2 * x); // Error

// function init() {
//   x = 10;
// }
let x!: number;
init();
console.log(2 * x);

function init() {
  x = 10;
}