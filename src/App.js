import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "components";
import { VendingMachineContainer, Wallet, NotFound } from "pages";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { menuItem, walletItem } from "data";
import { BrowserRouter } from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  ${reset}
  font-family: 'Noto Sans KR';
  font-style: normal;
  button{
      background-color: transparent;
      border: none;
  }
  button:hover{
      cursor:pointer;
  }  
`;

export const MenuStockContext = React.createContext();
export const MoneyContext = React.createContext();
export const LogContext = React.createContext();
export const WalletContext = React.createContext();

function App() {
  const [menuStock, setMenuStock] = useState(menuItem);
  const [inputMoney, setInputMoney] = useState(0);
  const [logs, setLogs] = useState([{ idx: 1, type: "init", data: "~ this is vending machine ~" }]);
  const [walletMoney, setWalletMoney] = useState(walletItem);

  return (
    // TODO: Circular Dependency 문제 해결 -> context 분리 ...?
    <LogContext.Provider value={{ logs, setLogs }}>
      <WalletContext.Provider value={{ walletMoney, setWalletMoney }}>
        <MoneyContext.Provider value={{ inputMoney, setInputMoney }}>
          <MenuStockContext.Provider value={{ menuStock, setMenuStock }}>
            <GlobalStyles />
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<VendingMachineContainer />} />
                  <Route path="/vendingmachine" element={<VendingMachineContainer />} />
                  <Route path="/wallet" element={<Wallet />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </MenuStockContext.Provider>
        </MoneyContext.Provider>
      </WalletContext.Provider>
    </LogContext.Provider>
  );
}

export default App;
