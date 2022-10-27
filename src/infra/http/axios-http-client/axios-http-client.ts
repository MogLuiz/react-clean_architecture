import { HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post({ url, body }: HttpPostParams<any>): Promise<HttpResponse<any>> {
   const { data, status } = await axios.post(url, body);

   return {
    body: data,
    statusCode: status
   }
  }
}
