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
              iconStyle: SVGICON.Employe,
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
              iconStyle: SVGICON.Employe,
              to: '/Inventario',
          }
        : null,
    // Cliente (condicional)
    Mclientes
        ? {
              title: 'Cliente',
              iconStyle: SVGICON.Employe,
              to: '/Cliente',
          }
        : null,
    // Rol (condicional)
    Mrol
        ? {
              title: 'Rol',
              iconStyle: SVGICON.Employe,
              to: '/Rol',
          }
        : null,
    // Lote (condicional)
    Mlote
        ? {
              title: 'Lote',
              iconStyle: SVGICON.Employe,
              to: '/Lote',
          }
        : null,
    // Usuario (condicional)
    Musuario
        ? {
              title: 'Usuario',
              iconStyle: SVGICON.Employe,
              to: '/Usuario',
          }
        : null,
    // Venta (condicional)
    Mventa
        ? {
              title: 'Venta', //venta
              iconStyle: SVGICON.Employe,
              to: '/Venta',
          }
        : null,
    // Persona Menu (condicional)
    Mpersona
        ? {
              title: 'Persona',
              iconStyle: SVGICON.Employe,
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
