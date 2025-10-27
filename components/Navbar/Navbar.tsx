"use client";
import { Button } from "@/components/ui/button";
import { Brain, SunIcon } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useState } from "react";
import { SignUp, SignUpButton, SignInButton } from "@clerk/nextjs";
const Navbar = () => {
  return (
    <div className=" bg-muted">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-(--breakpoint-xl) mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex gap-4">
            <Brain className="ml-10" />
            <p>AI-Resumae-Fixer</p>
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
            <SignUpButton mode="modal">
              <Button className="rounded-full">Get Started</Button>
            </SignUpButton>
            <Button size="icon" className="rounded-2xl mr-2" variant="outline">
              <SunIcon />
            </Button>
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
