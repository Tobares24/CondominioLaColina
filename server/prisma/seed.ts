import { PrismaClient } from "@prisma/client";
import { rubros_cobros } from "./seeds/rubros_cobros";
import { horarios } from "./seeds/horarios";
import { estados_deudas } from "./seeds/estados_deudas";
import { usuarios } from "./seeds/usuarios";
import { roles } from "./seeds/roles";
import { tipos_informacion } from "./seeds/tipos_informacion";
import { info } from "./seeds/info";
import { estados_incidencias } from "./seeds/estados_incidencias";
import { incidencias } from "./seeds/incidencias";
import { estados_reservas } from "./seeds/estados_reservas";
import { estados_residencias } from "./seeds/estados_residencias";
import { estados_usuarios } from "./seeds/estados_usuarios";
import { deudas } from "./seeds/deudas";

const prisma = new PrismaClient();

async function main() {
  // Roles
  await prisma.rol.createMany({
    data: roles,
  });

  // Estados deudas
  await prisma.estado_Deuda.createMany({
    data: estados_deudas,
  });

  // Estado usuarios
  await prisma.estado_Usuario.createMany({
    data: estados_usuarios,
  });

  // Estado reserva
  await prisma.estado_Reserva.createMany({
    data: estados_reservas,
  });

  // Estado residencia
  await prisma.estado_Residencia.createMany({
    data: estados_residencias,
  });

  // Estado incidencia
  await prisma.estado_Incidencia.createMany({
    data: estados_incidencias,
  });

  // Tipos de informacion
  await prisma.tipo_Informacion.createMany({
    data: tipos_informacion,
  });

  // Usuarios
  await prisma.usuario.createMany({
    data: usuarios,
  });

  // Información
  await prisma.informacion.createMany({
    data: info,
  });

  // Incidencias
  await prisma.incidencia.createMany({
    data: incidencias,
  });

  // Rubros de cobro
  await prisma.rubro_Cobro.createMany({
    data: rubros_cobros,
  });

  // Horarios
  await prisma.horario.createMany({
    data: horarios,
  });

  //#region Planes de Cobro
  await prisma.plan_Cobro.create({
    data: {
      descripcion: "Plan Básico",
      rubroCobro: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.plan_Cobro.create({
    data: {
      descripcion: "Plan Estándar",
      // deuda: {
      //   connect: [{ id: 3 }, { id: 4 }],
      // },
      rubroCobro: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 5 }],
      },
    },
  });

  await prisma.plan_Cobro.create({
    data: {
      descripcion: "Plan Premium",
      // deuda: {
      //   connect: [{ id: 5 }, { id: 6 }],
      // },
      rubroCobro: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      },
    },
  });
  //#endregion

  //#region Areas Comunes
  await prisma.area_Comun.create({
    data: {
      nombre: "Piscina",
      foto: "https://www.chillpainai.com/src/wewakeup/scoop/images/ca2be1e38bfe70db5614be2cc050bcfaac824767.jpg",
      horario: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });

  await prisma.area_Comun.create({
    data: {
      nombre: "Rancho con piscina",
      foto: "https://www.elmueble.com/medio/2018/04/16/086-dsc3509_961fc712.jpg",
      horario: {
        connect: [{ id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.area_Comun.create({
    data: {
      nombre: "Sala de eventos",
      foto: "https://imperiabeachtower.com/wp-content/uploads/2020/04/salud-de-eventos-imperia.jpg",
      horario: {
        connect: [{ id: 5 }, { id: 6 }],
      },
    },
  });

  await prisma.area_Comun.create({
    data: {
      nombre: "Cancha de fútbol",
      foto: "https://2.bp.blogspot.com/-LkdRaGP9J-Q/VQ4KtRWIONI/AAAAAAAAAAg/AKNmeKVYYpA/s1600/campofutbol7.jpg",
      horario: {
        connect: [{ id: 7 }, { id: 8 }],
      },
    },
  });

  await prisma.area_Comun.create({
    data: {
      nombre: "Cancha de tenis",
      foto: "https://www.equiver.com.co/images/construccion-canchas-tenis/construccion-canchas-tenis-7.jpg",
      horario: {
        connect: [{ id: 9 }, { id: 10 }],
      },
    },
  });

  await prisma.area_Comun.create({
    data: {
      nombre: "Cancha de golf",
      foto: "https://th.bing.com/th/id/OIP.k-4sUy9r3Q_4Ly9xxxcQLAAAAA?pid=ImgDet&rs=1",
      horario: {
        connect: [{ id: 1 }, { id: 10 }],
      },
    },
  });
  //#endregion

  // Deuda
  await prisma.deuda.createMany({
    data: deudas,
  });

  // Residencias
  await prisma.residencia.create({
    data: {
      cantPersonas: 2,
      cantCarros: 1,
      cantHabitaciones: 1,
      cantBannios: 2,
      annioInicio: "2022",
      precio: "400000",
      foto: "https://i.pinimg.com/originals/64/fa/9b/64fa9b8ff0a399da3df8610ec65dec00.jpg",
      idUsuario: 2,
      idEstadoResidencia: 2,
      deuda: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.residencia.create({
    data: {
      cantPersonas: 2,
      cantCarros: 1,
      cantHabitaciones: 1,
      cantBannios: 2,
      annioInicio: "2023",
      precio: "400000",
      foto: "https://i.pinimg.com/originals/f8/3c/54/f83c54bbb05e1b3052ebdf0398bd3570.png",
      idUsuario: 1,
      idEstadoResidencia: 1,
      deuda: {
        connect: [{ id: 1 }],
      },
    },
  });

  await prisma.residencia.create({
    data: {
      cantPersonas: 3,
      cantCarros: 2,
      cantHabitaciones: 2,
      cantBannios: 2,
      annioInicio: "2020",
      precio: "450000",
      foto: "https://i.pinimg.com/736x/5d/ca/f2/5dcaf2906fcc1045b4c64af93177eba8.jpg",
      idUsuario: 3,
      idEstadoResidencia: 2,
      deuda: {
        connect: [{ id: 5 }, { id: 6 }],
      },
    },
  });

  await prisma.residencia.create({
    data: {
      cantPersonas: 4,
      cantCarros: 2,
      cantHabitaciones: 3,
      cantBannios: 3,
      annioInicio: "2023",
      precio: "500000",
      foto: "https://images.adsttc.com/media/images/5733/92ba/e58e/cee8/0800/004f/large_jpg/02.jpg?1462997678",
      idUsuario: 4,
      idEstadoResidencia: 3,
      deuda: {
        connect: [{ id: 5 }, { id: 3 }, { id: 2 }],
      },
    },
  });

  await prisma.residencia.create({
    data: {
      cantPersonas: 5,
      cantCarros: 3,
      cantHabitaciones: 4,
      cantBannios: 3,
      annioInicio: "2023",
      precio: "600000",
      foto: "https://www.projetoacessivel.com.br/images/prontos/pc071/pc071_1.jpg",
      idUsuario: 1,
      idEstadoResidencia: 3,
      deuda: {
        connect: [{ id: 1 }, { id: 4 }, { id: 6 }],
      },
    },
  });

  await prisma.residencia.create({
    data: {
      cantPersonas: 4,
      cantCarros: 2,
      cantHabitaciones: 3,
      cantBannios: 2,
      annioInicio: "2022",
      precio: "600000",
      foto: "https://i.pinimg.com/736x/dd/95/67/dd9567689d3c27afe326b4d3e9079c27.jpg",
      idUsuario: 5,
      idEstadoResidencia: 1,
      deuda: {
        connect: [{ id: 4 }, { id: 2 }, { id: 5 }],
      },
    },
  });

  // Reserva
  await prisma.reserva.create({
    data: {
      idAreaComun: 1,
      idUsuario: 2,
      idEstado: 1,
      horario: {
        connect: [{ id: 1 }],
      },
    },
  });

  await prisma.reserva.create({
    data: {
      idAreaComun: 2,
      idUsuario: 2,
      idEstado: 2,
      horario: {
        connect: [{ id: 3 }, { id: 4 }],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
