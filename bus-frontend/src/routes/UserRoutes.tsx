import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/user/Home';
export const UserRoutes = () => <Routes><Route path="/" element={<Home />} /></Routes>;
