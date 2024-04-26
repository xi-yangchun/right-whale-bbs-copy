'use server'
import { Post, Thread } from "@/constants";
import { streamToString } from "@/utils/basefunc";
import { revalidatePath } from "next/cache";
import { revalidateTag } from 'next/cache'
import axios from 'axios'

const get_thread = async(thread_id:string)=> {
        const { signal } = new AbortController()
        const res:Response=
        await fetch("https://endoiint.jp",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"get_thread":1,
                "thread_id":thread_id}),
            next: { tags: ['bbs'] },
            signal:signal
        });
        const thread_:{
            "id":string,
            "title":string,
            "posts":{
                "id":string,
                "name":string,
                "content":string,
                "datetime":string,
                "is_tripped":boolean,
                "replies":number[]
            }[]
        }=JSON.parse(await streamToString(res.body));
        const ret:Thread=new Thread(thread_.id,thread_.title);
        thread_.posts.map(
        (pst:{"id":string,"name":string,"content":string,
                "datetime":string,"is_tripped":boolean,
            "replies":number[]})=>{
            ret.posts.push(
                new Post(Number(pst.id),pst.name,pst.content,
                new Date(pst.datetime),pst.is_tripped,pst.replies)
            )
        }
    )
    revalidatePath("/","layout");
    //
    return ret;
}

async function get_thread2(thread_id:string){
    const endpont = "https://endoiint.jp"; // サンプルコード用、実際リクエストはしない
    const data = {
        get_thread:1,
        thread_id:thread_id
    };
    const response = await axios.post(endpont, data);
    console.log(response.data);

    const ret:Thread=new Thread(response.data["id"],response.data["title"]);
        response.data["posts"].map(
        (pst:{"id":string,"name":string,"content":string,
                "datetime":string,"is_tripped":boolean,
            "replies":number[]})=>{
            ret.posts.push(
                new Post(Number(pst.id),pst.name,pst.content,
                new Date(pst.datetime),pst.is_tripped,pst.replies)
            )
        })
    
        revalidateTag('bbs');

    return ret;
}

export {get_thread, get_thread2}