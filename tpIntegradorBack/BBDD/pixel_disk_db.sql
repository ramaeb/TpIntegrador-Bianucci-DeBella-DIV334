-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-11-2025 a las 01:02:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pixel_disk_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` float(10,0) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `imagen_url` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- CREACION TABLA USERS
CREATE TABLE `usuarios` (
  `usuario` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
   PRIMARY KEY (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--Ponemos datos usuarios

INSERT INTO `usuarios` (`usuario`, `password`) VALUES
('admin', '123'), 
('user', '112233'); 

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `categoria`, `imagen_url`, `estado`) VALUES
(1, 'Windows 10 Home', 'Consigue Licencia Windows 10 Home original en PixelDisk, la opción ideal para quienes buscan un sistema operativo confiable y accesible. Diseñado para uso doméstico, Windows 10 Home ofrece una experiencia completa con activación inmediata y un entorno intuitivo para todas tus necesidades informáticas.', 14990, 'Windows', 'https://activatusoftware.com/wp-content/uploads/2022/12/windows-10-home.png.webp', 1),
(2, 'Windows 10 Pro', 'La Licencia Windows 10 Pro es perfecta para usuarios avanzados y empresas que buscan un sistema operativo confiable, seguro y ampliamente compatible. En PixelDisk, ofrecemos esta licencia original con activación inmediata, para que puedas disfrutar de todas las funcionalidades de Windows 10 Pro al mejor precio.', 17990, 'Windows', 'https://activatusoftware.com/wp-content/uploads/2022/12/windows-10-pro.png.webp', 1),
(3, 'Windows 11 Home', 'La Licencia Windows 11 Home es ideal para usuarios que desean un sistema operativo moderno, seguro y con una interfaz intuitiva. Esta licencia original garantiza que obtendrás todas las actualizaciones y características de Windows 11 en tu equipo personal.', 14990, 'Windows', 'https://activatusoftware.com/wp-content/uploads/2022/12/windows-11-Home.png.webp', 1),
(4, 'Windows 11 Pro', 'La Licencia Windows 11 Pro es ideal para usuarios avanzados y empresas que buscan un sistema operativo confiable, seguro y eficiente. En PixelDisk, ofrecemos esta licencia original con activación inmediata, para que puedas disfrutar de todas las funcionalidades de Windows 11 Pro al mejor precio.', 17990, 'Windows', 'https://activatusoftware.com/wp-content/uploads/2022/12/windows-11-pro.png.webp', 1),
(5, 'Windows 7 Pro', 'La Licencia Windows 7 Pro es la solución ideal para usuarios y empresas que buscan estabilidad y seguridad en equipos de generaciones anteriores. Con esta licencia original, obtendrás un sistema operativo confiable para el trabajo en entornos profesionales.', 22990, 'Windows', 'https://activatusoftware.com/wp-content/uploads/2022/12/Windows-7-Professional.png.webp', 1),
(6, 'Windows 8.1 Pro', 'La Licencia Windows 8.1 Pro es ideal para quienes desean una solución segura y estable en sus equipos de uso profesional o personal. Este sistema operativo original te ofrece un rendimiento confiable y funciones avanzadas para optimizar el trabajo en tu PC.', 17990, 'Windows', 'https://activatusoftware.com/wp-content/uploads/2023/02/windows-8.1-pro.png.webp', 0),
(7, 'Windows Server 2019 Standard', 'Windows Server 2019 es el sistema operativo que conecta los entornos locales con los servicios de Azure, lo que permite escenarios híbridos que maximizan la inversión existente. Aumente la seguridad y reduzca el riesgo empresarial con múltiples capas de protección integradas en el sistema operativo. Desarrolle la infraestructura de su centro de datos para lograr una mayor eficiencia y escala con la infraestructura hiperconvergente. Permite a los desarrolladores y profesionales de TI crear aplicaciones nativas de la nube y modernizar sus aplicaciones tradicionales utilizando contenedores y microservicios.', 44990, 'Windows', 'https://activatusoftware.com/wp-content/uploads/2023/01/windows-Server-2019-Standard-1.png.webp', 1),
(8, 'Windows Server 2022 Standard', 'Windows Server 2022 conecta sus entornos locales con los servicios de Azure, lo que le permite aprovechar al máximo su inversión existente y aumentar su seguridad con múltiples capas de protección integradas en el sistema operativo. Además, esta innovadora plataforma de servidor le permite escalar su infraestructura de manera eficiente para lograr una mayor eficiencia en su centro de datos.\r\n\r\nWindows Server también es ideal para desarrolladores y profesionales de TI que quieren crear aplicaciones nativas de la nube y modernizar sus aplicaciones tradicionales. Con la versión estándar, podrá manejar cargas de trabajo con facilidad en entornos físicos o virtualizados, lo que es perfecto para empresas medianas y grandes con requisitos de acceso múltiple al servidor.', 52990, 'Windows', 'https://activatusoftware.com/wp-content/uploads/2023/01/windows-Server-2022-Standard-1.png.webp', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
