
export async function streamToString(stream: any) {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf8');
  }
  
export async function QueryStringToDict(queryString:string){
        const searchParams = new URLSearchParams(queryString);
        let queryEntries = searchParams.entries();
        let queryParamsObject = Object.fromEntries(queryEntries);
        return queryParamsObject;
  }