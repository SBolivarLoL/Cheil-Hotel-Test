import { getConnection } from "./../database/database";

/**
 * "getHoteles" is a function that gets the hoteles from the database and sends them to the client.
 * @param req - The request object.
 * @param res - the response object
 */
const getHoteles = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(`
    SELECT h.Nombre, h.Precio, h.Categoría, f.Foto, r.Estrellas, r.Comentario
    FROM hoteles h, fotos f, ratings r
    WHERE h.id = f.Pertenece_id AND h.id = r.Hotel_id;
    `);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * It's a function that gets the connection to the database, then queries the database for the
 * information I want, and then sends the result to the client ordered by price in ascending order.
 * @param req - The request object.
 * @param res - the response object
 */
const getHotelesPrecio = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(`
    SELECT h.Nombre, h.Precio, h.Categoría, f.Foto, r.Estrellas, r.Comentario
    FROM hoteles h, fotos f, ratings r
    WHERE h.id = f.Pertenece_id AND h.id = r.Hotel_id
    ORDER BY Precio ASC; `
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * It gets the connection to the database, then it queries the database and returns the result in a
 * JSON format of all the hoteles ordered by precio in descending order.
 * @param req - The request object.
 * @param res - the response object
 */
const getHotelesPrecioDesc = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(`
    SELECT h.Nombre, h.Precio, h.Categoría, f.Foto, r.Estrellas, r.Comentario
    FROM hoteles h, fotos f, ratings r
    WHERE h.id = f.Pertenece_id AND h.id = r.Hotel_id
    ORDER BY Precio DESC; `);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const postHotel = async (req, res) => {
  try {
    const { Nombre, Categoría, Estrellas, Comentario, Precio, FotoUno, FotoDos, FotoTres } = req.body;
    if (Nombre === undefined || Categoría === undefined || Estrellas === undefined || Precio === undefined || FotoUno === undefined || FotoDos === undefined || FotoTres === undefined) {
      res.status(400).json({message: "Error en el request. Por favor llene todos los campos"})
    }
    const connection = await getConnection();
    await connection.query(`
    BEGIN
    INSERT INTO hoteles VALUES (Null, '`+Nombre+`', `+Precio+`, `+Categoría+`)
    INSERT INTO ratings VALUES (Null, Null, `+Estrellas+`, '`+Comentario+`')
    INSERT INTO Fotos VALUES (Null, Null, `+FotoUno+`)
    INSERT INTO Fotos VALUES (Null, Null, `+FotoDos+`)
    INSERT INTO Fotos VALUES (Null, Null, `+FotoTres+`)
    END;
    `); //falta ver cómo obtener el id del hotel recien insertado para colocarlo en el segudo campo de ratings y fotos, así que esté la información acorde a el hotel
    res.json({message: "Se ha añadido el hotel."});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(`
    BEGIN
    DELETE FROM hoteles WHERE id = `+id+`
    DELETE FROM ratings WHERE Hotel_id = `+id+`
    DELETE FROM fotos WHERE Pertenece_id = `+id+`
    END;
    `);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateHotel = async (req, res) => { //falta ver cómo hacer para insertar solo los valores que se vayan a actualizar y hacer el query de acuerdo a este
  try {
    const { id } = req.params;
    const { Nombre, Categoría, Precio, Fotos } = req.body;
    const hotelCambios = { Nombre, Categoría, Calificaciones, Precio, Fotos };
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE hoteles SET ? WHERE id = ?", [hotelCambios, id]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/* It's exporting the functions so that they can be used in other files. */
export const methods = {
  getHoteles,
  getHotelesPrecio,
  getHotelesPrecioDesc,
  postHotel,
  deleteHotel,
  updateHotel
}