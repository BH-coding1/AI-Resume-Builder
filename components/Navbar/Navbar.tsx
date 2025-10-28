"use client";
import { Button } from "@/components/ui/button";
import { Brain, SunIcon } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useState } from "react";
import { SignUp, SignUpButton, SignInButton,SignedIn,SignedOut} from "@clerk/nextjs";

const Navbar = () => {
  
  return (
    <div className=" bg-muted">
      <SignedOut>
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-(--breakpoint-xl) mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex gap-4">
            <Brain className=" md:ml-10" />
            <p>ResuBuild</p>
          </div>

          {/* Desktop Menu */}
          
          <NavMenu className="hidden md:block  " />
      
          <div className="flex items-center gap-3">
            
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="hidden sm:inline-flex rounded-full"
              >
                Sign In
              </Button>
            </SignInButton>
            
            <SignUpButton mode="modal" fallbackRedirectUrl={'/upload'}>
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
        <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-(--breakpoint-xl) mx-40 rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex gap-4">
            <Brain className=" md:ml-10" />
            <p>ResuBuild</p>
          </div>

          {/* Desktop Menu */}
         
          
          
          <div className="flex items-center gap-3">
            
              <Button className="rounded-full w-full">Upload Resume</Button>
            
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
