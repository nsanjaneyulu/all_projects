import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  groupByType: any = [];
  constructor(public dashboardService: DashboardService, private routeCtrl: Router) { }

  ngOnInit() {
    // Shallowing Deep Copy start
    // var obj1 = {name : "hello", age : "32"};
    // var obj2 = obj1;
    // obj2.age = "42";
    // console.log(obj1, obj2);
    // Shallowing Deep Copy end

    // var let start
    // console.log(a);
    // console.log(b);
    // console.log(d);
    // var a = 10;
    // let b = 20;
    // var let end

    // Unique array
    //  const arr = [
    //   { id: 1, name: "king" },
    //   { id: 2, name: "master" },
    //   { id: 3, name: "lisa" },
    //   { id: 4, name: "ion" },
    //   { id: 5, name: "jim" },
    //   { id: 6, name: "gowtham" },
    //   { id: 1, name: "jam" },
    //   { id: 1, name: "lol" },
    //   { id: 2, name: "kwick" },
    //   { id: 3, name: "april" },
    //   { id: 7, name: "sss" },
    //   { id: 8, name: "brace" },
    //   { id: 8, name: "peiter" },
    //   { id: 5, name: "hey" },
    //   { id: 6, name: "mkl" },
    //   { id: 9, name: "melast" },
    //   { id: 9, name: "imlast" },
    //   { id: 10, name: "glow" },
    //   { id: 11, name: "mkl" },
    //   { id: 8, name: "april" },
    //   { id: 7, name: "master" }
    // ];  
    // var uniq = arr.filter(({id}) => {
    //   return !this[id] && (this[id] = id)
    // }, {})  
    // console.log(uniq);
    // Unique array end

    //Filters
    // var pilots = [
    //   {
    //     id: 2,
    //     name: "Wedge Antilles",
    //     faction: "Rebels",
    //   },
    //   {
    //     id: 8,
    //     name: "Ciena Ree",
    //     faction: "Empire",
    //   },
    //   {
    //     id: 40,
    //     name: "Iden Versio",
    //     faction: "Empire",
    //   },
    //   {
    //     id: 66,
    //     name: "Thane Kyrell",
    //     faction: "Rebels",
    //   }
    // ];
    // var rebels = pilots.filter((pilot) => {
    //   return pilot.faction === "Rebels";
    // });
    // console.log("rebels",rebels);
    // var empire = pilots.filter((pilot) => {
    //   return pilot.faction === "Empire";
    // });
    // console.log("rebels",empire);
    //Filters end

    // map filters reduce start
    // var personnel = [
    //   {
    //     id: 5,
    //     name: "Luke Skywalker",
    //     pilotingScore: 98,
    //     shootingScore: 56,
    //     isForceUser: true,
    //   },
    //   {
    //     id: 82,
    //     name: "Sabine Wren",
    //     pilotingScore: 73,
    //     shootingScore: 99,
    //     isForceUser: false,
    //   },
    //   {
    //     id: 22,
    //     name: "Zeb Orellios",
    //     pilotingScore: 20,
    //     shootingScore: 59,
    //     isForceUser: false,
    //   },
    //   {
    //     id: 15,
    //     name: "Ezra Bridger",
    //     pilotingScore: 43,
    //     shootingScore: 67,
    //     isForceUser: true,
    //   },
    //   {
    //     id: 11,
    //     name: "Caleb Dume",
    //     pilotingScore: 71,
    //     shootingScore: 85,
    //     isForceUser: true,
    //   },
    //   {
    //     id: 19,
    //     name: "Smith Dume",
    //     pilotingScore: 61,
    //     shootingScore: 95,
    //     isForceUser: false,
    //   },
    //   {
    //     id: 21,
    //     name: "Caleb Ford",
    //     pilotingScore: 91,
    //     shootingScore: 25,
    //     isForceUser: true,
    //   },
    // ];
    // var jediPersonnel = personnel.filter((person) => {
    //   return person.isForceUser;
    // });
    // var jediScores = jediPersonnel.map(function (jedi) {
    //   return jedi.pilotingScore + jedi.shootingScore;
    // });
    // var totalJediScore = jediScores.reduce(function (acc, score) {
    //   return acc + score;
    // }, 0);
    // console.log("totalJediScore",totalJediScore);
    // const totalJediScore = personnel
    // .filter(person => person.isForceUser)
    // .map(jedi => jedi.pilotingScore + jedi.shootingScore)
    // .reduce((acc, score) => acc + score, 0);
    // console.log("totalJediScore",totalJediScore);
    // map filters reduce end

    //group by
    //   var employessData = [
    //     {
    //       name: "Anji",
    //       id: "1",
    //       type: "developer", 
    //     },
    //     {
    //       name: "Nagraj",
    //       id: "2",
    //       type: "developer", 
    //     },
    //     {
    //       name: "Thiyagu",
    //       id: "9",
    //       type: "developer", 
    //     },
    //     {
    //       name: "Karthik",
    //       id: "3",
    //       type: "tester",  
    //     },
    //     {
    //       name: "Sravani",
    //       id: "4",
    //       type: "tester",  
    //     },
    //     {
    //       name: "Imran",
    //       id: "5",
    //       type: "support",  
    //     },
    //     {
    //       name: "Dileep",
    //       id: "6",
    //       type: "support",  
    //     },
    //     {
    //       name: "Renukha",
    //       id: "7",
    //       type: "OPS Manager",  
    //     },
    //     {
    //       name: "Sheena",
    //       id: "8",
    //       type: "Marketing",  
    //     }
    //   ];
    //  this.groupByType = [];
    //  employessData.forEach((groupByTypeLoop) => {
    //   this.groupByType[groupByTypeLoop.type] = this.groupByType[groupByTypeLoop.type] || [];
    //   this.groupByType[groupByTypeLoop.type].push({ id: groupByTypeLoop.id, name: groupByTypeLoop.name, type: groupByTypeLoop.type });
    //  }); 
    //  console.log("groupByType", this.groupByType, typeof(this.groupByType));
    //   let objs = Object.keys(this.groupByType).map(key => this.groupByType[key]);
    //   console.log("objs",objs);
    //   var result = employessData.reduce((r, a) => {
    //     r[a.type] = r[a.type] || [];
    //     r[a.type].push(a);
    //     return r;
    //   }, {});
    //   console.log("result", result);
    //  const cars = [{
    //     make: "audi",
    //     model: "r8",
    //     year: "2012"
    //     },
    //     {
    //     make: "audi",
    //     model: "rs5",
    //     year: "2013"
    //     },
    //     {
    //     make: "ford",
    //     model: "mustang",
    //     year: "2012"
    //     },
    //     {
    //     make: "ford",
    //     model: "fusion",
    //     year: "2015"
    //     },
    //     {
    //     make: "kia",
    //     model: "optima",
    //     year: "2012"
    //     }];
    //     let group = cars.reduce((r, a) => {
    //       r[a.make] = [...r[a.make] || [], a];
    //       return r;
    //      }, {});
    //      console.log("group", group);
    //  group bt end

    //
    // var arr = [1,2,4,5,2,3,4];
    // console.log(Array.from(arr).join(''));
    //

    //
    // var obj = {
    //     num: 89
    // };
    // var arr = [4,5,6]
    // var addToThis = (objValue, arrValue) => {
    //   console.log("objValue",objValue);
    //   return objValue.num + arrValue[0] + arrValue[1] + arrValue[2];
    // }
    //   console.log(addToThis(obj, arr));
    //

    //
    // var a =[1,2,3];
    // var b =[4,5,6];
    // Array.prototype.push.apply(a, b);
    // console.log(a);
    //

    //
    //    function reverse(array){
    //       var output = [],i;
    //       for (i = 0; i < array.length; i++){
    //         output.unshift(array[i]);
    //       }

    //       return output;
    //     }
    //  console.log(reverse([1,2,3,4,5,6,7]));
    //

    //
    //     var name = 'Sam';
    //     var age = 42;
    //     console.log(`hello my name is ${name}, and I am ${age} years old`);
    // function printReverse(array) {
    //   for (let i = array.length-1; i > -1; i--) {
    //     console.log(array[i]); //4,3,2,1
    //   }
    // }
    // printReverse([1, 2, 3, 4]);
    //

    //
    // let filledArray = new Array(10).fill(null).map(()=> ({'hello':'goodbye'}))
    //     console.log("filledArray", filledArray);
    //     var array1 = ["yes", "no", "maybe", "always", "sometimes", "never", "if"];
    //     function reverseArray(arr) {
    //       var output = [],i;
    //       for (i = 0; i < arr.length; i++){
    //         output.unshift(arr[i]);
    //       }
    //       return output;
    //     }
    //     console.log(reverseArray(array1));

    //
    // const cars = ['Porsche', 'Ferrari'];
    //   const carsCopy = [...cars];
    //   cars.push("test");
    //   console.log(cars,"cars");
    //   console.log(carsCopy, "carsCopy");
    //

    //
    // const phrase = 'I love my dog! Dogs are great';
    //   const stripped = phrase.split('Dogs').join('');
    //   console.log("stripped", stripped);
    //

    //
    // var names = ["Mike","Matt","Nancy","Adam","Jenny","Nancy","Carl", "Adam", "Matt"];
    //   var uniqueNames = names.filter((item, pos) => {
    //     console.log("item, pos", names.indexOf(item), pos);
    //     return names.indexOf(item) == pos;
    //   });
    //   console.log("uniqueNames",uniqueNames);
    //

    //
    //  const array1 = ['a', 'b', 'c'];
    // for (const element of array1) {
    //   console.log(element);
    // }
    // var officers = [
    //   { id: 20, name: 'Captain Piett' },
    //   { id: 24, name: 'General Veers' },
    //   { id: 56, name: 'Admiral Ozzel' },
    //   { id: 88, name: 'Commander Jerjerrod' }
    // ];
    // var officersIds = officers.map(function (officer) {
    //   return officer.name
    // });
    // console.log("officersIds", officersIds);
    //

    //
    // const object = {a: 1, b: 2, c: 3};
    // for (const property in object) {
    //   console.log(`${property}: ${object[property]}`);
    // }
    //

    //
    // let vegetables = ['parsnip', 'potato'];
    // let moreVegs = ['celery', 'beetroot'];
    // vegetables.push(...moreVegs);
    // console.log(vegetables)
    // const num1 = [1, 2, 3];
    // const num2 = [4, 5, 6];
    // const num3 = [7, 8, 9];
    // const numbers = num1.concat(num2, num3);
    // console.log("numbers",numbers);
    //

    //
    // const array1 = [1, 2, 3, 4, 7, 9, 6, 8, 9, 4];
    // console.log(array1.fill(5, 3, 7));
    //

    //
    // const animals = ['ant', 'bison', 'camel', 'duck', 'elephant', 'tiger', 'lion', 'cat'];
    // console.log(animals.splice(2,4)); // 'camel', 'duck', 'elephant', 'tiger'
    // console.log(animals.slice(2,4));
    //

    //
    // let myHonda = { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 } }
    // let myCar = [myHonda, 2, 'cherry condition', 'purchased 1997']
    // let newCar = myCar.slice(0, 3);
    // console.log("newCar",newCar);
    // var myArray = [1, 2, 3, 4];
    // for (var index in myArray) {   
    //   console.log(index);
    // }
    //

    //
    // function sortGreatest(arr) {
    //   for (let i = 0; i < arr.length; i++) {
    //     for (let j = i; j < arr.length; j++) {
    //       if (arr[i] < arr[j]) {
    //         let temp = arr[i]; // store original value for swapping
    //         arr[i] = arr[j]; // set original value position to greater value
    //         arr[j] = temp; // set greater value position to original value
    //       };
    //     };
    //   };
    //   return arr;
    // };
    // console.log(sortGreatest([10,9,1000,12,-11,3]));
    //
    
    //
    // var homes = [{
    //   "h_id": "3",
    //   "city": "Dallas",
    //   "state": "TX",
    //   "zip": "75201",
    //   "price": "162500"
    // }, {
    //   "h_id": "4",
    //   "city": "Bevery Hills",
    //   "state": "CA",
    //   "zip": "90210",
    //   "price": "319250"
    // }, {
    //   "h_id": "5",
    //   "city": "New York",
    //   "state": "NY",
    //   "zip": "00010",
    //   "price": "962500"
    // }];
    // homes.sort((a, b) => Number(a.price) - Number(b.price));
    // console.log("ascending", homes);
    //

    //
    //
    // (() => {
    //   var x = 20;
    //   var y = 30;
    //   var answer = x + y;
    //   console.log(answer);
    //   })();
    //

    //
    // var arr = [20,30,50,10,40];
    // for (let value of arr) {
    //   console.log( value );
    // }
    //

    //
    // var articles = [
    // {
    //     ArticleTitle: 'article one',
    //     ArticleTags: [
    //         {key:0, value:'Back'},
    //         {key:1, value:'Shoulder'},
    //         {key:2, value:'Injury'},
    //         {key:3, value:'Abs'}]
    // },
    // {
    //     ArticleTitle: 'article two',
    //     ArticleTags: [
    //         {key:3, value:'Abs'},
    //         {key:1, value:'Shoulder'},
    //         {key:4, value:'Leg'},
    //         {key:5, value:'Others'}]}
    // ];
    // articles.forEach(element => {
    //     element.ArticleTags.forEach(ele => {
    //       console.log(ele.value);
    //     });
    // })
    //

    //
    // var example = ['A', 'B', 'C', 'D'];
    // example.splice(2, 0, 'E'); 
    // console.log(example);
    // var copy = example.splice(2, 1); 
    // console.log(copy);
    // console.log(example);
    // var copy2 = example.splice(2, 0, 'E');
    // console.log(copy2);
    // console.log(example);
    //

    //
    // var a = ['A', 'B', 'C', 'D'];
    // var slicedArr = a.slice(1, 3);
    // console.log(a);
    // console.log(slicedArr);
    // var b = 'ABCD';
    // var slicedStr = b.slice(1, 3);
    // console.log(b);
    // console.log(slicedStr);
    //

    //
    // var string = 'Hello World. How are you doing?';
    // var splits = string.split(' ', 3);
    // console.log(splits);
    // var splits = string.split(' ');
    // console.log(splits);
    //

    //
    // const str = 'To be, or not to be, that is the question.';
    // console.log(str.includes('To be'))        // true
    // console.log(str.includes('question'))     // true
    // console.log(str.includes('nonexistent'))  // false
    // console.log(str.includes('To be', 1))     // false
    // console.log(str.includes('TO BE'))        // false
    // console.log(str.includes(''))             // true

    //
    // (function(a,b,c) {
    //   console.log([].includes.call(arguments, 'a'))  // true
    //   console.log([].includes.call(arguments, 'd'))  // false
    // })('a','b','c') 
    //

    //
    // Array.isArray([1, 2, 3]);  // true
    // Array.isArray({foo: 123}); // false
    // Array.isArray('foobar');   // false
    // Array.isArray(undefined);  // false
    //

    //heighest value
    // var data = [
    //   { 'name': 'Vins', 'age': 27 },
    //   { 'name': 'Jan', 'age': 38 },
    //   { 'name': 'Alex', 'age': 80 },
    //   { 'name': 'Carl', 'age': 25 },
    //   { 'name': 'Digi', 'age': 40 }
    // ];
  //   var max = data.reduce((prev, current) => {
  //     console.log(prev, current);
  //     return (prev.age > current.age) ? prev : current
  //  });
  //  console.log("max",max);
  //  var heighestValue = [1,2,3,4,8,6,9,7,12];
  //  var max = heighestValue.reduce((prev, current) => {
  //    console.log(prev, current, current > prev, current, prev);
  //    return current > prev ? current : prev
  //  });
  //  console.log("max",max);
  //

  //
  // var secondHighest = ['20','120','111','215','54','78']
  // secondHighest.sort((a, b) => { return b - a; })[1];
  //

  //
  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  // const capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('').toLowerCase();
  // console.log("capitalize",capitalize);
  // const str = 'the Eiffel Tower test';
  // const newStr = `${str[0].toUpperCase()}${str.slice(1)}`;
  // console.log('New String:', newStr); // The Eiffel Tower
  //

  //
  // var print1 = () => {
  //   console.log(1);
  // }
  // print1();
  // setTimeout(() =>
  // { console.log(2); }, 0);
  // console.log(3);
  //

  //
  // function capitalize(s){
  //   return s.toLowerCase().replace( /\b./g, (a) => { return a.toUpperCase(); } );
  // };
  // console.log(capitalize('this IS THE wOrst string eVeR'));
  // const capitalize = (str) => {
    
  //     return str
  //       .split(' ').map(s => {
  //           if (s.length == 1 ) {
  //             console.log("1");
  //               return s.toUpperCase();
  //           } 
  //           else {
  //             console.log("2");
  //               const firstLetter = s.split('')[0].toUpperCase()
  //               const restOfStr = s.substr(1, s.length).toLowerCase()
  //               return firstLetter + restOfStr
  //           }     
  //       }).join(' ');
  // }
  // var str = "tafel"
  // console.log(capitalize(str));

  }
}
