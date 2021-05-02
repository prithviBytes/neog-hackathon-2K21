import { createContext,useState } from "react";


export const NavbarContext = createContext()

export function NavbarContextProvider({children}){
    const [isNavbarOpen,setOpen] = useState(false)
    const toggleNavbar = () =>{
        setOpen(isNavbarOpen => !isNavbarOpen)
    }
    const contextValue = {
        isNavbarOpen,
        toggleNavbar
    }
    return <NavbarContext.Provider value={contextValue}>
        {children}
    </NavbarContext.Provider>
}