
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Train, Banknote, School, User, Rocket, Atom, Book, Globe } from "lucide-react";
import Link from "next/link";

const nationalExams = [
    { name: "UPSC", icon: User, href: "#" },
    { name: "SSC", icon: Building, href: "#" },
    { name: "Banking", icon: Banknote, href: "#" },
    { name: "Railways", icon: Train, href: "https://rrbchennai.gov.in/" },
    { name: "NEET/JEE", icon: Rocket, href: "#" },
    { name: "Teaching (TET/TGT)", icon: School, href: "#" },
];

const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const unionTerritories = [
    "Andaman & Nicobar", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu", "Delhi", "Jammu & Kashmir",
    "Ladakh", "Lakshadweep", "Puducherry"
];

export default function ExamNotificationPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Exam Notifications</h1>
        <p className="text-muted-foreground md:text-xl">Latest updates for national and state-level exams.</p>
      </div>
      
      <div className="space-y-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-2xl font-headline">
              <Globe className="size-8 text-primary" />
              National Level Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nationalExams.map((exam) => (
                <Link href={exam.href} key={exam.name} target="_blank" rel="noopener noreferrer">
                  <div className="p-4 bg-card border rounded-lg text-center font-medium text-muted-foreground transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground hover:shadow-md h-full flex flex-col items-center justify-center gap-2">
                    <exam.icon className="size-8" />
                    <span>{exam.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-2xl font-headline">
              <Book className="size-8 text-primary" />
              State & Union Territory Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...states, ...unionTerritories].map((location) => (
                <Link href="#" key={location}>
                  <div className="p-3 bg-background border rounded-lg text-center font-medium text-muted-foreground transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground hover:shadow-md h-full flex items-center justify-center">
                    {location}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
