import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { Table } from "./components/Table/Table";
import { useSubscriptions } from "./hooks/useSubscriptions";
import { SOURCES, URL } from "./constants";
import styles from "./styles.css";
// const currencyOrderArr = ["RUB", "USD", "EUR"];

export const App = () => {
  const [rates, setRates] = useState([
    { RUB: null, USD: null, EUR: null },
    { RUB: null, USD: null, EUR: null },
    { RUB: null, USD: null, EUR: null },
  ]);

  const subscriptions = useSubscriptions(SOURCES); //список источников-подписок для получения данных

  useEffect(() => {
    //функция для получения данных с api и обновления состояния компонента
    const listenPolling = (input) => {
      fetch(`${URL}/${input}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Data fetching error");
        })
        .then((data) => {
          setRates((currentState) => {
            const newState = [...currentState];
            const index = SOURCES.indexOf(input);
            newState[index] = data.rates;
            return newState;
          });
        })
        .catch((error) => console.log(error.message));
    };

    subscriptions.forEach((sub) => {
      sub.setListener(listenPolling);
    });

    return () => {
      subscriptions.forEach((sub) => {
        sub.removeListener(listenPolling);
      });
    };
  }, [subscriptions]);

  return (
    <div className={styles.tableContainer}>
      <Table data={rates} />
    </div>
  );
};
