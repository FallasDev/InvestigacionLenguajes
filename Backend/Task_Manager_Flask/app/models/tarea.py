from app import db

class Tarea(db.Model):
    __tablename__ = 'tarea'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    fecha_vencimiento = db.Column(db.Date, nullable=False)
    estado = db.Column(db.String(50), nullable=False)
    prioridad = db.Column(db.String(50), nullable=False)
    lugar = db.Column(db.String(100), nullable=False)
    cantidad_horas = db.Column(db.Float, nullable=False)
    imagen = db.Column(db.String(200), nullable=True)
    completada = db.Column(db.Boolean, default=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    
    def to_dict(self): # esto convierte los datos en JSON
        return {
            "id": self.id,
            "titulo": self.titulo,
            "descripcion": self.descripcion,
            "fecha_vencimiento": self.fecha_vencimiento,
            "estado": self.estado,
            "prioridad": self.prioridad,
            "lugar": self.lugar,
            "cantidad_horas": self.cantidad_horas,
            "imagen": self.imagen,
            "completada": self.completada,
            "usuario_id": self.usuario_id
        }


