'use server'
import Image from "next/image";
import { IndexScrollArea } from "@/components/thread_scroll";
import { ThreadScrollArea } from "@/components/post_scroll";
import { NextResponse } from "next/server";
import { get_entry } from "@/actions/entry";
import { Entry, Thread } from "@/constants";
import { get_thread } from "@/actions/thread"
import { ThreadForm } from "@/components/thread_form";
import Link from "next/link";

export default async function Home() {

  return (
      <div style={{width: '100%'}}>
      <h1>新しいスレを作る</h1>
      <ThreadForm></ThreadForm>
      <Link href="/"><h1>ホームへ戻る</h1></Link>
      </div>
  );
}
