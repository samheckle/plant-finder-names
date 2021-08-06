let json = ''
let names = []
const nameText = document.getElementById('name')
$.ajaxSetup({async: false})
$.ajax({
  url: "https://api.petfinder.com/v2/animals",
  data: {"limit": "100"},
  type: "GET",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxeHBNaVg2Tm1SZ3hjcXhHRGZtSGJLYnAya055cEJqRmNFNGxSUjJuSDNPbm9HcGp1MSIsImp0aSI6IjdiYjdjM2EzYjdhYjUwYzdjZGI5ZTlkZGVjNTg4ZmQ3Y2NhOWQ2MjgzMzMyNWQyYmRhNjAzZGJmM2FiYmM0NWNjZjYxMjc2NDQxNGI0NWI5IiwiaWF0IjoxNjI4MjE2NDk2LCJuYmYiOjE2MjgyMTY0OTYsImV4cCI6MTYyODIyMDA5Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.L8VZBR5vC_NjJVyj3l4IwfEyb-zFg7rGpIXQBs2_0EKdDQ2gkGvlCuOizKNU7UHhagJhlGNka42r1y3cwNdKQW-mQAysyXmxYfbBRjvYStqQ94BgB9DmTWPw6SXEv3uGmi9N8JTCiwC5po5hse8qhrQ8M_dFMReXh5uAc3ZN5YHQnZh9IgfqkJIr01nvkQ67zWV-382FIC2W5i1W6bU4wWlbTIb94JsOt2t7PqrsIy_0UXAj7Wv3Ga1cGMDEJ3gt7KSr7DlR0iPlY1QKUvhFALdm7ay89WGvhLixKVpMKOZIyUSyhYswt7_c0_O2HwRtvQQVTQ745HkXAhhmd4rkFQ"
  },
  success: function(res) {
    json = res
  }
})

let animals = json.animals
let len = animals.length

let regex = /^[A-Za-z0-9 ]+$/

for ( let i = 0 ; i < len ; i++){
  let name = animals[i].name
  if(regex.test(name) && name != 'undefined' && name != undefined) names.push(name)
    // console.log(animals[i].name)
}

let rand = Math.floor(Math.random() * len)

let text = document.createTextNode(names[rand]);

nameText.appendChild(text);