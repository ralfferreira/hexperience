// import React, { createContext, useState, useEffect } from 'react'
// export const AuthContext = createContext({});

// export default function AuthContextProvider({ children }) {
//   const [name, setName] = useState();

//   useEffect(() => {
//     //Sync the local storage
//     setName(name);
//   }, [name]);

//   useEffect(() => {
//     //Checking if there is a data on API
//     if (getName()) {
//       setTodoList(getName());
//     }
//   }, []);

//   return (
//     <dataContext.Provider
//       value={{ name, setName }}
//     >
//       {children}
//     </dataContext.Provider>
//   )
// }