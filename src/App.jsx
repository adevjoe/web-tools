import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import StringSort from './components/tools/StringSort';
import StringDedupe from './components/tools/StringDedupe';
import DiffViewer from './components/tools/DiffViewer';
import JsonFormatter from './components/tools/JsonFormatter';
import Base64Converter from './components/tools/Base64Converter';
import JwtDebugger from './components/tools/JwtDebugger';
import UrlTools from './components/tools/UrlTools';
import CronParser from './components/tools/CronParser';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/string-sort" element={<StringSort />} />
        <Route path="/string-dedupe" element={<StringDedupe />} />
        <Route path="/diff" element={<DiffViewer />} />
        <Route path="/json" element={<JsonFormatter />} />
        <Route path="/base64" element={<Base64Converter />} />
        <Route path="/jwt" element={<JwtDebugger />} />
        <Route path="/url" element={<UrlTools />} />
        <Route path="/cron" element={<CronParser />} />
      </Routes>
    </Layout>
  );
}

export default App;
