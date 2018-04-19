import config from '../../config';
import KanBanBoard from './schema';

export default {
  Query:{
    getTaskBoard: (_, args) => {
      return KanBanBoard.find({userId: args.userId}, (err, data) => {
        if(err) {
          console.log(`There is an error ${err}`);
        }
        return data;
      });
    }
  }
}