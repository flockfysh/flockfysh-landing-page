import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

// #region Page Imports

import PageNotFound from './pages/pageNotFound/pageNotFound';

import HypePage from './pages/hype/hype';
import LoginPage from './pages/login/login';
import Docs from './pages/docs/docs';
import Blog from './pages/blog/blog';
import About from './pages/about/about';
import PrivacyPage from './pages/privacy/privacy';
import TermsPage from './pages/terms/terms';
import Profile from './pages/profile/profile';
import Authorize from './pages/authorize/authorize';

import ViewDatasets from './pages/viewDatasets/viewDatasets';
import EachDataset from './pages/eachDataset/eachDataset';
import CreateDataset from './pages/createDataset/createDataset';

// #endregion

import RootLayout from './components/rootLayout';
import PrivateRoutes from './components/privateRoutes';

import { UserWrapper } from './contexts/userContext';
import { ScreenWrapper } from './contexts/screenContext';
import { EmotionCacheProvider } from './contexts/reactSelectContext';

import './index.css';
import { ErrorWrapper } from './contexts/errorContext';
import Background from './components/hypePage/background/background';
import Tester from './pages/tester/tester';
import NotificationWrapper from './contexts/notificationContext';
import TopLevelErrorBoundary from './contexts/topLevelErrorBoundary';

/**
 * Wraps entire App with neccessary Contexts
 *
 * @param props App
 * @returns Wrapped Component
 */
function AppWrapper(props: React.PropsWithChildren) {
    return (
        <EmotionCacheProvider>
            <ScreenWrapper>
                <UserWrapper>
                    <TopLevelErrorBoundary>
                        <ErrorWrapper>
                            <NotificationWrapper/>
                            <Background/>

                            {props.children}
                        </ErrorWrapper>
                    </TopLevelErrorBoundary>
                </UserWrapper>
            </ScreenWrapper>
        </EmotionCacheProvider>
    );
}

function MainApp() {
    return (
        <AppWrapper>
            <Routes>
                <Route>
                    <Route path="/" element={ <RootLayout/> }>
                        <Route index element={ <HypePage/> }/>

                        <Route path="/privacy" element={ <PrivacyPage/> }/>
                        <Route path="/terms" element={ <TermsPage/> }/>

                        <Route path="*" element={ <PageNotFound/> }/>
                    </Route>
                </Route>
            </Routes>
        </AppWrapper>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <MainApp/>
    </BrowserRouter>,
    // </React.StrictMode>
);
