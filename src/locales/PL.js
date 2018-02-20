export default {
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
        header: "Zmien nazwę Timera",
        placeholder: "Nazwa nie może być pusta!",
        submit: "Zapisz zmiany"
      },
      icon: {
        filter: "Wyszukaj po nazwie ...",
        submit: "Zapisz zmiany"
      },
      tagsNBreaks: {
        headers: {
          tags: "Zmień Etykiety wybranego Timera",
          breaks: "Zmień Przerwy wybranego Timera"
        },
        submit: "Zapisz zmiany"
      }
    },
    updateTag: {
      name: {
        header: "Zmień nazwę Etykiety",
        placeholder: "Nazwa nie może być pusta!",
        submit: "Zapisz zmiany"
      },
      icon: {
        filter: "Search by name ...",
        submit: "Zapisz zmiany"
      }
    },
    updateBreak: {
      name: {
        header: "Zmień nazwę Przerwy",
        placeholder: "Nazwa nie może być pusta!",
        submit: "Zapisz zmiany"
      },
      timePicker: {
        header: "Zmień czas trwania Przerwy",
        hours: "Godziny",
        minutes: "Minuty"
      },
      icon: {
        filter: "Wyszukaj po nazwie ...",
        submit: "Zapisz zmiany"
      }
    }
  },
  creation: {
    TimerCreator: {
      name: {
        header: "Nazwa",
        placeholder: "Wpisz nazwę dla nowego Timera",
        submit: "Wybierz ikonę"
      },
      icon: {
        header: "Wybierz ikonę dla nowego Timera",
        filter: "Wyszukaj po nazwie ...",
        submit: "Dodaj Przerwy i Etykiety"
      },
      tagsNBreaks: {
        headers: {
          tags: "Etykiety",
          breaks: "Przerwy"
        },
        submit: "Zakończ"
      }
    },
    TagCreator: {
      name: {
        header: "Nazwa",
        placeholder: "Wpisz nazwę dla nowej Etykiety",
        submit: "Wybierz ikonę"
      },
      icon: {
        header: "Wybierz ikonę dla nowej Etykiety",
        filter: "Wyszukaj po nazwie ...",
        submit: "Zakończ"
      }
    },
    BreakCreator: {
      name: {
        header: "Nazwa",
        placeholder: "Wpisz nazwę dla nowej Przerwy",
        submit: "Wybierz ikonę",
      },
      timePicker: {
        header: "Ustaw czas trwania Przerwy",
        hours: "Godziny",
        minutes: "Minuty"
      },
      icon: {
        header: "Wybierz ikonę dla nowej Przerwy",
        filter: "Wyszukaj po nazwie ...",
        submit: "Zakończ"
      }
    }
  },
  data: {
    timers: {
      list: {
        sorting: {
          Activity: "Ostatnia Aktywność",
          Name: "Nazwa",
          Duration: "Czas trwania"
        }
      },
      breaks: {
        header: "Przerwy",
        duration: "Czas trwania",
        placeholder: {
          noData: "Wygląda na to, że nie masz żadnych Przerw, czy chciałbyś jakąś stworzyć?",
          data: "Wygląda na to, że ten Timer nie ma dodanych żadnych Przerw. Użyj przycisku edycji w prawym górnym rogu, aby je dodać."
        }
      },
      tags: {
        header: "Etykiety",
        placeholder: {
          noData: "Wygląda na to, że nie masz żadnych Etykiety, czy chciałbyś jakąś stworzyć?",
          data: "Wygląda na to, że ten Timer nie ma żadnych Etykiet. Uzyj przycisku edycji w prawym górnym rogu, aby je dodać."
        }
      },
      timestamps: {
        headers: {
          normal: "Ostatnia Aktywność",
          active: "Ostatnia Aktywność"
        },
        placeholder: "Brak zapisanych Aktywności"
      },
      statistics: {
        activityDura: "Czas trwania Aktywności",
        breakDura: "Czas trwania Przerw",
        started: "Czas rozpoczęcia",
        avgDura: "Średni czas trwania Aktywności:",
        avgBreak: "Średni czas trwania Przerwy",
        chartHeader: "Czas trwania Aktywności oraz Przerw"
      }
    },
    tags: {

    },
    breaks: {
      list: {
        duration: "Czas trwania"
      },
      name: {
        header: "Nazwa"
      },
      duration: {
        header: "Czas trwania"
      },
      timers: {
        header: `Timery używające tą`,
        tags: "Etykietę",
        breaks: "Przerwę",
        placeholder: {
          noData: "Wygląda na to, że nie masz stworzonych żadnych Timerów, czy chciałbyś jakiś stworzyć?",
          data: {
            tags: "Wygląda na to, że dana Etykieta nie była dodana do żadnego Timerów.",
            breaks: "Wygląda na to, że dana Przerwa nie była dodana do żadnego Timera."
          }
        }
      }
    }
  },
  loader: {
    text: "Ładowanie danych użytkownika"
  },
  error: {
    text: "Wystąpił niespodziewany błąd, proszę zrestartować aplikację"
  },
  statistics: {
    tagsDura: "Czas trwania wszystkich Aktywności względem Etykiet",
    breaksPercentage: "Odsetek długości Przerw",
    activitiesDura: "Czas trwania wszystkich Aktywności",
    activitiesWithBreaksDura: "Czas trwania wszystkich Aktywności bez odliczania czasu Przerw"
  },
  calendar: {
    placeholder: "Cóż za monotonny dzień ...",
    loading: "Trwa ładowanie danych ...",
    started: "Czas rozpoczęcia:",
    duration: "Czas trwania:"
  },
  options: {
    language: {
      header: "Wybrany język"
    },
    deleteData: "Wykasuj wszystkie dane użytkownika",
    restoreDefault: "Zresetuj do danych domyślnych"
  },
  tabs: {
    timers: "Timery",
    tags: "Etykiety",
    breaks: "Przerwy",
    details: "Detale",
    stats: "Statystyki"
  },
  start: {
    welcome: "Witam",
    in: "w aplikacji",
    introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    timer: {
      header: "Timery",
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    break: {
      header: "Przerwy",
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    tag: {
      header: "Etykiety",
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  },
  navigation: {
    List: "Moje Dane",
    Creator: "Kreator",
    Calendar: "Kalendarz",
    Statistics: "Statystyki",
    Options: "Opcje"
  }
};
