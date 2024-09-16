import { SearchInput } from "@/components/search-input";
import { getDocuments } from "@/actions/get-documents";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DocumentsList } from "@/components/documents-list";
import { Sidebar } from "./(dashboard)/_components/sidebar";
import { Navbar } from "./(dashboard)/_components/navbar";

interface SearchPageProps {
  searchParams: {
    title?: string; 
  };
}


const HomePage =  async () => {
    
    const { userId } = auth();

    if (!userId) {
      return redirect("/");
    }
  
    const documents = await getDocuments({
      userId,
    });

    return (
      <div className="flex flex-col min-h-screen">
       <div className="fixed inset-y-0 w-full z-50 h-[80px] md:pl-56">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
        <div className="px-6 md:hidden md:mb-0 block">
          <SearchInput />
        </div>
        <main className="flex-grow md:pl-60 pt-[80px]">
          <DocumentsList items={documents} />
        </main>
      </div>
    )
}

export default HomePage