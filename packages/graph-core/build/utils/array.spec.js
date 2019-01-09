"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const array_1 = require("../utils/array");
ava_1.default('cross of two arrays ([A,B],[1,2]) returns correct array [A1,A2,B1,B2]', t => {
    const actualCross = array_1.cross(['A', 'B'], ['1', '2']);
    t.deepEqual(actualCross, ['A1', 'A2', 'B1', 'B2']);
});
ava_1.default('cross of two strings ("ABC","123") returns correct array [A1,A2,A3,B1,B2,...,C3]', t => {
    const actualCross = array_1.cross('ABC', '123');
    t.deepEqual(actualCross, ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']);
});
ava_1.default('flatten of deep array should producing flattened array', t => {
    const startingArray = [1, [2, [3, [4], 5, [[[6]]]], 7], 8];
    const flattenedArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const actualArray = array_1.flatten(startingArray);
    t.deepEqual(actualArray, flattenedArray);
});
ava_1.default('flattenOneLevel of deep array should only flatten top level array', t => {
    const startingArray = [1, [2, [3, [4], 5, [[[6]]]], 7], 8];
    const flattenedArray = [1, 2, [3, [4], 5, [[[6]]]], 7, 8];
    const actualArray = array_1.flattenOneLevel(startingArray);
    t.deepEqual(actualArray, flattenedArray);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hcnJheS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXVCO0FBQ3ZCLDBDQUFpRTtBQUlqRSxhQUFJLENBQUMsdUVBQXVFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDOUUsTUFBTSxXQUFXLEdBQUcsYUFBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLGtGQUFrRixFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ3pGLE1BQU0sV0FBVyxHQUFHLGFBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDckYsQ0FBQyxDQUFDLENBQUM7QUFHSCxhQUFJLENBQUMsd0RBQXdELEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDL0QsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0QsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsTUFBTSxXQUFXLEdBQUcsZUFBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLG1FQUFtRSxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzFFLE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNELE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUQsTUFBTSxXQUFXLEdBQUcsdUJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUMsQ0FBQyJ9