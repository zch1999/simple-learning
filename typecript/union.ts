function test(a: number, c: () => number): void
function test(a: string, c: () => string): void
function test(a: number | string, c: (() => number) | (() => string)): void
