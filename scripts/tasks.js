// 1) Написать функцию getFieldValues, которая будет принимать на вход массив объектов,
// а возвращать – массив значений одного из полей (отсортированных в порядке возрастания):
// ------------------------
function getFieldValues(array, field) {
		let result = [];
		array.forEach(function(name, i, array) {
			result.push(name[field]);
		});
		return result.sort();
}
let usersData = [
	{ 'user' : 'Alex', 'password' : 'MyNameIsAlex' },
	{ 'user' : 'Bob', 'password' : 'MyNAmeIsBob' }
];
console.log(getFieldValues(usersData, 'user')); // --> ['Alex', 'Bob']

// ------------------------


// 2) Написать функцию, фильтрующую массив с использованием предиката:
// ------------------------
function isEven(x) {
	return (x % 2 == 0) ? true : false;
};

function filter(array, func) {
	return array.filter(func);
}

let numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55];
console.log(filter(numbers, isEven)); // --> [2, 8, 34]

// ------------------------


// 3) Даны 2 строки со словами (без знаков препинания),
// вывести те слова (по одному разу), которые встречаются в обоих строках
// ------------------------
function findSimilarWords(s1, s2) {

	let result = [];
	let arr1 = s1.split(" ");
	let arr2 = s2.split(" ");

	arr1.forEach(function(item, i, arr) {
		if (arr2.indexOf(item) >= 0 && result.indexOf(item) < 0) {
			result.push(item);
		}
	});

	return result;
}

var firstLongString = 'Load up on guns and bring your friends it is fun to lose and to pretend';
var secondLongString = 'She is over bored and self assured oh no I know a dirty word';
console.log(findSimilarWords(firstLongString, secondLongString)); // --> ['and', 'is'];

// ------------------------



// 4) Дан IP-адрес (строка) и маска подсети (десятичное число). Написать функцию, которая будет валидировать
// IP-адрес (4 октета, <= 255), а затем выводить сетевой и широковещательный адреса:
// ------------------------
function generateBroadcastAndNetworsAddresses(ipAddress, subnetMask) {
	let ip = IpAddress.split(".");
	let mask = [];

	if (ip.some(function(x) {
		let cd = +x;
		return x.length == 0 || isNaN(cd) || cd < 0 || cd > 255 || ip.length !=4;
	})) {
		console.log("Invalid IP");
	};

	while (subnetMask > 0) {
		let temp = "";
    for (let i = 0; i < 8; i++) {
        temp += --subnetMask >= 0 ? "1" : "0";
    }
    mask.push(parseInt(temp, 2));
	}

	function NetworkAddress(ip, mask) {
		let arr = [];
		for (let i = 0; i < 4; i++) {
			arr.push(ip[i] & mask[i]);
		}
		return arr.join(".");
	}

	function BroadcastAddress(ip, mask) {
		let invBin = function(bin) {
			let st = 0;
			let temp = bin;
			while (temp > 1) {
					temp = temp >> 1;
					st = (st << 1) | 1;
			}
			return ~bin & st;
		}
		let temp = [];
		for (let i = 0; i < 4; i++) {
			temp.push(ip[i] | invBin(mask[i]));
		}
		return temp.join(".");
	}
	return "Broadcast - " + BroadcastAddress(ip, mask) + ", Network - " + NetworkAddress(ip, mask);
}

var IpAddress = '10.223.98.2';
var subnetMask = 28;
console.log(generateBroadcastAndNetworsAddresses(IpAddress, subnetMask)); // Broadcast - 10.223.98.15, Network - 10.223.98.0

// ------------------------


// 5) Соединить все массивы в один, не допуская повторения элементов (порядок не важен):
// ------------------------
function makeItClean(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result = result.concat(arr[i]);
    }
    result = result.filter(function(item, pos) {
        return result.indexOf(item) == pos;
    });
    return result;
}

var totalMessArray = [['a', 1, true], [true, 99, 'aa', undefined], ['1']];
console.log(makeItClean(totalMessArray)); // --> ['a', 'aa', 1, '1', undefined, true];

// ------------------------