import pymysql
from app import create_app, db
from app.models.usuario import Usuario
from app.models.tarea import Tarea

def crear_base():
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='1234'
    )
    
    with connection.cursor() as cursor:
        cursor.execute("CREATE DATABASE IF NOT EXISTS task_manager")
        connection.close()
        
crear_base()
app = create_app()
with app.app_context():
    db.create_all()
    print("Base de datos y tablas creadas correctamente.")