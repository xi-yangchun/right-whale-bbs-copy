import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Post } from "@/constants"
import { Separator } from "./ui/separator"

export default function PostCard(props:{post:Post}){
    return(
        <Card style={{backgroundColor:"#1A1A1A", color:"#FFFFFF",
            borderColor:"#777777"}}>
            <CardContent>
                <p>　</p>
                <p><b>{props.post.id}：投稿者：</b>{props.post.name}</p>
                <Separator className="my-2" style={{backgroundColor:"#777777"}}/>
                <p><b>本文：</b></p>
                <p>{props.post.content}</p>
                <Separator className="my-2" style={{backgroundColor:"#777777"}}/>
                <p><b>投稿時刻：</b>{props.post.datetime.toISOString()}</p>
            </CardContent>
        </Card>
    )
}