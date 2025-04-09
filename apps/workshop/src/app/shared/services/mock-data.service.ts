/**
 *              Copyright (c) 2025 Visa, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const MockDataKeys: Record<string, string> = {
  getAgriProduce: 'agri-produce',
  getHeroes: 'heroes',
  getColData: 'col-data',
  getColData2: 'col-data-2',
  getRowData: 'row-data',
  getExtendedRowData: 'row-data-extended',
  getExtendedColData: 'col-data-extended',
  getLargeData: 'large-data-set'
};

export type MockDataKey = keyof typeof MockDataKeys;
@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  constructor(private http: HttpClient) {}

  public getAgriProduce(): Observable<any> {
    return this.http.get(`./assets/mock-data/agri-produce.json`);
  }

  public getHeroes(): Observable<any> {
    return this.http.get(`./assets/mock-data/heroes.json`);
  }

  public getColData(): Observable<any> {
    return this.http.get(`./assets/mock-data/col-data.json`);
  }
  public getColData2(): Observable<any> {
    return this.http.get(`./assets/mock-data/col-data-2.json`);
  }

  public getRowData(): Observable<any> {
    return this.http.get(`./assets/mock-data/row-data.json`);
  }
  public getExtendedRowData(): Observable<any> {
    return this.http.get(`./assets/mock-data/row-data-extended.json`);
  }
  public getExtendedColData(): Observable<any> {
    return this.http.get(`./assets/mock-data/col-data-extended.json`);
  }

  // large data set taken from https://github.com/json-iterator/test-data/blob/master/large-file.json
  public getLargeData(): Observable<any> {
    return this.http.get(`./assets/mock-data/large-data-set.json`);
  }
}
