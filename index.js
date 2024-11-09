function rev(str) {
    return str.split(' ').map(str => {
        let rev = ''
        for (let i = str.length - 1; i >= 0; i--){
            rev+=str[i]
        }
        console.log(rev)
        return rev
    }).join(' ')
}
let inputStr = 'welcome to club'
const result = rev(inputStr)
console.log(result)

console.log("Try programiz.pro");
let k='dia,ria'
let m=k.split(',').map(data=>data.trim()).filter(data=>data).join(',')
console.log(m)
let str='{"name":"pia","age":20}'
let parse=JSON.parse(str) //string to object
console.log(parse)

const text='["rd", "BMW", "Audi", "Fiat"]'
const myArr = JSON.parse(text);

console.log(myArr)