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


