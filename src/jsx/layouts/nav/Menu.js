import { SVGICON } from "../../constant/theme";

const Mdashboard = true;
const Mproveedores = true;
const Mmedicamentos = true;
const Minventario = true;
const Mclientes = true;
const Mrol = true;
const Mlote = true;
const Musuario = true;
const Mventa = true;
const Mpersona = true;
const Mreportes = true;
const McontrCli = true;

export const MenuList = [
    // Content
    {
        title: 'La Predilecta',
        classsChange: 'menu-title',
    },
    {
        title: 'Inicio',
        iconStyle: SVGICON.Home,
        to: '/bienvenida',
    },
    // Dashboard (condicional)
    Mdashboard
        ? {
              title: 'Dashboard',
              classsChange: 'mm-collapse',
              iconStyle: SVGICON.Home,
              content: [
                  {
                      title: 'Dashboard Light',
                      to: '/dashboard',
                  },
                  {
                      title: 'Dashboard Dark',
                      to: '/dashboard-dark',
                  },
              ],
          }
        : null,
    // Proveedores (condicional)
    Mproveedores
        ? {
              title: 'Proveedores',
              iconStyle: SVGICON.Proveedores,
              to: '/Proveedor',
          }
        : null,
    // Medicamentos (condicional)
    Mmedicamentos
        ? {
              title: 'Medicamentos',
              iconStyle: SVGICON.Medicamento,
              to: '/Medicamento',
          }
        : null,
    // Inventario (condicional)
    Minventario
        ? {
              title: 'Inventario',
              iconStyle: SVGICON.Inventario,
              to: '/Inventario',
          }
        : null,
    // Cliente (condicional)
    Mclientes
        ? {
              title: 'Clientes',
              iconStyle: SVGICON.Clientes,
              to: '/Cliente',
          }
        : null,
    // Rol (condicional)
    Mrol
        ? {
              title: 'Rol',
              iconStyle: SVGICON.Roles,
              to: '/Rol',
          }
        : null,
    // Lote (condicional)
    Mlote
        ? {
              title: 'Lotes',
              iconStyle: SVGICON.Lotes,
              to: '/Lote',
          }
        : null,
    // Usuario (condicional)
    Musuario
        ? {
              title: 'Usuarios',
              iconStyle: SVGICON.Employe,
              to: '/Usuario',
          }
        : null,
    // Venta (condicional)
    Mventa
        ? {
              title: 'Ventas', //venta
              iconStyle: SVGICON.Venta,
              to: '/Venta',
          }
        : null,
    // Persona Menu (condicional)
    Mpersona
        ? {
              title: 'Personas',
              iconStyle: SVGICON.Persona,
              to: '/Persona',
          }
        : null,
    // Reportes (condicional)
    Mreportes
        ? {
              title: 'Reportes',
              iconStyle: SVGICON.Reports,
              to: '/reports',
          }
        : null,
    // Control de Clientes (condicional)
    McontrCli
        ? {
              title: 'Control de Clientes',
              iconStyle: SVGICON.ManageClient,
              to: '/manage-client',
          }
        : null,
    {
        title: 'Tabla',
        classsChange: 'mm-collapse',
        iconStyle: SVGICON.Table,
        content: [
            {
                title: 'Tabla de filtro',
                to: 'table-filtering',
            },
            {
                title: 'Tabla de selección',
                to: 'table-sorting',
            },
        ],
    },
];
