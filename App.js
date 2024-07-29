import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
//import PieChartStat from "./src/pages/PieChart";
import { NavigationContainer } from '@react-navigation/native';
//import TransactionList from "./src/pages/TransactionList";
import Tabs from './src/util/Tabs';
import CalendarGrid from "./src/components/CalendarGrid";

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
    /*<CalendarGrid></CalendarGrid>*/
  );
}