
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function BooksPage() {
    return (
        <div className="container mx-auto p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Manage Books</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Book
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Book List</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">No books have been added yet. Click "Add New Book" to get started.</p>
                </CardContent>
            </Card>
        </div>
    );
}
