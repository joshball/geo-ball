import test from 'ava';

const ops = [
    { name: 'add', op: (a: number, b: number): number => a + b, commutative: true },
    { name: 'sub', op: (a: number, b: number): number => a - b, commutative: false },
    { name: 'mul', op: (a: number, b: number): number => a * b, commutative: true },
    { name: 'div', op: (a: number, b: number): number => a / b, commutative: false },
];

// 1,2 -> order
// 1+2 = 3
// 1-2 = -1
// 1*2 = 2
// 1/2 = .5
// #2+1 = 3
// 2-1 = 1
// #2*1 = 2
// 2/1 = 2
// => SO between any two numbers we do a O b, b-a, b/a

const mapOps = (lhs: number, rhs: number, noCommutative: boolean = false): number[] => {
    return noCommutative ? ops.filter(o => o.commutative === false).map(o => o.op(lhs, rhs)) : ops.map(o => o.op(lhs, rhs));
}
const allOps = (lhs: number, rhs: number): number[] => {
    return mapOps(lhs, rhs).concat(mapOps(rhs, lhs, true))
}
const allOpsEq = (lhs: number, rhs: number, result: number): any => {
    const results = allOps(lhs, rhs);
    const index = results.indexOf(result);
    if (index >= 0) {
        return { index, results };
    }
}

const doIt = (nums: number[]): any => {
    const sortedNums = nums.sort();
    const perms = [];
    // permutation (order matters) LOCK => 1,2,3 does NOT equal 3,2,1
    // number of permutations = n!/(n-k)! = 3! / (3-1)! => 3! / 2! => 3*2*1 / 2*1 => 6 / 2 => 3
    // 1,2
    // 2,1
    // 1,2,3
    // 1,3,2
    // 3,1,2
    // 3,2,1
    // 123 123 123
}

const tf = (cards: string[]): string[] => {
    console.log('cards', cards);
    const nums = cards.map(c => parseInt(c[0], 10));
    console.log('nums', nums);

    const one = nums[0];
    const two = nums[1];
    const three = nums[2];
    const four = nums[3];
    // for three nums
    // 1,2,3
    // (1 / 2) / 3
    // (1 / (2 / 3)
    // 5,4,8,6 -> order
    // 4,5,6,8
    // 4,5,6,8 +,-,*,/ between each number
    //
    // nums.forEach(num => {

    // })
    return [
        '4s',
        '5d',
        '+',
        '6c',
        '-',
        '8h',
        '*',
    ];
}

test('mapOps', t => {
    t.deepEqual(mapOps(1, 2), [3, -1, 2, .5]);
});

test('allOps', t => {
    t.deepEqual(allOps(1, 2), [3, -1, 2, .5, 1, 2]);
});

test('allOpsEq', t => {
    t.deepEqual(allOpsEq(1, 2, 2), { index: 2, results: [3, -1, 2, .5, 1, 2] });
});


test('one', t => {
    const nums = ['5d', '4s', '8h', '6c'];

    const result = tf(nums);

    t.deepEqual(result, [
        '4s',
        '5d',
        '+',
        '6c',
        '-',
        '8h',
        '*',
    ]);
});


