//Logica para trabajar con archivos y rutas de proyecto
//Importar modulos para trabajar con rutas

import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

//Obtener nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);

//Obtener directorio del archivo actual
const __dirname = join(dirname(__filename), '../../..');

export {
    __dirname,
    join
}  