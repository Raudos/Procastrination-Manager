import shortid from "shortid";

const Tag1 = {
  id: "tag-1",
  name: "Work",
  icon: {
    icon: "worker",
    type: "material-community"
  },
  timers: []
};

const Tag2 = {
  id: "tag-2",
  name: "Fun",
  icon: {
    icon: "cards-playing-outline",
    type: "material-community"
  },
  timers: []
};

const Tag3 = {
  id: "tag-3",
  name: "Hobby",
  icon: {
    icon: "airballoon",
    type: "material-community"
  },
  timers: []
};

const Tag4 = {
  id: "tag-4",
  name: "Health",
  icon: {
    icon: "hospital",
    type: "material-community"
  },
  timers: []
};

const Tag5 = {
  id: "tag-5",
  name: "Education",
  icon: {
    icon: "book-open-page-variant",
    type: "material-community"
  },
  timers: []
};

const Tag6 = {
  id: "tag-6",
  name: "Excersises",
  icon: {
    icon: "football-australian",
    type: "material-community"
  },
  timers: []
};

const Tags = [Tag1, Tag2, Tag3, Tag4, Tag5, Tag6];

const Break1 = {
  id: "break-1",
  name: "Toilet",
  time: 2 * 60,
  icon: {
    icon: "biohazard",
    type: "material-community"
  },
  timers: []
};

const Break2 = {
  id: "break-2",
  name: "Long Break",
  time: 15 * 60,
  icon: {
    icon: "chair-school",
    type: "material-community"
  },
  timers: []
};

const Break3 = {
  id: "break-3",
  name: "Short Break",
  time: 5 * 60,
  icon: {
    icon: "camera-timer",
    type: "material-community"
  },
  timers: []
};

const Break4 = {
  id: "break-4",
  name: "Food Break",
  time: 20 * 60,
  icon: {
    icon: "food-apple",
    type: "material-community"
  },
  timers: []
};

const Breaks = [Break1, Break2, Break3, Break4];

const timers = [
  {
    name: "Education",
    icon: {
      icon: "school",
      type: "material-community"
    },
    tags: [1, 2, 5]
  }, {
    name: "Job Hunting",
    icon: {
      icon: "worker",
      type: "material-community"
    },
    tags: [1, 5]
  }, {
    name: "Other Excersises",
    icon: {
      icon: "human-greeting",
      type: "material-community"
    },
    tags: [4, 6]
  }, {
    name: "Swimming pool",
    icon: {
      icon: "swim",
      type: "material-community"
    },
    tags: [4, 6]
  }, {
    name: "Bike",
    icon: {
      icon: "bike",
      type: "material-community"
    },
    tags: [4, 6]
  }, {
    name: "Archery",
    icon: {
      icon: "arrow-bottom-right",
      type: "material-community"
    },
    tags: [2, 3, 4, 6]
  }, {
    name: "Painting Miniatures",
    icon: {
      icon: "format-paint",
      type: "material-community"
    },
    tags: [2, 3]
  }, {
    name: "Coding, side projects",
    icon: {
      icon: "code-braces",
      type: "material-community"
    },
    tags: [1, 2, 3, 5]
  }, {
    name: "Guild Wars 2",
    icon: {
      icon: "gamepad-variant",
      type: "material-community"
    },
    tags: [2, 3]
  }, {
    name: "Rainbow 6 Siege",
    icon: {
      icon: "bomb",
      type: "material-community"
    },
    tags: [2, 3]
  }
];

function createTimestamps() {
  function Timestamp(start, end) {
    const duration = end - start;

    this.start = start;
    this.end = end;
    // if break duration goes into negative value some charts will die, better play it safe
    this.usedBreaks = [{
      start: start + (duration / 4),
      end: end - (duration / 4)
    }];
    this.id = shortid.generate();
  };

  const today = Math.round(new Date().getTime() / 1000);
  const timestamps = [];
  const day = 24 * 60 * 60;
;
  for (let i = 0; i < 10; i ++) {
    let randomEnd = Math.floor(Math.random() * 3000);
    let randomStart = Math.floor(Math.random() * 100);
    timestamps.push(new Timestamp(today - (day * i) + randomStart, today - (day * i) + randomEnd));
  }

  return timestamps;
};

function Timer({ name, icon, tags }) {
  this.id = shortid.generate();
  this.name = name;
  this.icon = icon;
  this.tags = tags.map(int => `tag-${int}`);
  this.breaks = ['break-1', 'break-2', 'break-3', 'break-4'];
  this.timestamps = createTimestamps();
};

function seedTimers() {
  return timers.map(obj => new Timer(obj));
};

function seedRest(timers, dataArr, key) {
  return dataArr.map(obj => {
    return {
      ...obj,
      timers: timers.map(timer => {
        if (timer[key].includes(obj.id)) {
          return timer.id
        }

        return null;
      }).filter(id => id)
    }
  })
};

const transformedTimers = seedTimers();
const transformedBreaks = seedRest(transformedTimers, Breaks, "breaks");
const transformedTags = seedRest(transformedTimers, Tags, "tags");

export default {
  tags: transformedTags,
  breaks: transformedBreaks,
  timers: transformedTimers,
  options: {
    lang: "GB",
    showTooltips: true
  }
};
