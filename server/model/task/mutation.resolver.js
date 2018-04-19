import config from '../../config';
import KanBanBoard from './schema';
import { v4 } from 'uuid';

export default {
  Mutation: {
    AddupdateTaskBoard: (_, args) => {
      KanBanBoard.findOne({taskHead: args.taskHead})
      .then(task => {
        if(args.isAddMutation === 'ADD_VALUE') {
          args.listItems[0]['listId'] = v4();
          task.listItems.push(args.listItems[0]);
        } else {
          let lstItmIdx = task.listItems.findIndex(listItm => listItm.listId === args.listItems[0].listId)
          task.listItems[lstItmIdx]['taskName'] = args.listItems[0].taskName;
        }
        task.save();
      })
      .catch(err => {throw new Error(err)})
      .finally(()=> {
        KanBanBoard.find({}, (err, data) => {
          return data;
        });
      });
    },
    AddNewList: (_, args) => {
      return KanBanBoard.create({
          "userId": args.userId || "Sapient",
          "taskId":v4(),
          "taskHead": args.taskHead
      }, (err,data) => {
        if(err) {
          console.log(err);
        }
        return data;
      });
    }
  }
}