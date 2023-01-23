import { Controller, Inject, Get, Req, Post, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/v1/users')
export class UserController {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
    ) { }

    @Post('/')
    async createUser(@Req() data: any): Promise<any> {
        return this.userService.createUser(data.body)
    }


    @Post('/login')
    async loginUser(@Req() data: any): Promise<any> {
        return this.userService.login(data.body);
    }


    @Get('/:userId')
    async fetchUserById(@Req() req: any): Promise<any> {
        return this.userService.fetchUsersById(req.params)
    }


    @Put('/:userId')
    async updateUser(@Req() data: any): Promise<any> {
        return this.userService.updateUser({ ...data.params, ...data.body});
    }

    @Put('/suspend/:userId')
    async toggleUserSuspension(@Req() data: any): Promise<any> {
        return this.userService.toggleUserSuspension({...data.params, ...data.body})
    }

    @Post('/reset-password')
    async resetPassword(@Req() req: any): Promise<any> {
      return this.userService.resetPassword(req.body.token, req.body.password);
    }
}