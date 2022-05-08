import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../../common/__test__/TestUtil';
import { Users } from '../entities/users.entity';
import { FindUserByEmailService } from '../services/finduserbyemail.service';
import { mockRepository } from '../../common/__test__/mock.repository';

describe('FindOneService', () => {
  let service: FindUserByEmailService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserByEmailService>(FindUserByEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search All Users', () => {
    it('should find one user', async () => {
      const userr = TestUtil.giveAMeAValidUser();

      mockRepository.findOne.mockReturnValue(userr);
      const user = await service.exec(userr.email);

      expect(user).toEqual(userr);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return undefined', async () => {
      mockRepository.findOne.mockReturnValue(undefined);
      const user = await service.exec('inexistinguser@v.com');

      expect(user).toEqual(undefined);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
    });
  });
});
