import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)private readonly userRepository : Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async findOne(loginAuthDto: LoginAuthDto) {
        const user = await this
            .userRepository
            .find({
                where: {
                    email: loginAuthDto.email,
                    password: loginAuthDto.password
                },
            });
        
        if(user.length === 0){
            throw new NotFoundException(`Email or password are not correct`);
        }

        return user
    }

    async login(loginAuthDto: LoginAuthDto) {
        const userExist = await this.findOne(loginAuthDto)
        const payload = { username: loginAuthDto.email, sub: loginAuthDto.password };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async fillSeedUser(createAuthDto: CreateAuthDto) {
        const user = this.userRepository.create(createAuthDto);
        await this.userRepository.save(user);

        return 'User created';
    }
}
