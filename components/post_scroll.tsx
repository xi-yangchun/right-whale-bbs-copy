import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Thread } from "@/constants"
import PostCard from "./post_card"

export function ThreadScrollArea(props:{thread:Thread}) {
  return (
    <div style={{width:"100%"}}>   
      <h1 style={{fontSize:"30px"}}><b>{props.thread.title}</b></h1>
      <ScrollArea className="rounded-md border" style={{height:"400px"}}>
      <div className="p-4">
        {props.thread.posts.map((post) => (
          <div key={post.id}>
            <div className="text-sm">
              <PostCard post={post}></PostCard>
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
    </div>

  )
}