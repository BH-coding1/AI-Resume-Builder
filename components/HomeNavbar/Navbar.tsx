"use client";
import { Button } from "@/components/ui/button";
import { Brain, SunIcon } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useState } from "react";
import { SignUp, SignUpButton, SignInButton,SignedIn,SignedOut} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  
  return (
    <div className=" ">
        <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-(--breakpoint-xl) mx-40 rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex gap-4">
            <Brain className=" md:ml-10" />
            <p>ResuBuild</p>
          </div>

          {/* Desktop Menu */}
         
          
          
          <div className="flex items-center gap-3">
            <Link href='/home'>
              <Button className="rounded-full w-full">← GO TO HOMEPAGE</Button>
            </Link>
            {/* Mobile Menu */}
            <div className="md:hidden">
              
              <NavigationSheet />
            
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
