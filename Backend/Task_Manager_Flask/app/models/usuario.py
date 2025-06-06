from app import db

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)

    tareas = db.relationship('Tarea', backref='usuario', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre
        }

