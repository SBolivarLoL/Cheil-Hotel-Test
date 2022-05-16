import { getConnection } from "./../database/database";

const getHoteles = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id, Nombre, Categoría, Calificaciones, Precio, Fotos FROM hoteles"
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getHotelesPrecio = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id, Nombre, Categoría, Calificaciones, Precio, Fotos FROM hoteles ORDER BY Precio DESC"
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getHotelesPrecioAsc = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id, Nombre, Categoría, Calificaciones, Precio, Fotos FROM hoteles ORDER BY Precio ASC"
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const postHotel = async (req, res) => {
  try {
    const { Nombre, Categoría, Calificaciones, Precio, Fotos } = req.body;

    if (Nombre === undefined || Categoría === undefined || Calificaciones === undefined || Precio === undefined || Fotos === undefined) {
      res.status(400).json({message: "Error en el request. Por favor llene todos los campos"})
    }
    const connection = await getConnection();
    await connection.query(
      "INSERT INTO hoteles VALUES (NULL, '"+Nombre+"', "+Categoría+", "+Calificaciones+", "+Precio+", '"+Fotos+"')"
    );
    res.json({message: "Se ha añadido el hotel."});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteHotel = async (req, res) => {
  try {
    const { Nombre } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM hoteles WHERE Nombre = '"+Nombre+"'"
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Categoría, Calificaciones, Precio, Fotos } = req.body;
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

export const methods = {
  getHoteles,
  getHotelesPrecio,
  getHotelesPrecioAsc,
  postHotel,
  deleteHotel,
  updateHotel
}