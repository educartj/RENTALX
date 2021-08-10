import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password Incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password Incorrect');
    }

    const token = sign({}, '64e000bc079c01b976a928a003d0b1575cc98f68', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };