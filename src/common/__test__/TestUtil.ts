import { Users } from '../../users/entities/users.entity';
import { Role } from '../../users/entities/constants/role.enum';
import { Subscription } from '../../users/entities/constants/subscription.enum';

export default class TestUtil {
  static giveAMeAValidUser(): Users {
    const user = new Users();
    user.email = 'h@v.com';
    user.id = 1;
    user.role = Role.ADMIN;
    user.subscription = Subscription.SUBSCRIBED;
    return user;
  }
}
