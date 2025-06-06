from app import create_app, db
from app.models.usuario import Usuario
from app.models.tarea import Tarea

app = create_app()

with app.app_context():
    db.create_all()
