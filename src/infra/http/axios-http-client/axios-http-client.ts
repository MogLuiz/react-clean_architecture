import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post({ url, body }: HttpPostParams<any>): Promise<HttpResponse<any>> {
    try {
      const { data, status } = await axios.post(url, body);
      return {
        body: data,
        statusCode: status,
      };
    } catch (error) {
      return {
        body: error.response.data,
        statusCode: error.response.status,
      };
    }
  }
}
