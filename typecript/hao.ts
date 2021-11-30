class Test<T extends { name: string; age: number }[]> {
    private ret: ReturnType<typeof this.array2Obj>
    constructor(public message: T) {
  
      this.ret = this.array2Obj(message);
    }
    array2Obj(message: T): Record<string, number> {
      return {}
    }
    getAge(name: string): number {
      return this.ret[name];
    }
  }
  
  let t = new Test([{ name: "xiaoming", age: 4 }, { name: "xiaohong", age: 24 }])
  
  t.getAge('xiaoming') // type:number
  
//   1.请将 Test 的函数 ts 重写，使 getAge 方法只能入参 'xiaoming' 或者  'xiaohong'
  
//   2.进阶 t.getAge('xiaoming') // 4 | 24
  
//   3. 进阶 t.getAge('xiaoming') // type:4