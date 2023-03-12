import {
  Controller,
  Inject,
  Get,
  Req,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/v1')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Post('/users')
  async createUser(@Req() data: any): Promise<any> {
    return this.userService.createUser(data.body);
  }

  @Post('/login')
  async loginUser(@Req() data: any): Promise<any> {
    return this.userService.login(data.body);
  }

  @Get('/users/:userId')
  async fetchUserById(@Req() req: any): Promise<any> {
    return this.userService.fetchUsersById(req.params);
  }

  @Put('/users/:userId')
  async updateUser(@Req() data: any): Promise<any> {
    return this.userService.updateUser({ ...data.params, ...data.body });
  }

  @Put('/users/suspend/:userId')
  async toggleUserSuspension(@Req() data: any): Promise<any> {
    return this.userService.toggleUserSuspension({
      ...data.params,
      ...data.body,
    });
  }

  @Post('/reset-password')
  async resetPassword(@Req() req: any): Promise<any> {
    return this.userService.resetPassword(req.body.token, req.body.password);
  }

  @Post('/change-password')
  async changePassword(@Req() req: any): Promise<any> {
    return this.userService.changePassword(req.body);
  }

  @Get('/reset-password/validate-link')
  async validateLink(@Req() req: any): Promise<any> {
    return this.userService.validateLink(req.query.token);
  }

  @Post('/roles')
  async createRole(@Req() data: any): Promise<any> {
    return this.userService.createRole(data.body);
  }

  @Put('/roles/:id')
  async updateRole(@Req() data: any): Promise<any> {
    return this.userService.updateRole({ ...data.body, ...data.params });
  }

  @Delete('/roles/:roleId')
  async deleteRole(@Req() data: any): Promise<any> {
    return this.userService.deleteRole(data.params);
  }

  @Get('/roles/:id')
  async fetchRole(@Req() data: any): Promise<any> {
    return this.userService.fetchRole(data.params);
  }

  @Get('/roles')
  async fetchRoles(@Req() data: any): Promise<any> {
    return this.userService.fetchRoles();
  }

  @Get('/auth/authenticated-user')
  async fetchAuthUser(@Req() data: any): Promise<any> {
    return this.userService.fetchAuthUser({ ...data.query });
  }

  @Post('/auth/forgot-password')
  async sendResetPasswordToken(@Req() data: any): Promise<any> {
    return this.userService.sendResetPasswordToken(data.body.email);
  }
}
