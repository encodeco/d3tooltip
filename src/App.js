import React, { useState, useMemo, useEffect } from "react";

import { HashRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./Routes";
import './Styles/App.css'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    background-color: black;
`;

const App = () => {
    return (
        <>
            <Router>
                <Header />
                <Wrapper>
                    <Routes isLoggedIn={false} />
                </Wrapper>
                <Footer />
            </Router>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </>
    )
};

export default App;