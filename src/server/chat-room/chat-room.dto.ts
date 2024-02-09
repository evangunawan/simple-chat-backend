import { IsString } from 'class-validator';

export class GenerateChatTokenDto {
  @IsString()
  public clientId: string;
}
