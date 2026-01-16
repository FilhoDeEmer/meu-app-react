
import * as React from "react";
import SubSkillsGrid from "../../components/ListSubSkill";
import {
  fetchSubSkillRows,
  type SubSkillRow,
} from "../../data/repositories/subSkill.repo";
import { Alert, Snackbar, Stack, Button } from "@mui/material";

export default function SubSkillsPage() {
  const [rows, setRows] = React.useState<SubSkillRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Snackbar
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackMsg] = React.useState<string>("");
  const [snackSeverity] = React.useState<
    "success" | "error" | "info" | "warning"
  >("info");


  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSubSkillRows();
      setRows(data);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Falha ao carregar Sub Skills";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const onView = (row: SubSkillRow) => {
    alert(`Sub Skill: ${row.nome}\nEfeito: ${row.descricao ?? "—"}`);
  };


  if (loading) return <p className="card-desc">Carregando...</p>;

  if (error)
    return (
      <Stack gap={1}>
        <p className="card-desc">Erro: {error}</p>
        <Button variant="outlined" onClick={load}>
          Tentar novamente
        </Button>
      </Stack>
    );

  return (
    <>
      <h1 style={{ marginBottom: 12 }}>Sub Skills</h1>
      <SubSkillsGrid rows={rows} onView={onView} />

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
