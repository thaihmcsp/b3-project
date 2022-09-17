const { createSlice } = require("@reduxjs/toolkit");

let string = window.localStorage.getItem('user-shope')


let init = [] 
if(!string) {
    init = []
}else{
    init = JSON.parse(string);
   
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

const userSlice = createSlice({
    name: 'user',
    initialState: init,
    reducers: {
        userLogin: function (state, action) {
            window.localStorage.setItem('user-shope', JSON.stringify(action.payload.user))
            return action.payload.user;
        },
        
    }
})

export const {userLogin} = userSlice.actions;
export const userReducer = userSlice.reducer;