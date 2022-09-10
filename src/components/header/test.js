 let data = [ "tivi" , "tu lanh" ," laptop","dien thoai"," ti vi" ]
let a = data.filter(function(value){
    return value.match(/Tivi/i) 
})
console.log(data[4].trim().indexOf(" "));
a = data[1].split(" ")

console.log(a.join(""));