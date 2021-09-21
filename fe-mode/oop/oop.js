/**
 * @file: description
 * @author: zhongconghai
 * @Date: 2021-07-29 21:22:54
 * @LastEditors: zch1999
 * @LastEditTime: 2021-07-29 21:28:03
 */
class Animal {
	constructor(name) {
		this.name = name;
	}
	eat(food) {
		console.log(`${this.name} eat ${food}`);
	}
}

class Dog extends Animal {
	constructor() {
		super("dog");
	}
	speak() {
		console.log("wangwang");
	}
}

let dog = new Dog();
dog.eat("狗粮");
dog.speak();
