import * as React from "react";
import {
  DataGrid,
  type GridColDef,
  
  QuickFilter,
  QuickFilterTrigger,
  QuickFilterControl,
  QuickFilterClear,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Stack,
} from "@mui/material";

type Row = { id: number; nome: string; descricao?: string | null };

type Props = {
  rows: Row[];
  onView?: (row: Row) => void;
};

export default function MainSkillsGrid({ rows, onView }: Props) {
  const columns: GridColDef<Row>[] = [
    { field: "nome", headerName: "Main Skill", flex: 1, maxWidth:200, minWidth: 160 },
    {
      field: "descricao",
      headerName: "Descrição",
      flex: 2,
      minWidth: 320,
      maxWidth:880,
    },
    {
      field: "acao",
      headerName: "Ação",
      sortable: false,
      filterable: false,
      width: 80,
      minWidth: 80,
      maxWidth:80,
      renderCell: (params) => {
        const row = params.row;
        return (
          <Stack direction="row" spacing={1}>
            <Button size="small" onClick={() => onView?.(row)}>
              Pokémon
            </Button>
          </Stack>
        );
      },
    },
  ];

  // Toolbar personalizada (API v8): Quick Filter novo, com defaultExpanded
  const CustomToolbar = React.useCallback(() => {
    return (
      <Box sx={{ px: 1, borderBottom: "1px solid #374151" }}>
        <QuickFilter defaultExpanded>
          <QuickFilterTrigger />
          <QuickFilterControl />
          <QuickFilterClear />
        </QuickFilter>
      </Box>
    );
  }, []);

  return (
    <Box sx={{ height: 520, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableRowSelectionOnClick
        // v8: substitua a toolbar deprecated por slots + Toolbar novo
        slots={{ toolbar: CustomToolbar }}
        sx={{
          // Layout & container
          height: 520,
          borderRadius: 6,
          border: "1px solid",
          borderColor: "#2a3441",
          bgcolor: "#0f172a", 
          color: "#e5e7eb", 
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          overflow: "hidden",

          // Cabeçalho
          "& .MuiDataGrid-columnHeaders": {
            background:
              "linear-gradient(180deg, rgba(17,24,39,0.9) 0%, rgba(17,24,39,1) 100%)", // #111827
            borderBottom: "1px solid #2a3441",
            color: "#5ba5ffff", 
            fontWeight: 600,
            letterSpacing: 0.2,
          },
          "& .MuiDataGrid-columnHeader": {
            paddingX: 1,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: 13,
            textTransform: "uppercase",
          },

          // Células
          "& .MuiDataGrid-cell": {
            borderBottomColor: "#1f2937", // linha divisória
            fontSize: 14,
            color: "#e5e7eb",
          },

          // Linhas – zebra + hover
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#111827", // faixa mais escura
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#242e41ff", // hover leve
          },

          // Seleção
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#0b1729 !important",
          },
          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: "#0e1d33 !important",
          },

          // Barra de ferramentas (novo Toolbar)
          "& .MuiDataGrid-topContainer": {
            borderBottom: "1px solid rgba(1, 107, 245, 1)ff",
          },
          "& .MuiDataGrid-toolbarContainer": {
            // (se você usar Toolbar padrão) – aqui estiliza a toolbar container
          },

          // Paginação
          "& .MuiTablePagination-root": {
            color: "#cbd5e1",
          },
          "& .MuiTablePagination-actions .MuiButtonBase-root": {
            color: "#cbd5e1",
          },

          // Botões dentro das células de ação
          "& .MuiDataGrid-cell button": {
            textTransform: "none",
            fontWeight: 500,
          },
        }}
      />


    </Box>
  );
}
