let config = {
  PORT: 4000,
  MONGO: {
    MONGO_URL: (process.env.MONGO_URL || 'mongodb://localhost:27017/kanbanBoard')
  },
  toDoList: [{
    "id":1,
    "taskHead": "Backlog",
    "listItems": [{
      "id":1,
      "taskName": "Stack Route",
    },
    {
      "id":2,
      "taskName": "Learn Redux",
    }]
  },{
    "id":2,
    "taskHead": "Doing",
    "listItems": [{
      "id":3,
      "taskName": "Learning React",
    },
    {
      "id":4,
      "taskName": "Learn Graphql",
    }]
  },
  {
    "id":3,
    "taskHead": "Done",
    "listItems": [{
      "id":5,
      "taskName": "Redux Training",
    },
    {
      "id":6,
      "taskName": "Node Training",
    }]
  }]
}

module.exports = config;