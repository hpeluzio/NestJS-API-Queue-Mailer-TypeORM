import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../../common/__test__/TestUtil';
import { Users } from '../entities/users.entity';
import { CheckEmailService } from '../services/checkemail.service';
import { mockRepository } from '../../common/__test__/mock.repository';
import { HttpException } from '@nestjs/common';

describe('CheckEmailService', () => {
  let service: CheckEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckEmailService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CheckEmailService>(CheckEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search user by email', () => {
    it('should find one user and return NotFoundException', async () => {
      mockRepository.findOne.mockReturnValue(null);
      expect(service.exec('test@v.com')).rejects.toBeInstanceOf(HttpException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return resultDto', async () => {
      mockRepository.findOne.mockReturnValue(null);
      const result = await service.exec('wherever@email.com');

      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('available', true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
    });
  });
});
