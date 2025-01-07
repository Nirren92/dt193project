import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true,
});

const configService = new ConfigService();

export const constants = {
  secret: configService.get<string>('JWT_SECRET'),
};