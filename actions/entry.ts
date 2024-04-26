import { Entry } from "@/constants";
import { streamToString } from "@/utils/basefunc";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";

const get_entry = async()=> {
        const res:Response=
        await fetch("https://endoiint.jp",{
          method:"POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({"get_index":1}),
          next: { tags: ['bbs'] }
        })

        const ret:Entry[]=[];
        const index:{"index":{
            "id":string,
            "title":string,
            "num_posts":string,
            "datetime_last_post":string
        }[]}=await JSON.parse(await streamToString(res.body));
    index["index"].map(
        (idx:{"id":string,"title":string,"num_posts":string,
                "datetime_last_post":string})=>{
            ret.push(
                new Entry(idx.id,idx.title,
                    Number(idx.num_posts),new Date(idx.datetime_last_post))
            )
        }
    )
    //revalidateTag('bbs');
    revalidatePath("/");
    return ret;
}

export {get_entry}