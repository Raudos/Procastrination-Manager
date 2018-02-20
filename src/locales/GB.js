export default {
  header: {
    TimerCreator: "Creator",
    TagCreator: "Creator",
    BreakCreator: "Creator",
    Timers: "My Data",
    Tags: "My Data",
    Breaks: "My Data"
  },
  modeChanger: {
    TimerCreator: "Timer",
    TagCreator: "Tag",
    BreakCreator: "Break",
    Timers: "Timers",
    Tags: "Tags",
    Breaks: "Breaks",
    UpdateIcon: "Icon",
    UpdateColor: "Color"
  },
  tooltips: {
    creation: {
      TimerCreator: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      BreakCreator: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      TagCreator: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  },
  update: {
    updateTimer: {
      name: {
        header: "Update name of your Timer",
        placeholder: "Name cannot be empty",
        submit: "Save changes"
      },
      icon: {
        filter: "Search by name ...",
        submit: "Save changes"
      },
      tagsNBreaks: {
        headers: {
          tags: "Update tags of your Timer",
          breaks: "Update breaks of your Timer"
        },
        submit: "Save changes"
      }
    },
    updateTag: {
      name: {
        header: "Update name of your Tag",
        placeholder: "Name cannot be empty",
        submit: "Save changes"
      },
      icon: {
        filter: "Search by name ...",
        submit: "Save changes"
      }
    },
    updateBreak: {
      name: {
        header: "Update name of your Break",
        placeholder: "Name cannot be empty",
        submit: "Save changes"
      },
      timePicker: {
        header: "Change duration of your Break",
        hours: "Hours",
        minutes: "Minutes"
      },
      icon: {
        filter: "Search by name ...",
        submit: "Save changes"
      }
    }
  },
  creation: {
    TimerCreator: {
      name: {
        header: "Name",
        placeholder: "Enter name of your new Timer",
        submit: "Pick an Icon"
      },
      icon: {
        header: "Pick an icon for your new Timer",
        filter: "Search by name ...",
        submit: "Add Breaks and Tags"
      },
      tagsNBreaks: {
        headers: {
          tags: "Tags",
          breaks: "Breaks"
        },
        submit: "Finish"
      }
    },
    TagCreator: {
      name: {
        header: "Name",
        placeholder: "Enter name of your new Tag",
        submit: "Pick an Icon"
      },
      icon: {
        header: "Pick an icon for your new Tag",
        filter: "Search by name ...",
        submit: "Finish"
      }
    },
    BreakCreator: {
      name: {
        header: "Name",
        placeholder: "Enter name of your new Break",
        submit: "Pick an Icon",
      },
      timePicker: {
        header: "Choose duration of your Break",
        hours: "Hours",
        minutes: "Minutes"
      },
      icon: {
        header: "Pick an icon for your new Break",
        filter: "Search by name ...",
        submit: "Finish"
      }
    }
  },
  data: {
    timers: {
      list: {
        sorting: {
          Activity: "Last Activity",
          Name: "Name",
          Duration: "Duration"
        }
      },
      breaks: {
        header: "BREAKS",
        duration: "Duration",
        placeholder: {
          noData: "It seems that you have no Breaks, would you like to create a new one?",
          data: "It seems that this Timer has no Breaks. Use edit button in the top right corner to add one."
        }
      },
      name: {
        header: "NAME"
      },
      tags: {
        header: "TAGS",
        placeholder: {
          noData: "It seems that you have no Tags, would you like to create a new one?",
          data: "It seems that this Timer has no Tags. Use edit button in the top right corner to add one."
        }
      },
      timestamps: {
        headers: {
          normal: "LAST ACTIVITY",
          active: "LAST ACTIVITY"
        },
        placeholder: "No recorded activities."
      },
      statistics: {
        activityDura: "Activities duration",
        breakDura: "Breaks duration",
        started: "Started at",
        avgDura: "Average Activity duration: ",
        avgBreak: "Average Break duration: ",
        chartHeader: "Breaks and Activities duration"
      }
    },
    tags: {

    },
    breaks: {
      list: {
        duration: "Duration"
      },
      name: {
        header: "NAME"
      },
      duration: {
        header: "Duration"
      },
      timers: {
        header: `Timers using this`,
        tags: "Tag",
        breaks: "Break",
        placeholder: {
          noData: "It seems that you have no Timers, would you like to create a new one?",
          data: {
            tags: "It seems that this Tag was not added to any Timers.",
            breaks: "It seems that this Break was not added to any Timers."
          }
        }
      }
    }
  },
  loader: {
    text: "Retrieving User Data"
  },
  error: {
    text: "Unexpected error occured, please try restarting your application"
  },
  statistics: {
    tagsDura: "Duration for each of the Tags added to Timers",
    breaksPercentage: "Break duration percentage",
    activitiesDura: "Duration of all Activities",
    activitiesWithBreaksDura: "Duration of all Activities without Breaks"
  },
  calendar: {
    placeholder: "What a uneventful day ...",
    loading: "Loading ...",
    started: "Started at:",
    duration: "Duration:"
  },
  options: {
    language: {
      header: "Chosen language"
    },
    deleteData: "Delete all User data",
    restoreDefault: "Reset to default data"
  },
  tabs: {
    timers: "Timers",
    tags: "Tags",
    breaks: "Breaks",
    details: "Details",
    stats: "Statistics"
  },
  start: {
    welcome: "Welcome",
    in: "to application",
    introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    timer: {
      header: "Timers",
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    break: {
      header: "Breaks",
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    tag: {
      header: "Tags",
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  },
  navigation: {
    List: "My Data",
    Creator: "Creator",
    Calendar: "Calendar",
    Statistics: "Statistics",
    Options: "Options"
  }
};
