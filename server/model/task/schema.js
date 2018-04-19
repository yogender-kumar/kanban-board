const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const KanBanBoard = new Schema({
  userId:{type: String, required: true},
  taskId:{ type:String, required:true},
  taskHead: {type: String, required: true},
  listItems:[{
    listId:{type: String, required:true},
    taskName: {type: String, required: true}
  }]
}, { usePushEach: true });

export default mongoose.model('kanbanboardData', KanBanBoard);