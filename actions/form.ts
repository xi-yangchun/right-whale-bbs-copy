"use server"
import { revalidateTag } from "next/cache";
export async function addPostAction(name:string,content:string,thread_id:string){
    await fetch("https://endoiint.jp",
            {
                method:"POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"add_post":1,
                "name":name,"content":content,"thread_id":thread_id}),
                next: { tags: ['bbs'] }
            }
        )
        //revalidateTag('bbs');
}

export async function createThreadAction(title:string,name:string,content:string){
    await fetch("https://endoiint.jp",
            {
                method:"POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"create_thread":1,
                "title":title,"name":name,"content":content}),
                next: { tags: ['bbs'] }
            }
        )
    //revalidateTag('bbs');
}