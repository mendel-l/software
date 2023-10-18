import { SVGICON } from "../../constant/theme";
const tokenData = localStorage.getItem('userDetails');
const tokenParse = JSON.parse(tokenData);

const Mdashboard = true;
const Mproveedores = tokenParse ? tokenParse.vProveedores : false;
const Mmedicamentos = tokenParse ? tokenParse.vMedicamentos : false;
const Minventario = tokenParse ? tokenParse.vInventario : false;
const Mclientes = tokenParse ? tokenParse.vCliente : false;
const Mrol = tokenParse ? tokenParse.vRol : false;
const Mlote = tokenParse ? tokenParse.vLote : false;
const Musuario = tokenParse ? tokenParse.vUsuario : false;
const Mventa = tokenParse ? tokenParse.vVenta : false;
const Mpersona = tokenParse ? tokenParse.vPersona : false;
const Mreportes = tokenParse ? tokenParse.vReportes : false;
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

    Mproveedores
        ? {
              title: 'Proveedores',
              iconStyle: SVGICON.Proveedores,
              to: '/Proveedor',
          }
        : null,

    Mmedicamentos
        ? {
              title: 'Medicamentos',
              iconStyle: SVGICON.Medicamento,
              to: '/Medicamento',
          }
        : null,

    Minventario
        ? {
              title: 'Inventario',
              iconStyle: SVGICON.Inventario,
              to: '/Inventario',
          }
        : null,

    Mclientes
        ? {
              title: 'Clientes',
              iconStyle: SVGICON.Clientes,
              to: '/Cliente',
          }
        : null,
 
    Mrol
        ? {
              title: 'Rol',
              iconStyle: SVGICON.Roles,
              to: '/Rol',
          }
        : null,
   
    Mlote
        ? {
              title: 'Lotes',
              iconStyle: SVGICON.Lotes,
              to: '/Lote',
          }
        : null,
 
    Musuario
        ? {
              title: 'Usuarios',
              iconStyle: SVGICON.Employe,
              to: '/Usuario',
          }
        : null,
  
    Mventa
        ? {
              title: 'Ventas', 
              iconStyle: SVGICON.Venta,
              to: '/Venta',
          }
        : null,
   
    Mpersona
        ? {
              title: 'Personas',
              iconStyle: SVGICON.Persona,
              to: '/Persona',
          }
        : null,
    
    Mreportes
        ? {
              title: 'Reportes',
              iconStyle: SVGICON.Reports,
              to: '/reports',
          }
        : null,
  
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
