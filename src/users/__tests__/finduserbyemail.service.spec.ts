import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../../common/__test__/TestUtil';
import { Users } from '../entities/users.entity';
import { FindUserByEmailService } from '../services/finduserbyemail.service';
import { mockRepository } from '../../common/__test__/mock.repository';
import { NotFoundException } from '@nestjs/common';

describe('FindUserByEmailService', () => {
  let service: FindUserByEmailService;

  beforeEach(async () => {
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

  describe('When search user by email', () => {
    it('should find one user', async () => {
      const userMock = TestUtil.giveAMeAValidUser();

      mockRepository.findOne.mockReturnValue(userMock);
      const userFound = await service.exec(userMock.email);

      expect(userFound).toEqual(userMock);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return null with NotFoundException', async () => {
      mockRepository.findOne.mockReturnValue(null);
      expect(service.exec('test@v.com')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
    });
  });
});
