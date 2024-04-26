import { badgeVariants } from "./ui/badge"
import { Entry } from "@/constants"
import Link from "next/link"

export function IndexEntry(props:{entry:Entry}){
    return(
        <Link className={badgeVariants({ variant: "outline" })}
        style={{borderRadius:5, width:"100%"}}
            href={"/"+props.entry.id}>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div key="title"><text style={{fontSize:"15px"}}>{props.entry.title}</text>
            </div>
            <div key="recent_res_time">
            投稿数：{props.entry.num_posts}, {props.entry.datetime_last_post.toISOString()}</div>
            </div>
        </Link>
    )
}