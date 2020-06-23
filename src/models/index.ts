import Admin, {AdminModelStatic} from './Admin';
import User, {UserModelStatic} from './User';


export default {
    Admin,
    User,
};

export interface ModelType {
    Admin: AdminModelStatic;
    User: UserModelStatic;
}
