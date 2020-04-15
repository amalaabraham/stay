import { Body, Controller, Get, Request, Logger, Post, UseGuards, Put } from '@nestjs/common';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ChangePasswordDto,ResetPasswordDto } from './dto';
import { AuthGuard } from '@nestjs/passport';


@ApiUseTags('Auth Management')
@Controller('api/v1/auth')
export class AuthController {
  private logger = new Logger('Auth Controller');
  constructor(private readonly authService: AuthService) {
  }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('user')
    getUser(@Request() req: any) {
      this.logger.verbose(`User Retrieved `);
      return this.authService.getUser(req);
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('all-users')
    getAllUsers() {
      this.logger.verbose(`User retrieving all users `);
      return this.authService.getAllUsers();
    }
  
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Body() loginDto:LoginDto) {
      this.logger.verbose(`user Logged in ${loginDto.email}`);
      return this.authService.login(loginDto);
    }
  
  
    @Post('register')
    register(@Body() registerDto: RegisterDto):Promise<any>{
      return this.authService.register(registerDto);
    }
  
  
  @UseGuards(AuthGuard('jwt'))
  @Put('change-password')
  changePass(@Request() req: any, @Body() changePasswordDto: ChangePasswordDto){
    this.logger.verbose("Password Changed Successfully");
    return this.authService.changePassword(req.user,changePasswordDto);
  }

  @Put('reset-password')
  resetPass(@Request() req: any,@Body() resetPasswordDto: ResetPasswordDto){
    this.logger.verbose("Password Reset Successfully");
    return this.authService.resetPass(req.user,resetPasswordDto);
  }

}
