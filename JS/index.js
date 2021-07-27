'use strict'

// create own template
const json = "{\"23 May 2021, Sunday,\": {\"каб. 100\": [{\"time\": \"11 - 17\", \"group\": \"2\"}], \"каб. 200\": [{\"time\": \"12 - 15\", \"group\": \"2\"}], \"каб.300\": [{\"time\": \"10 - 13\", \"group\": \"4\"}]}, \"24 May 2021, Monday,\": {\"каб. 100\": [{\"time\": \"11 - 17\", \"group\": \"2\"}], \"каб. 200\": [{\"time\": \"12 - 15\", \"group\": \"2\"}], \"каб.300\": [{\"time\": \"10 - 13\", \"group\": \"4\"}]}}"
const obj = JSON.parse(json);

console.log(obj)

// Recurion
// Recursion traversal
//  1. Recursion structure
//  2. Recursion depth
//  3. Recursion base

// Deep Clone << Recursion >>
function deepClone(data, clone){
	(isArray(data)) ? clone = [] : clone = {};

	if(isArray(data)){
		data.forEach(elem => {
		  (isObject(elem)) ? clone.push(deepClone(elem)) : clone.psuh(elem)
		})
	}else if(isObject(data)){
		for(let key in data){
			(isObject(data[key])) ? clone[key] = deepClone(data[key]) : clone[key] = data[key]
		}
	}

	return clone;
}

const clone = deepClone(obj);
		console.log(clone);
		console.log(obj === clone);
		console.log(obj['23 May 2021, Sunday,'] === clone['23 May 2021, Sunday,'])







function isArray(elem){
	return Array.isArray(elem)
}
function isObject(elem){
	return (typeof elem === 'object' && elem !== null)
}
function isEmpty(elem){
	if(isArray(elem)){
		return elem.length <= 0
	}else if(isObject(elem)){
		return Object.keys(elem).length <= 0
	}else{
		return elem === undefined
	}
}



// Simple Clone << For in >>
// 1. Standart object's; changes : none
// 2. __proto__ change's : none; (Deceloper object's)

function scForIn(data){
	const clone = {}
	for(let key in obj){
		clone[key] = obj[key];
	}

	return clone;
}


// Simple Clone << For Of >>
// Create iterable object's

const symb = function(){
	return{
		keys: Object.keys(this),
		index: 0,
		next(){
			if(this.index < this.keys.length) return {done:false, value: this.keys[this.index++]}
			return {done:true}
		}
	}
}

function scForOf(data){
	const clone = {}
			data[Symbol.iterator] = symb;
			for(let key of data) clone[key] = data[key]

			return clone;
}

// Simple Clone << For / While >>
// Invertion; Double; Invertion + Double

function scFor(data){
	const clone = {}
	const keys = Object.keys(data);
	for(let i = keys.length; i--;){
		clone[keys[i]] = data[keys[i]]
	}

	return clone;
}



const scloneFI = scForIn(obj);
		console.log(scloneFI);
		console.log(obj === scloneFI);

const scloneFO  =scForOf(obj);
		console.log(scloneFO);
		console.log(obj === scloneFO);
		console.log(obj['23 May 2021, Sunday,'] === scloneFO['23 May 2021, Sunday,']);

const scloneF = scFor(obj);
		console.log(scloneF);
		console.log(obj === scloneF);



// Simple CLone << Universal >>
function scUniversal(data, clone){
	(isArray(data)) ? clone = [] : clone = {};

	if(isArray(data)){
		data.forEach(i => {
			if(isArray(i)){
				const clone_arr = []
				i.forEach( elem => clone_arr.push(elem))
				if(!isEmpty(clone_arr)) clone.push(clone_arr);
			}else if(isObject(i)){
				const clone_obj = {}
				for(let key in i) clone_obj[key] = i[key];

				if(!isEmpty(clone_obj)) clone.push(clone_obj)
			}else{
				if(!isEmpty(i)) clone.push(i)
			}
		})
	}else if(isObject(data)){
		for(let key in data){
			if(isArray(data[key])){
				const clone_arr = []
				data[key].forEach(i =>{
					clone_arr.psuh(i)
				})

				if(!isEmpty(clone_arr)) clone[key] = clone_arr;
			}else if(isObject(data[key])){
				const clone_obj = {}
				for(let k in data[key]){
					clone_obj[k] = data[key][k]
				}
				if(!isEmpty(clone_obj)) clone[key] = clone_obj;
			}else{
				if(!isEmpty(data[key])) clone[key] = data[key];
			}
		}
	}else{
		clone.prim = data;
	}

	return clone
}

const scUni = scUniversal(obj);
		console.log(scUni);
		console.log(obj === scUni);
		console.log(obj['23 May 2021, Sunday,'] === scUni['23 May 2021, Sunday,'])

const arr_test = [
	1,
	2,
	[1,2,3],
	{id:3, name:'John', age:27},
	10
]

console.log(scUniversal(arr_test))
console.log(arr_test === scUniversal(arr_test))
console.log(arr_test[3] === scUniversal(arr_test)[3])


