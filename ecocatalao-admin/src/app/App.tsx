import { Link, Navigate, Route, Routes } from "react-router-dom";
import { modules } from "../constants/modules";
import { Layout } from "../components/Layout";
import { Dashboard } from "../pages/Dashboard";
import { RecordList } from "../pages/RecordList";
import { RecordEditor } from "../pages/RecordEditor";
import { RecordDetail } from "../pages/RecordDetail";
import { Settings } from "../pages/Settings";
export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        {modules.map((spec) => (
          <Route key={spec.kind} path={spec.path}>
            <Route index element={<RecordList key={spec.kind} spec={spec} />} />
            <Route
              path={spec.newRoute}
              element={<RecordEditor spec={spec} />}
            />
            <Route path=":id" element={<RecordDetail spec={spec} />} />
            <Route path=":id/editar" element={<RecordEditor spec={spec} />} />
          </Route>
        ))}
        <Route path="configuracoes" element={<Settings />} />
        <Route
          path="*"
          element={
            <section className="empty">
              <h1>Página não encontrada</h1>
              <Link className="button primary" to="/admin">
                Voltar ao painel
              </Link>
            </section>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
