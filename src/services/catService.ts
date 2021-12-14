import { inject, injectable } from "tsyringe";
import { AppConfig } from "@/services/appConfig";
import axios from "axios";
import { Cat } from "@/types/cats";

@injectable()
export class CatService {
  constructor(@inject(AppConfig) private appConfig: AppConfig) {}

  async createCat(name: string, breedId: number) {
    return await axios.post(`${this.appConfig.apiUrl}v1/cats`, {
      name,
      breedId,
    });
  }

  async getCats(): Promise<Array<Cat>> {
    return (await axios.get(`${this.appConfig.apiUrl}v1/cats`)).data.data;
  }

  async getCat(id: number): Promise<Cat> {
    return (await axios.get(`${this.appConfig.apiUrl}v1/cats/${id}`)).data.data;
  }

  async updateCat(id: number, name: string, breedId: number) {
    return await axios.put(`${this.appConfig.apiUrl}v1/cats/${id}`, {
      name,
      breedId,
    });
  }

  async getBreeds() {
    return (await axios.get(`${this.appConfig.apiUrl}v1/breeds/list`)).data
      .data;
  }
}
