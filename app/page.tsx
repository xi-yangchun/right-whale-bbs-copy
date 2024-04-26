'use server'
import Image from "next/image";
import { IndexScrollArea } from "@/components/thread_scroll";
import { ThreadScrollArea } from "@/components/post_scroll";
import { NextResponse } from "next/server";
import { get_entry } from "@/actions/entry";
import { Entry, Thread } from "@/constants";
import { get_thread,get_thread2 } from "@/actions/thread"
import { PostForm } from "@/components/post_form";
import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";

export default async function Home() {
  const entries:Entry[]=await get_entry();
  const thread:Thread=await get_thread2(entries[0].id);

  return (
      <div style={{width: '100%'}}>
      <h1 style={{fontSize:"50px"}}><b>Right Whale BBS</b></h1>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div>
          <IndexScrollArea key="threads" entries={entries}></IndexScrollArea>
          <Link href="create" 
          className={badgeVariants({ variant: "secondary"})}
          style={{borderRadius:10, width:"100%", height:"40px"}}>
            <h1 style={{fontSize:"15px"}}>新しいスレッドを作成する</h1></Link>
          </div>
          <div style={{"width":"40%"}} key="middle">
          <ThreadScrollArea thread={thread}></ThreadScrollArea>
          </div>
          <div style={{"width":"35%"}} key="right">
          <PostForm thread_id={entries[0].id}></PostForm>
          </div>
      </div>

      </div>
  );
}
