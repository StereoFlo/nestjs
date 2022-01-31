import { Get, Controller, Render, Param } from '@nestjs/common';
import { HttpService } from '../service/http.service';

@Controller()
export class MainController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/favicon.ico')
  async favicon() {
    return { OK: '' };
  }

  @Get()
  @Render('index')
  async root() {
    return { message: await this.httpService.getAll() };
  }

  @Get(':id')
  @Render('thread-list')
  async getThreadList(@Param('id') id: string) {
    return { list: await this.httpService.getThreadList(id) };
  }

  @Get(':id/:num')
  @Render('thread-view')
  async getThread(@Param('id') id: string, @Param('num') num: number) {
    const posts = await this.httpService.getThread(id, num);
    const first = posts.posts[0];
    delete posts.posts[0];
    return {
      first,
      posts: posts.posts,
    };
  }
}
