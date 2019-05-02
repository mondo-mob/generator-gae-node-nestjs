import { instance, mock, when } from 'ts-mockito';
import { LoginIdentifierRepository, Context } from '@3wks/gae-node-nestjs';
import { DEFAULT_USER, DEFAULT_USER_ID, testContext } from '../../_spec/test-helpers';
import { UserRepository } from '../users.repository';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let test: UsersService;
  const userRepository = mock(UserRepository);
  const loginIdentifierRepository = mock(LoginIdentifierRepository);
  let context: Context;

  beforeEach(() => {
    context = testContext();
    test = new UsersService(instance(loginIdentifierRepository), instance(userRepository));
  });

  describe('get', () => {
    it('should return undefined when userID not requested', async () => {
      const result = await test.get(context, undefined);

      expect(result).toBe(undefined);
    });

    it('should return user when userID requested and found', async () => {
      when(userRepository.get(context, DEFAULT_USER_ID)).thenResolve(DEFAULT_USER);

      const result = await test.get(context, DEFAULT_USER_ID);

      expect(result).toBe(DEFAULT_USER);
    });

    it('should return undefined when userID requested and not found', async () => {
      when(userRepository.get(context, DEFAULT_USER_ID)).thenResolve(undefined);

      const result = await test.get(context, DEFAULT_USER_ID);

      expect(result).toBe(undefined);
    });
  });
});
