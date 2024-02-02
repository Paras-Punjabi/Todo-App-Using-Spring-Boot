"use client"
import { Inter } from "next/font/google";
import { useState,useContext,createContext } from "react";
import "./globals.css";
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });
export const context = createContext()

export default function RootLayout({ children }) {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  return (
    <html lang="en">
      <head>
        <title>TODO-App</title>
      </head>
      <context.Provider value={{loggedInStatus,setLoggedInStatus}}>
      <body className={inter.className}>
        <Navbar loggedInStatus={loggedInStatus}/>
        {children}
        </body>
      </context.Provider>
    </html>
  );
}
