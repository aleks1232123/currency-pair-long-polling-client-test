import { useMemo } from "react";
import { URL } from "../constants";

export const useSubscriptions = (sources) => {
  return useMemo(() => {
    const subscriptions = sources.map((source) => ({
      listener: () => {},
      source,
      setListener(listener) {
        //добавление функции-слушателя данных с api
        this.listener = listener;
        this.listener(source);
      },
      removeListener(listener) {
        this.listener = () => {};
      },
      poll() {
        //получение данных с ручки */poll и запуск снова после получения ответа (поллинг)
        fetch(`${URL}/${this.source}/poll`)
          .then((response) => {
            if (response.ok) {
              this.listener(this.source);
              return true;
            }
            throw new Error("Data fetching error from */poll");
          })
          .then(() => this.poll())
          .catch((error) => console.log(error.message));
      },
    }));

    subscriptions.forEach((sub) => sub.poll());

    return subscriptions;
  }, [sources]);
};
