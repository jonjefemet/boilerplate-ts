import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../src/auth.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/hello (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth/hello')
      .expect(200)
      .expect('Hello from Auth Service!');
  });
});
