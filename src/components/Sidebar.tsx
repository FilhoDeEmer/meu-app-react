import * as React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaDatabase, FaCheese } from "react-icons/fa";
import { TbPokeball } from "react-icons/tb";
import { BiFoodMenu } from "react-icons/bi";
import { GiBlackcurrant, GiCarambola } from "react-icons/gi";
import { SlGrid } from "react-icons/sl";

type SidebarProps = {
  /** Estado inicial em telas >= md (desktop) */
  collapsed?: boolean;
  /** Callback de navegação (opcional) */
  onNavigate?: (key: string) => void;
};

export default function Sidebar({
  collapsed = false,
  onNavigate,
}: SidebarProps) {
  // Estado local para mobile drawer
  const [open, setOpen] = React.useState(false);
  // Estado de colapso para desktop
  const [isCollapsed] = React.useState(collapsed);

  // Fecha o drawer em navegação (mobile)
  const handleNavigate = React.useCallback(
    (key: string) => {
      onNavigate?.(key);
      setOpen(false);
    },
    [onNavigate]
  );


  React.useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [open]);

  // Função auxiliar para itens
  const item = (
    to: string,
    icon: React.ReactNode,
    label: string,
    key: string
  ) => (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}
      aria-label={label}
      onClick={() => handleNavigate(key)}
    >
      <span aria-hidden>{icon}</span>
      {!isCollapsed && <span className="nav-label">{label}</span>}
    </NavLink>
  );

  return (
    <>
      {/* Botão hambúrguer visível em telas pequenas */}
      <button
        className="sidebar-toggle"
        aria-label="Abrir menu"
        aria-expanded={open}
        aria-controls="app-sidebar"
        onClick={() => setOpen(true)}
      >
        <span className="hamburger" aria-hidden />
      </button>

      {/* Overlay em mobile */}
      <div
        className={`sidebar-overlay ${open ? "open" : ""}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <aside
        id="app-sidebar"
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${
          open ? "open" : ""
        }`}
        aria-label="Barra lateral de navegação"
      >
        {/* Cabeçalho / marca */}
        <div className="brand" aria-label="Identidade do sistema">
          <div className="logo" aria-hidden>
            Sleep
          </div>
          {!collapsed && <span>Sleep</span>}
        </div>

        <nav>
          {item(
            "/",
            <TbPokeball size={22} color="#c9c9c9ff" />,
            "Ilha",
            "ilha"
          )}
          {item(
            "/banco",
            <FaDatabase size={22} color="#c9c9c9ff" />,
            "Banco",
            "banco"
          )}
          {item("/dex", <SlGrid size={22} color="#c9c9c9ff" />, "Dex", "dex")}
          {item(
            "/receitas",
            <BiFoodMenu size={22} color="#c9c9c9ff" />,
            "Receitas",
            "receitas"
          )}
          {item(
            "/ingredientes",
            <FaCheese size={22} color="#c9c9c9ff" />,
            "Ingredientes",
            "ingredientes"
          )}
          {item(
            "/mainSkill",
            <GiCarambola size={22} color="#c9c9c9ff" />,
            "Main Skill",
            "mainSkill"
          )}
          {item(
            "/subSkill",
            <GiBlackcurrant size={22} color="#c9c9c9ff" />,
            "Sub Skills",
            "subSkill"
          )}
          {item(
            "/user",
            <FaUser size={22} color="#c9c9c9ff" />,
            "User",
            "user"
          )}
        </nav>

        <div className="footer">
          {!isCollapsed && <span>Hermes • Emerson</span>}
        </div>
      </aside>
    </>
  );
}
