"use client";

import React, { useState } from "react";
import { MainLayout } from "./components/MainLayout";
import { DEFAULT_BASE_URL } from "./constants";

export default function ExpenseExpertPage() {
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL);

    const toggleAddExpense = () => setShowAddExpense(!showAddExpense);
    const toggleSettings = () => setShowSettings(!showSettings);
    const handleBaseUrlChange = (url: string) => setBaseUrl(url);

    return (
        <MainLayout
            showAddExpense={showAddExpense}
            showSettings={showSettings}
            baseUrl={baseUrl}
            onToggleAddExpense={toggleAddExpense}
            onToggleSettings={toggleSettings}
            onBaseUrlChange={handleBaseUrlChange}
        />
    );
}
