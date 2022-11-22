import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post({ url, body }: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse;

    try {
      httpResponse = await axios.post(url, body);
    } catch (error) {
      httpResponse = error.response;
      console.log(error.message)
    }

    return {
      body: httpResponse.status,
      statusCode: httpResponse.data,
    };
  }
}
