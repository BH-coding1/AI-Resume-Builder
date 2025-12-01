"use client";
import { Button } from "@/components/ui/button";
import { Brain, SunIcon } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useState } from "react";
import { SignUp, SignUpButton, SignInButton,SignedIn,SignedOut,SignOutButton} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  
  return (
    <div className=" bg-muted">
      <SignedOut>
      <nav className="fixed top-6 z-40 overflow-hidden inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-(--breakpoint-xl) mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex gap-4">
            <Brain className=" md:ml-10" />
            <p>ResuBuild</p>
          </div>

          {/* Desktop Menu */}
          
          <NavMenu className="hidden md:block  " />
      
          <div className="flex items-center gap-3">
            
            <SignInButton mode="modal" fallbackRedirectUrl={'/upload'}>
              <Button
                variant="outline"
                className="hidden sm:inline-flex rounded-full"
              >
                Sign In
              </Button>
            </SignInButton>
            
            <SignUpButton mode="modal" fallbackRedirectUrl={'/upload'} >
              <Button className="rounded-full">Get Started</Button>
            </SignUpButton>
            

            {/* Mobile Menu */}
            <div className="md:hidden">
              
              <NavigationSheet />
              
            </div>
          </div>
        </div>
      </nav>
      </SignedOut>

      <SignedIn>
        <nav className="fixed top-6 overflow-hidden inset-x-4 h-16 bg-white border dark:border-slate-700/70 max-w-(--breakpoint-xl) mx-40 rounded-full">
        <div className="h-full flex items-center overflow-hidden justify-between mx-auto px-4">
          <Link href='/home'> 
          <div className="flex gap-4">
            <Brain className=" md:ml-10" />
            <p>ResuBuild</p>
          </div>
          </Link>
          {/* Desktop Menu */}
         
          
          
          <div className="flex items-center gap-3 overflow-hidden">
            <Link href='/'>
            <SignOutButton>
              <Button className="rounded-full overflow-hidden w-full bg-white border border-primary-900 font-lg text-primary-700 hover:text-white ">Logout</Button>
            </SignOutButton>
            </Link>

            <Link href='/upload'>
              <Button className="rounded-full w-full overflow-hidden">Upload Resume</Button>
            </Link>
            {/* Mobile Menu */}
            <div className="md:hidden">
              
              <NavigationSheet />
            
            </div>
          </div>
        </div>
      </nav>
      </SignedIn>
    </div>
  );
};

export default Navbar;
