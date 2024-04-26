import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Entry } from "@/constants/index"
import { IndexEntry } from "./index_entry"

export function IndexScrollArea(props:{entries:Entry[]}) {
  return (
    <div style={{width:"100%"}}>
    <h1 style={{fontSize:"30px"}}><b>スレ一覧</b></h1>
    <ScrollArea className="rounded-md border" style={{width:"100%", height:"400px"}}>
      <div className="p-4">
        {props.entries.map((entry) => (
          <>
            <div key={entry.id} className="text-sm">
              <IndexEntry entry={entry}></IndexEntry>
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
    </div>
  )
}