const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();

// ---Archivos de rutas---
const areaComun = require("./routes/areaComunRoutes");
const deudaRouter = require("./routes/deudaRoutes");
const incidenciaRouter = require("./routes/incidenciaRoutes");
const informacionRouter = require("./routes/informacionRoutes");
const planCobroRouter = require("./routes/planCobroRoutes");
const reservaRouter = require("./routes/reservaRoutes");
const residenciaRouter = require("./routes/residenciaRoutes");
const rubroCobroRouter = require("./routes/rubroCobroRoutes");
const usuarioRouter = require("./routes/usuarioRoutes");
const tipoInfoRouter = require("./routes/tipoInfoRoutes");
const estadoIncidenciaRouter = require("./routes/estadoIncidenciaRoutes");
const userRouter = require("./routes/usuarioRoutes");
const horarioRouter = require("./routes/horarioRoutes");
const estadoReserva = require("./routes/estadoReservaRoutes");
const rol = require("./routes/rolRoutes");
const estadoUsuario = require("./routes/estadoUsuarioRoutes");
const estadoResidencia = require("./routes/estadoResidenciaRoutes");
const estadoDeuda = require("./routes/estadoDeudaRoutes");

// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puero que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger('dev'));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//--- Definir Rutas ---
app.use("/areaComun/", areaComun);
app.use("/deuda/", deudaRouter);
app.use("/incidencia/", incidenciaRouter);
app.use("/informacion/", informacionRouter);
app.use("/planCobro/", planCobroRouter);
app.use("/reserva/", reservaRouter);
app.use("/residencia/", residenciaRouter);
app.use("/rubroCobro/", rubroCobroRouter);
app.use("/usuario/", usuarioRouter);
app.use("/tipoInfo/", tipoInfoRouter);
app.use("/estadoIncidencia/", estadoIncidenciaRouter);
app.use("/usuario/", userRouter);
app.use("/horario/", horarioRouter);
app.use("/estadoReserva/", estadoReserva);
app.use("/rol/", rol);
app.use("/estadoUsuario/", estadoUsuario);
app.use("/estadoDeuda/", estadoDeuda);
app.use("/estadoResidencia/", estadoResidencia);
// Servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log("Presione CTRL-C para detenerlo\n");
});

