import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../../common/__test__/TestUtil';
import { Users } from '../entities/users.entity';
import { FindAllUsersService } from '../services/findallusers.service';
import { mockRepository } from '../../common/__test__/mock.repository';

describe('FindAllUsersService', () => {
  let service: FindAllUsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FindAllUsersService>(FindAllUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search all users', () => {
    it('should find all users', async () => {
      const user = TestUtil.giveAMeAValidUser();

      mockRepository.find.mockReturnValue([user, user]);
      const users = await service.exec();

      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
