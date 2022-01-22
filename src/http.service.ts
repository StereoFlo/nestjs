import { Injectable } from '@nestjs/common';
import { HttpService as MainHttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map, retry, throwError } from 'rxjs';
import { BoardList } from './boardList';

@Injectable()
export class HttpService {
  constructor(private httpService: MainHttpService) {}

  getAll(): Promise<BoardList> {
    return firstValueFrom(
      this.httpService
        .get('https://2ch.hk/makaba/mobile.fcgi?task=get_boards')
        .pipe(
          map((response) => response.data),
          retry(3),
          catchError((error) => {
            return throwError(error);
          }),
        ),
    );
  }

  getThreadList(id: string): Promise<any> {
    return firstValueFrom(
      this.httpService.get(`https://2ch.hk/${id}/threads.json`).pipe(
        map((response) => response.data),
        retry(3),
        catchError((error) => {
          return throwError(error);
        }),
      ),
    );
  }

  getThread(id: string, num: number): Promise<any> {
    return firstValueFrom(
      this.httpService.get(`https://2ch.hk/${id}/res/${num}.json`).pipe(
        map((response) => response.data),
        retry(3),
        catchError((error) => {
          return throwError(error);
        }),
      ),
    );
  }
}