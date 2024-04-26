'use server'
import Image from "next/image";
import { IndexScrollArea } from "@/components/thread_scroll";
import { ThreadScrollArea } from "@/components/post_scroll";
import { NextResponse } from "next/server";
import { get_entry } from "@/actions/entry";
import { Entry, Thread } from "@/constants";
import { get_thread, get_thread2 } from "@/actions/thread"
import { PostForm } from "@/components/post_form";
import Link from "next/link";

export default async function Home({ params }:{params: { thread_id: string }}) {
  const entries:Entry[]=await get_entry();
  const thread:Thread=await get_thread2(params.thread_id);

  return (
      <div style={{width: '100%'}}>
      <h1>Right Whale BBS</h1>
      <Link href="create"><h1>新しいスレッドを作成する</h1></Link>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
          <IndexScrollArea key="threads" entries={entries}></IndexScrollArea>
          <div style={{"width":"75%"}} key="right">
          <ThreadScrollArea thread={thread}></ThreadScrollArea>
          <PostForm thread_id={params.thread_id}></PostForm>
          </div>
      </div>

      </div>
  );
}
