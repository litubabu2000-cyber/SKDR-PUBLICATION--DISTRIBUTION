'use client';

import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, XCircle, Timer, Train, Building, Banknote, PenTool } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";


const Mix = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-1.05A5.495 5.495 0 0 1 12 6c2.61 0 4.83 1.8 5.4 4.22l.28 1.15l1.16.1C20.97 11.54 22 12.68 22 14c0 1.65-1.35 3-3 3z"/><path fill="currentColor" d="m14.24 13.76l-1.41 1.41l-1.07-1.06l-1.06 1.06l-1.41-1.41l1.06-1.06l-1.06-1.06l1.41-1.41l1.06 1.06l1.07-1.06l1.41 1.41l-1.06 1.06z"/></svg>
)

const examCategories = [
  { name: "Railway", icon: Train, href: "/mcq-practice/reasoning/coding-decoding/railway" },
  { name: "SSC", icon: Building, href: "/mcq-practice/reasoning/coding-decoding/ssc" },
  { name: "Banking", icon: Banknote, href: "/mcq-practice/reasoning/coding-decoding/banking" },
  { name: "OSSC", icon: PenTool, href: "/mcq-practice/reasoning/coding-decoding/ossc" },
  { name: "Mix", icon: Mix, href: "/mcq-practice/reasoning/coding-decoding/mix" },
];

export default function CodingDecodingPage() {
  const topicName = "Coding-Decoding";

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{topicName}</h1>
        <p className="text-muted-foreground md:text-xl">Select an exam category to practice.</p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {examCategories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="bg-card hover:bg-primary hover:text-primary-foreground transition-colors h-full group">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4">
                <category.icon className="size-10 text-primary group-hover:text-primary-foreground transition-colors" />
                <span className="text-lg font-semibold">{category.name}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}