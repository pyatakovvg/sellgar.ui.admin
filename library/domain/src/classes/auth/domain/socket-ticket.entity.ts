import { Expose } from 'class-transformer';
import { IsDateString, IsString } from 'class-validator';

export class SocketTicketEntity {
  @Expose()
  @IsString()
  ticket: string;

  @Expose()
  @IsDateString()
  expiresAt: string;
}
