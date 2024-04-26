class Post{
    id:number=0;
    name:string="";
    content:string="";
    datetime:Date=new Date();
    is_tripped:boolean=false;
    replies:number[]=[];
    constructor(id:number,name:string,content:string,datetime:Date,
        is_tripped:boolean,replies:number[]){
            this.id=id;
            this.name=name;
            this.content=content;
            this.datetime=datetime;
            this.is_tripped=is_tripped;
            this.replies=replies
        }
}

class Thread{
    id:string="";
    title:string="";
    posts:Post[]=[];
    constructor(id:string,title:string,posts?:Post[]){
        this.id=id;
        this.title=title;
        this.posts=posts||[];
    }
}

class Entry{
    id:string="";
    title:string="";
    num_posts:number=0;
    datetime_last_post:Date=new Date();
    constructor(id:string,title:string,num_posts:number,
        datetime_last_post:Date){
            this.id=id;
            this.title=title;
            this.num_posts=num_posts;
            this.datetime_last_post=datetime_last_post;
    }
}

export {Post,Thread,Entry}