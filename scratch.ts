// // let date = new Date();
// // const dateString = date.toISOString();
// // const split = dateString.split('T');
// // // "21:30:05.974Z"
// // // "213005.974Z"
// // let time = split[1].replace(/:/g, '');

// // time = time.substr(0, time.indexOf('.'));
// // time = time.substr(0, time.length - 2) + '.' + time.substr(time.length - 2);

// // console.log(`${split[0]}_${time}`);

// /** Utility function to create a K:V from a list of strings */
// function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
// 	const result = o.reduce((res, key) => {
// 		res[key] = key;
// 		return res;
// 	}, Object.create(null));
// 	console.log('result', result);
// 	return result;
// }

// // function mapEnum<T extends string>(o: any): { [K in T]: K } {
// // 	const res = Object.create(null);
// // 	Object.keys(o).forEach((key) => {
// // 		res[key] = o[key];
// // 	});
// // 	console.log('res', res);
// // 	return res;
// // }

// // export const OutputFormatMap = mapEnum({
// // 	json: 'json',
// // 	text: 'txt',
// // 	both: 'both',
// // });
// export const OutputFormatMap = {
// 	JSON: 'json',
// 	TEXT: 'txt',
// 	BOTH: 'both'
// };

// /** Create a Type */
// type OutputFormatMap = keyof typeof OutputFormatMap;

// console.log(OutputFormatMap)

// let ofm: OutputFormatMap;
// ofm = OutputFormatMap.

// // export const OutputFormatMap = {
// // 	json: 'json',
// // 	text: 'txt',
// // 	both: '',
// // };


// /** Create a K:V */
// const Direction = strEnum([
// 	'North',
// 	'South',
// 	'East',
// 	'West'
// ])
// /** Create a Type */
// type Direction = keyof typeof Direction;

// let sample: Direction;

// sample = Direction.North; // Okay
// sample = 'North'; // Okay
// // sample = 'AnythingElse'; // ERROR!
