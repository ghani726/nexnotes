import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Workspace",
    description: "Your workspace to manage notes and tasks.",
    openGraph: {
        title: "Workspace | NexNotes",
        description: "Manage your notes and tasks in your NexNotes workspace.",
        url: "https://nexnotes.com/app",
        siteName: "NexNotes",
        images: [{ url: "", height: 1200, width: 630 }],
        type: "website",
    },
};

const page = () => {
    
    return <div>Page</div>;
};

export default page;
